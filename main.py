from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import SQLModel, create_engine, Session, select, Field, Relationship
from typing import Annotated, Optional
from contextlib import asynccontextmanager

sqlite_filename = "amiibox.db"
sqlite_url = f"sqlite:///{sqlite_filename}"
connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)


# Link table for User's owned amiibos (many-to-many)
class UserOwnedAmiiboLink(SQLModel, table=True):
    user_id: int = Field(foreign_key="user.id", primary_key=True)
    amiibo_id: int = Field(foreign_key="amiibo.id", primary_key=True)


# Link table for User's wanted amiibos (many-to-many)
class UserWantedAmiiboLink(SQLModel, table=True):
    user_id: int = Field(foreign_key="user.id", primary_key=True)
    amiibo_id: int = Field(foreign_key="amiibo.id", primary_key=True)


class AmiiboSeries(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str

    # Relationship: one series has many amiibos
    amiibos: list["Amiibo"] = Relationship(back_populates="series")


class Amiibo(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    image: str

    # Foreign key to AmiiboSeries
    series_id: int = Field(foreign_key="amiiboseries.id")

    # Relationship: many amiibos belong to one series
    series: AmiiboSeries = Relationship(back_populates="amiibos")

    # Many-to-many relationships with User
    owned_by_users: list["User"] = Relationship(
        back_populates="owned_amiibos",
        link_model=UserOwnedAmiiboLink
    )
    wanted_by_users: list["User"] = Relationship(
        back_populates="wanted_amiibos",
        link_model=UserWantedAmiiboLink
    )


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    full_name: str
    email: str
    enabled: bool = True

    # Many-to-many relationships with Amiibo
    owned_amiibos: list[Amiibo] = Relationship(
        back_populates="owned_by_users",
        link_model=UserOwnedAmiiboLink
    )
    wanted_amiibos: list[Amiibo] = Relationship(
        back_populates="wanted_by_users",
        link_model=UserWantedAmiiboLink
    )


def create_db():
    SQLModel.metadata.create_all(engine)


def get_db_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_db_session)]

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

TokenDep = Annotated[str, Depends(oauth2_scheme)]

def convert_token_to_user(token: str) -> User:
    return User(id=1, full_name="John Doe", email="john@example.com")

def get_current_user(token: TokenDep) -> User:
    return convert_token_to_user(token)

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db()
    yield

app = FastAPI(lifespan=lifespan)

@app.get("/amiibo/")
def amiibo_list(session: SessionDep) -> list[Amiibo]:
    return session.exec(select(Amiibo)).all()


@app.get("/amiibo/{id}")
def amiibo_detail(id: int, session: SessionDep) -> Amiibo:
    amiibo = session.get(Amiibo, id)
    if not amiibo:
        raise HTTPException(status_code=404, detail="Amiibo not found")
    return amiibo


def amiibo_create():
    pass


def amiibo_update(id: int):
    pass


@app.delete("/amiibo/{id}")
def amiibo_delete(id: int, session: SessionDep) -> None:
    amiibo = session.get(Amiibo, id)
    if not amiibo:
        raise HTTPException(status_code=404, detail="Amiibo not found")
    session.delete(amiibo)
    session.commit()
    return None


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

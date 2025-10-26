from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import SQLModel, create_engine, Session, select
from pydantic import BaseModel
from typing import Annotated

sqlite_filename = "amiibox.db"
sqlite_url = f"sqlite:///{sqlite_filename}"
connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)


class AmiiboSeries(BaseModel):
    id: int
    name: str


class Amiibo(BaseModel):
    id: int
    name: str
    series: AmiiboSeries
    image: str


class User(BaseModel):
    id: int
    full_name: str
    email: str
    enabled: bool = True
    owned_amiibos: list[Amiibo]
    wanted_amiibos: list[Amiibo]


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

app = FastAPI()

@app.on_event("startup")
def startup():
    create_db()

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

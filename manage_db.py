#!/usr/bin/env python3
"""
Database management script for AmiiBox

This script provides utilities for managing the database:
- Initialize/create database tables
- Reset database (drop all tables and recreate)
- Seed database with sample amiibo data
"""

import argparse
from sqlmodel import Session, select
from main import (
    engine,
    SQLModel,
    AmiiboSeries,
    Amiibo,
    User,
    UserOwnedAmiiboLink,
    UserWantedAmiiboLink
)


def create_tables():
    """Create all database tables"""
    print("Creating database tables...")
    SQLModel.metadata.create_all(engine)
    print("✓ Database tables created successfully")


def drop_tables():
    """Drop all database tables"""
    print("Dropping all database tables...")
    SQLModel.metadata.drop_all(engine)
    print("✓ Database tables dropped successfully")


def reset_database():
    """Reset database by dropping and recreating all tables"""
    print("\n=== Resetting Database ===")
    drop_tables()
    create_tables()
    print("✓ Database reset complete\n")


def seed_amiibo_data():
    """Seed database with sample amiibo data"""
    print("\n=== Seeding Amiibo Data ===")

    with Session(engine) as session:
        # Check if data already exists
        existing_series = session.exec(select(AmiiboSeries)).first()
        if existing_series:
            print("⚠ Database already contains data. Skipping seed.")
            print("  Use --reset flag to clear existing data first.")
            return

        # Create Amiibo Series
        print("Adding amiibo series...")

        series_super_mario = AmiiboSeries(name="Super Mario Bros.")
        series_zelda = AmiiboSeries(name="The Legend of Zelda")
        series_animal_crossing = AmiiboSeries(name="Animal Crossing")
        series_splatoon = AmiiboSeries(name="Splatoon")
        series_pokemon = AmiiboSeries(name="Pokemon")

        session.add(series_super_mario)
        session.add(series_zelda)
        session.add(series_animal_crossing)
        session.add(series_splatoon)
        session.add(series_pokemon)
        session.commit()

        # Refresh to get IDs
        session.refresh(series_super_mario)
        session.refresh(series_zelda)
        session.refresh(series_animal_crossing)
        session.refresh(series_splatoon)
        session.refresh(series_pokemon)

        print(f"  ✓ Added {5} series")

        # Create Amiibo figures
        print("Adding amiibo figures...")

        amiibos = [
            # Super Mario Bros. Series
            Amiibo(
                name="Mario",
                image="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00000000-00000002.png",
                series_id=series_super_mario.id
            ),
            Amiibo(
                name="Luigi",
                image="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00000000-00010002.png",
                series_id=series_super_mario.id
            ),
            Amiibo(
                name="Peach",
                image="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00000000-00020002.png",
                series_id=series_super_mario.id
            ),
            Amiibo(
                name="Yoshi",
                image="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00000000-00030002.png",
                series_id=series_super_mario.id
            ),
            Amiibo(
                name="Bowser",
                image="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00000000-01010002.png",
                series_id=series_super_mario.id
            ),

            # The Legend of Zelda Series
            Amiibo(
                name="Link",
                image="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_01000000-00000002.png",
                series_id=series_zelda.id
            ),
            Amiibo(
                name="Zelda",
                image="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_01000000-00010002.png",
                series_id=series_zelda.id
            ),
            Amiibo(
                name="Ganondorf",
                image="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_01000000-00020002.png",
                series_id=series_zelda.id
            ),
            Amiibo(
                name="Toon Link",
                image="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_01000000-00040002.png",
                series_id=series_zelda.id
            ),
            Amiibo(
                name="Sheik",
                image="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_01000000-00050002.png",
                series_id=series_zelda.id
            ),

            # Animal Crossing Series
            Amiibo(
                name="Isabelle",
                image="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_02000000-00000002.png",
                series_id=series_animal_crossing.id
            ),
            Amiibo(
                name="Tom Nook",
                image="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_02000000-00010003.png",
                series_id=series_animal_crossing.id
            ),
            Amiibo(
                name="K.K. Slider",
                image="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_02000000-00020003.png",
                series_id=series_animal_crossing.id
            ),

            # Splatoon Series
            Amiibo(
                name="Inkling Girl",
                image="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_10000000-00000000.png",
                series_id=series_splatoon.id
            ),
            Amiibo(
                name="Inkling Boy",
                image="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_10000000-00010000.png",
                series_id=series_splatoon.id
            ),
            Amiibo(
                name="Inkling Squid",
                image="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_10000000-00020000.png",
                series_id=series_splatoon.id
            ),

            # Pokemon Series
            Amiibo(
                name="Pikachu",
                image="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00000000-000a0002.png",
                series_id=series_pokemon.id
            ),
            Amiibo(
                name="Charizard",
                image="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00000000-00190002.png",
                series_id=series_pokemon.id
            ),
            Amiibo(
                name="Lucario",
                image="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00000000-001a0002.png",
                series_id=series_pokemon.id
            ),
            Amiibo(
                name="Jigglypuff",
                image="https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00000000-000c0002.png",
                series_id=series_pokemon.id
            ),
        ]

        for amiibo in amiibos:
            session.add(amiibo)

        session.commit()
        print(f"  ✓ Added {len(amiibos)} amiibo figures")

        print("\n✓ Database seeded successfully!")
        print(f"  Total series: 5")
        print(f"  Total amiibos: {len(amiibos)}")


def seed_users():
    """Seed database with sample users"""
    print("\n=== Seeding Sample Users ===")

    with Session(engine) as session:
        # Check if users already exist
        existing_user = session.exec(select(User)).first()
        if existing_user:
            print("⚠ Users already exist. Skipping user seed.")
            return

        print("Adding sample users...")

        users = [
            User(
                full_name="John Doe",
                email="john@example.com",
                enabled=True
            ),
            User(
                full_name="Jane Smith",
                email="jane@example.com",
                enabled=True
            ),
            User(
                full_name="Bob Johnson",
                email="bob@example.com",
                enabled=True
            ),
        ]

        for user in users:
            session.add(user)

        session.commit()
        print(f"  ✓ Added {len(users)} sample users")


def seed_all():
    """Seed all data (series, amiibos, and users)"""
    seed_amiibo_data()
    seed_users()


def show_stats():
    """Display database statistics"""
    print("\n=== Database Statistics ===")

    with Session(engine) as session:
        series_count = len(session.exec(select(AmiiboSeries)).all())
        amiibo_count = len(session.exec(select(Amiibo)).all())
        user_count = len(session.exec(select(User)).all())

        print(f"Series: {series_count}")
        print(f"Amiibos: {amiibo_count}")
        print(f"Users: {user_count}")
        print()


def main():
    parser = argparse.ArgumentParser(
        description="Database management script for AmiiBox",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s --init              Initialize database tables
  %(prog)s --seed              Seed database with sample data
  %(prog)s --reset --seed      Reset database and seed with sample data
  %(prog)s --stats             Show database statistics
        """
    )

    parser.add_argument(
        "--init",
        action="store_true",
        help="Initialize database tables"
    )
    parser.add_argument(
        "--reset",
        action="store_true",
        help="Reset database (drop and recreate all tables)"
    )
    parser.add_argument(
        "--seed",
        action="store_true",
        help="Seed database with sample amiibo data"
    )
    parser.add_argument(
        "--seed-users",
        action="store_true",
        help="Seed database with sample users"
    )
    parser.add_argument(
        "--stats",
        action="store_true",
        help="Show database statistics"
    )

    args = parser.parse_args()

    # If no arguments provided, show help
    if not any(vars(args).values()):
        parser.print_help()
        return

    # Execute requested operations in order
    if args.reset:
        reset_database()

    if args.init:
        create_tables()

    if args.seed:
        seed_all()
    elif args.seed_users:
        seed_users()

    if args.stats:
        show_stats()


if __name__ == "__main__":
    main()

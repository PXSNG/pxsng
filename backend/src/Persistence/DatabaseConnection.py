import os
import oracledb
from dotenv import find_dotenv, load_dotenv


class DatabaseConnection:
    _pool = None
    Connection: oracledb.Connection

    def __init__(self):
        dotenv_file = find_dotenv()
        load_dotenv(dotenv_file)

        user_password = os.environ.get("DATABASE_PASSWORD")
        database_user = os.environ.get("DATABASE_USER")
        database_dsn = os.environ.get("DATABASE_DSN")
        if DatabaseConnection._pool is None:
            DatabaseConnection._pool = oracledb.create_pool(
                user=database_user,
                dsn=database_dsn,
                password=user_password,
                min=1,
                max=5,
                increment=1,
            )

    @property
    def connection(self):
        return DatabaseConnection._pool.acquire()

    def release(self, conn) -> None:
        DatabaseConnection._pool.release(conn)

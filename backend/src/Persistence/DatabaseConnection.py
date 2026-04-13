import os
import oracledb


class DatabaseConnection:
    _pool = None
    Connection: oracledb.Connection

    def __init__(self):
        user_password = os.environ.get("DATABASS_PASSWORD")
        database_user = os.environ.get("DATABASE_USER")
        database_dsn = os.environ.get("DATABASE_DSN")
        if DatabaseConnection._pool is None:
            DatabaseConnection._pool = oracledb.create_pool(
                user=database_user,
                password=user_password,
                dsn=database_dsn,
                min=1,
                max=5,
                increment=1
            )

    @property
    def connection(self):
        return DatabaseConnection._pool.acquire()

    def release(self, conn):
        DatabaseConnection._pool.release(conn)

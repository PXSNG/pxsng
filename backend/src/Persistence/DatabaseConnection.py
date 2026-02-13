import os
import oracledb


class DatabseConnection:
    Connection: oracledb.Connection

    def __init__(self):
        user_password = os.environ.get("DATABASS_PASSWORD")
        databse_user = os.environ.get("DATABASE_USER")
        database_dsn = os.environ.get("DATABASE_DSN")
        self.Connection = oracledb.connect(user=databse_user,
                                           password=user_password,
                                           dsn=database_dsn)

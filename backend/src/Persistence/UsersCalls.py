import oracledb
import json
from Types.User import User
from Persistence.DatabaseConnection import DatabaseConnection


class UsersCalls:
    def __init__(self):
        self.db_manager = DatabaseConnection()

    # def GetAllUsers(self) -> list[User]:
    #     conn = self.db_manager.connection
    #     try:
    #         with conn.cursor() as cursor:
    #             p_users_cursor = cursor.var(oracledb.CURSOR)
    #
    #             cursor.callproc("user_api_pkg.get_all_users", [p_users_cursor])
    #
    #             result_cursor = p_users_cursor.getvalue()
    #             result_cursor.rowfactory = User
    #
    #             users = result_cursor.fetchall()
    #             result_cursor.close()
    #             return users
    #     finally:
    #         self.db_manager.release(conn)
    def CreateUserRecord(self, user_data: dict) -> tuple[int, dict]:
        """
        Calls user_api_pkg.create_user_record to create a user and shopping cart.

        :param user_data: Dictionary containing firstname, lastname, email, password_hash, etc.
        :return: A tuple containing (status_code: int, response_json: dict)
        """
        conn = self.db_manager.connection
        try:
            with conn.cursor() as cursor:
                json_payload = json.dumps(user_data)

                p_status_code = cursor.var(oracledb.NUMBER)
                p_response_message = cursor.var(oracledb.DB_TYPE_CLOB)

                cursor.execute(
                    """
                    BEGIN
                        user_api_pkg.create_user_record(:1, :2, :3);
                    END;
                    """,
                    [json_payload, p_status_code, p_response_message],
                )

                status_code = int(p_status_code.getvalue())

                clob_data = p_response_message.getvalue()
                response_json = json.loads(clob_data.read() if clob_data else "{}")

                return status_code, response_json
        except Exception as e:
            print(f"[DB] Python error during user creation: {e}", flush=True)
            return 500, {"success": False, "message": f"Backend Error: {str(e)}"}
        finally:
            self.db_manager.release(conn)

    def GetUserById(self, user_id: str) -> User:
        conn = self.db_manager.connection
        try:
            with conn.cursor() as cursor:
                # p_user_cursor = cursor.var(oracledb.CURSOR)
                # cursor.execute(
                #     """
                #     BEGIN
                #         user_api_pkg.get_user_by_id(:1, :2);
                #     END;
                #     """,
                #     [user_id, p_user_cursor],
                # )
                # result_cursor = p_user_cursor.getvalue()
                # result_cursor.rowfactory = User
                # rows = result_cursor.fetchall()
                # user = rows[0]
                # result_cursor.close()

                cursor.execute(
                    """
                SELECT 
                    "ID", 
                    "FIRSTNAME", 
                    "LASTNAME", 
                    "EMAIL", 
                    "TELEPHONE", 
                    "REFERRAL_CODE_ID", 
                    "PASSWORD_HASH", 
                    "ADDRESS_ID", 
                    "IS_PREMIUM", 
                    "IS_COMPANY_MANAGER", 
                    "COIN_BALANCE", 
                    "SHOPPING_CART", 
                    "CONTENT_PREFERENCES_ID", 
                    "CREATED_AT", 
                    "UPDATED_AT"
                FROM "APP_USER"
                WHERE "ID" = :1
                """,
                    [user_id],
                )

                cursor.rowfactory = User
                user = cursor.fetchone()
                return user
        finally:
            self.db_manager.release(conn)

    def DeleteUserRecord(self, user_id: str) -> tuple[int, dict]:
        """
        Calls user_api_pkg.delete_user_record to delete a user record.

        :param user_id: The UUID string of the target user to delete.
        :return: A tuple containing (status_code: int, response_json: dict)
        """
        conn = self.db_manager.connection
        try:
            with conn.cursor() as cursor:
                # 1. Declare the OUT variables matching the PL/SQL types
                p_status_code = cursor.var(oracledb.NUMBER)
                p_response_message = cursor.var(oracledb.DB_TYPE_CLOB)
                # 2. Execute using an explicit anonymous PL/SQL block for stability
                cursor.execute(
                    """
                    BEGIN
                        user_api_pkg.delete_user_record(:1, :2, :3);
                    END;
                    """,
                    [user_id, p_status_code, p_response_message],
                )

                # 3. Extract the primitives returned by the database execution
                status_code = int(p_status_code.getvalue())

                # Stream the CLOB data safely into a string
                clob_data = p_response_message.getvalue()
                response_json = json.loads(clob_data.read() if clob_data else "{}")

                print(
                    f"👉 [DB] Delete completed with Status Code: {status_code}",
                    flush=True,
                )
                return status_code, response_json

        except Exception as e:
            print(f"[DB] Python error during user deletion: {e}", flush=True)
            return 500, {"success": False, "message": f"Backend Error: {str(e)}"}
        finally:
            self.db_manager.release(conn)

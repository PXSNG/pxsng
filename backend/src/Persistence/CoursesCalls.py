from Types.Course import Course
import oracledb
from Persistence.DatabaseConnection import DatabaseConnection


class CoursesCalls:
    def __init__(self):
        self.db_manager = DatabaseConnection()

    def GetAllCourses(self) -> list[Course]:
        conn = self.db_manager.connection
        try:
            with conn.cursor() as cursor:
                p_courses_cursor = cursor.var(oracledb.CURSOR)

                cursor.callproc("course_api_pkg.get_all_courses", [p_courses_cursor])

                result_cursor = p_courses_cursor.getvalue()
                result_cursor.rowfactory = Course

                courses = result_cursor.fetchall()
                result_cursor.close()
                return courses
        finally:
            self.db_manager.release(conn)

    def GetCourseById(self, id: int) -> Course:
        conn = self.db_manager.connection
        try:
            with conn.cursor() as cursor:
                p_course_cursor = cursor.var(oracledb.CURSOR)

                cursor.callproc(
                    "course_api_pkg.get_course_by_id",
                    keywordParameters={
                        "p_course_id": id,
                        "p_course_cursor": p_course_cursor,
                    },
                )

                print(cursor)
                result_cursor = p_course_cursor.getvalue()

                result_cursor.rowfactory = Course

                course = result_cursor.fetchone()
                result_cursor.close()
                return course
        finally:
            self.db_manager.release(conn)

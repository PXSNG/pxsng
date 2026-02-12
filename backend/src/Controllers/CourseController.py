from dataclasses import asdict
from flask_restx import Namespace, Resource, fields
from Persistence.CoursesCalls import CoursesCalls
from Types.Course import Course

api = Namespace("courses", description="course related operations")

course_model = api.model(
    "Course",
    {
        "id": fields.String(),
        "title": fields.String(),
        "description": fields.String(),
        "price": fields.Float(),
        "duration_days": fields.Integer(),
        "max_participants": fields.Integer(),
        "category_id": fields.Integer()
    },
)

database_accessor = CoursesCalls()
COURSES: list[Course] = database_accessor.GetAllCourses()


@api.route("/")
class CoursesController(Resource):
    @api.marshal_list_with(course_model)
    def get(self):
        return COURSES


@api.route("/<int:id>")
class CourseController(Resource):
    def get(self, id):
        course = next((asdict(course) for course in COURSES if course.id == id), None)
        if course:
            return course
        api.abort(404, f"Course {id} not found")

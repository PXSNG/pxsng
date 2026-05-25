from flask_restx import Namespace, Resource, fields
from Persistence.CoursesCalls import CoursesCalls

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
        "category_id": fields.Integer(),
    },
)

database_accessor = CoursesCalls()


@api.route("/")
class CoursesController(Resource):
    @api.marshal_list_with(course_model)
    def get(self):
        return database_accessor.GetAllCourses()


@api.route("/<int:id>")
class CourseController(Resource):
    @api.marshal_with(course_model)
    def get(self, id):
        course = database_accessor.GetCourseById(id)
        if course:
            return course
        api.abort(404, f"Course {id} not found")

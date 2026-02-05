from flask_restx import Namespace, Resource, fields

api = Namespace("courses", description="course related operations")

course_model = api.model(
    "Course",
    {
        "id": fields.String(),
        "name": fields.String(),
        "description": fields.String(),
        "price": fields.Float(),
    },
)

COURSES = [
    {"id": 1, "name": "test1", "description": "testCourse", "price": 3.10},
    {"id": 2, "name": "test2", "description": "testCourse2", "price": 2.90},
]


@api.route("/")
class CoursesController(Resource):
    @api.marshal_list_with(course_model)
    def get(self):
        return COURSES


@api.route("/<int:id>")
class CourseController(Resource):
    def get(self, id):
        course = next((course for course in COURSES if course["id"] == id), None)
        if course:
            return course
        api.abort(404, f"Course {id} not found")

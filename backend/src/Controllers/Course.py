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
    {"id": 1, "name": "Let Go", "description": "Learn how to properly let go", "price": 3.10},
    {"id": 2, "name": "Markiplier & You", "description": "The Tricks to Writing amazing content", "price": 2.90},
    {"id": 3, "name": "Handling sensitive data", "description": "Learn how to handle sensitive data securely. TODO: remove api key", "price": 4.00},
    {"id": 4, "name": "How to be a good person", "description": "Learn how to be a good person in 10 easy steps", "price": 1.50},
]


@api.route("/")
class CoursesController(Resource):
    @api.marshal_list_with(course_model)
    def get(self):
        return COURSES
    
    def post(self, course_data):
        new_course = {
            "id": len(COURSES) + 1,
            "name": course_data["name"],
            "description": course_data["description"],
            "price": course_data["price"],
        }
        COURSES.append(new_course)
        return new_course, 201


@api.route("/<int:id>")
class CourseController(Resource):
    def get(self, id):
        course = next((course for course in COURSES if course["id"] == id), None)
        if course:
            return course
        api.abort(404, f"Course {id} not found")

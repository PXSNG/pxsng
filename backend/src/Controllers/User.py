from flask_restx import Namespace, Resource, fields

api = Namespace("user", description="user related operations")

user_model = api.model(
    "User",
    {"id": fields.String(), "name": fields.String(), "lastname": fields.String()},
)

USERS = [
    {"id": 1, "name": "John", "lastname": "Smith"},
    {"id": 2, "name": "Alice", "lastname": "Mary"},
]


@api.route("/")
class UsersController(Resource):
    @api.marshal_list_with(user_model)
    def get(self):
        return USERS

    def put(self):
        USERS.append({"id": 3, "name": "Bob", "lastname": "Shakespeare"})


@api.route("/<int:id>")
class UserController(Resource):
    def get(self, id):
        user = next((user for user in USERS if user["id"] == id), None)
        if user:
            return user
        api.abort(404, f"User {id} not found")

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

    def put(self, user_data):
        if user_data is None:
            api.abort(400, "No user data provided")
        new_user = {
            "id": len(USERS) + 1,
            "name": user_data["name"],
            "lastname": user_data["lastname"],
        }   
        USERS.append(new_user)


@api.route("/<int:id>")
class UserController(Resource):
    def get(self, id):
        user = next((user for user in USERS if user["id"] == id), None)
        if user:
            return user
        api.abort(404, f"User {id} not found")

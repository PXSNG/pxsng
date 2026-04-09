from dataclasses import asdict
from flask_restx import Namespace, Resource, fields

from Persistence.UsersCalls import UsersCalls
from Types.User import User

api = Namespace("user", description="user related operations")

user_model = api.model(
    "User",
    {
        "id": fields.String(),
        "firstname": fields.String(),
        "lastname": fields.String(),
        "email": fields.String(),
        "telephone": fields.String(),
        "password_hash": fields.String(),
        "address_id": fields.Integer()
    },
)

database_accessor = UsersCalls()
USERS: list[User] = database_accessor.GetAllUsers()


@api.route("/")
class UsersController(Resource):
    @api.marshal_list_with(user_model)
    def get(self):
        return USERS

    def put(self):
        USERS.append({"id": 3, "name": "Bob", "lastname": "Shakespeare"})


@api.route("/<string:id>")
class UserController(Resource):
    def get(self, id):
        user = next((asdict(user) for user in USERS if user.id == id), None)
        if user:
            return user
        api.abort(404, f"User {id} not found")

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
        "address_id": fields.String(),
    },
)

database_accessor = UsersCalls()


@api.route("/")
class UsersController(Resource):
    def post(self):
        # 1. Grab the raw JSON body sent by the client
        user_payload = api.payload

        # 2. Forward payload to the persistence layer
        status_code, response_data = database_accessor.CreateUserRecord(user_payload)

        # 3. If database failed, use RESTX abort to return the clean error message
        if status_code != 201:
            api.abort(status_code, response_data.get("message", "Operation failed"))

        # 4. Success path (Returns 201 Created along with the generated User ID)
        return response_data, 201


@api.route("/<string:id>")
class UserController(Resource):
    @api.marshal_with(user_model)
    def get(self, id):
        user = database_accessor.GetUserById(id)
        if user:
            return user
        api.abort(404, f"User {id} not found")

    def delete(self, id):
        result = database_accessor.DeleteUserRecord(id)
        if result[0] != 500:
            return
        api.abort(500, f"{result[1]}")

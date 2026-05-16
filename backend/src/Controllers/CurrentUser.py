from flask_restx import Namespace, Resource, fields

api = Namespace("current_user", description="Current user related operations")

user_model = api.model(
    "CurrentUser",
    {
        "id": fields.String(),
        "firstname": fields.String(),
        "lastname": fields.String(),
        "email": fields.String(),
        "coin_balance": fields.Integer(),
    },
)

USERDATA = {"id": 1, "firstname": "sammy", "lastname": "doe", "email": "testuser@example.com", "coin_balance": 100}


@api.route("/")
class CurrentUserController(Resource):
    @api.marshal_with(user_model)
    def get(self):
        return USERDATA


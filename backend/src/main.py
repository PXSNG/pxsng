import os

from flask import Flask
from flask_restx import Api
from flask_cors import CORS
from Controllers.Course import api as courses_ns
from Controllers.User import api as users_ns
from Controllers.CurrentUser import api as current_user_ns

app = Flask(__name__)

cors_setting = {
    "origins": os.getenv("CORS_ORIGIN", "*"),
    "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    "allow_headers": ["Content-Type", "Authorization"],
}

CORS(app, resources={r"/*": cors_setting})


api = Api(
    app,
    version="1.0",
    title="pxsng backend"
)

api.add_namespace(courses_ns, path="/courses")
api.add_namespace(users_ns, path="/users")
api.add_namespace(current_user_ns, path="/current_user")


if __name__ == '__main__':
    app.run(debug=True)
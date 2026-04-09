from dotenv import find_dotenv, load_dotenv
from flask import Flask
from flask_restx import Api
from Controllers.CourseController import api as courses_ns
from Controllers.UserController import api as users_ns

app = Flask(__name__)
api = Api(
    app,
    version="1.0",
    title="pxsng backend"
)

api.add_namespace(courses_ns, path="/courses")
api.add_namespace(users_ns, path="/users")


if __name__ == '__main__':
    load_dotenv(find_dotenv())
    app.run(debug=True)

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

# from .database import init_db, shutdown_db_session
from .clipboard import clipboard

app = Flask(__name__)
# Setup the Flask-JWT-Extended extension
# TODO: get these values from the environment
app.config["USER"] = "SOME_USERNAME"
app.config["AUTH_PASSWORD"] = "test"
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
jwt = JWTManager(app)
cors = CORS(app)

app.register_blueprint(clipboard, url_prefix='/api/clipboard')


# @app.teardown_appcontext
# def shutdown_session(exception=None):
#     shutdown_db_session()


# init_db()



@app.route("/login", methods=["POST"])
def login():
    password = request.json.get("password", None)
    if  password != app.config["AUTH_PASSWORD"]:
        return jsonify({"msg": "Bad password"}), 401

    access_token = create_access_token(identity=app.config["USER"])
    return jsonify(access_token=access_token)


@app.route('/')
@jwt_required()
def index():
    return jsonify(message="Hello, World!"), 200

# if __name__ == '__main__':
#     # app.app_context().push()
#     # db.create_all()  # create tables for our models
#     app.run(host='0.0.0.0', port=5000, debug=True)

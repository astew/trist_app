from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
from .config import settings

from .clipboard import clipboard

app = Flask(__name__)

app.config["USER"] = settings.AUTH_USERNAME
app.config["AUTH_PASSWORD"] = settings.AUTH_PASSWORD
app.config["JWT_SECRET_KEY"] = settings.JWT_SECRET_KEY
jwt = JWTManager(app)
cors = CORS(app)

app.register_blueprint(clipboard, url_prefix='/api/clipboard')



@app.route("/api/login", methods=["POST"])
def login():
    password = request.json.get("password", None)
    if  password != app.config["AUTH_PASSWORD"]:
        return jsonify({"msg": "Bad password"}), 401

    access_token = create_access_token(identity=app.config["USER"])
    return jsonify(access_token=access_token)

@app.route("/api/test_auth", methods=["GET"])
@jwt_required()
def test_auth():
    return jsonify(message="OK"), 200

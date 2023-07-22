from flask import Flask, jsonify, request, send_from_directory, url_for
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token
)
from .config import DevelopmentConfig

from .clipboard import clipboard
from .todo_list import todo_list_blueprint as todo_list

app = Flask(__name__, static_folder=None)

app.config.from_object(DevelopmentConfig)
app.config.from_prefixed_env()

jwt = JWTManager(app)


app.register_blueprint(clipboard, url_prefix='/api/clipboard')
app.register_blueprint(todo_list, url_prefix='/api/todo')


@app.route("/api/login", methods=["POST"])
def login():
  password = request.json.get("password", None)
  if  password != app.config["AUTH_PASSWORD"]:
      return jsonify({"msg": "Bad password"}), 401

  access_token = create_access_token(identity=app.config["AUTH_USERNAME"], 
                                      expires_delta=False)
  return jsonify(access_token=access_token)


@app.route("/api/test_auth", methods=["GET"])
@jwt_required()
def test_auth():
  return jsonify(message="OK"), 200
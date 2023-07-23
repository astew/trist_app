from flask import Flask, jsonify, request
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token, 
    set_access_cookies, unset_jwt_cookies
)
from .config import DevelopmentConfig


app = Flask(__name__)

app.config.from_object(DevelopmentConfig)
app.config.from_prefixed_env()

jwt = JWTManager(app)

@app.route("/auth/login", methods=["POST"])
def login():
  print(f"Attempted login.")
  password = request.json.get("password", None)
  if  password != app.config["AUTH_PASSWORD"]:
    return "bad password", 401
  
  response = jsonify({"msg": "login successful"})
  access_token = create_access_token(identity=app.config["AUTH_USERNAME"])
  set_access_cookies(response, access_token)
  return response


@app.route("/auth/logout", methods=["POST"])
def logout():
  response = jsonify({"msg": "logout successful"})
  unset_jwt_cookies(response)
  return response

@app.route("/auth/test", methods=["GET"])
@jwt_required()
def test():
  return "OK", 200

# @app.route("/*", methods=["GET", "POST"])
# @jwt_required()
# def catch_all():
#   return "OK", 200
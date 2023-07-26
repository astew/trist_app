from flask import Flask
from .clipboard import clipboard
# from .todo_list import todo_list_blueprint as todo_list
from .todo_api import api as todo_api

app = Flask(__name__)

app.config.from_prefixed_env()
app.config["DATA_DIR"] = "data/"

app.register_blueprint(clipboard, url_prefix='/api/clipboard')
app.register_blueprint(todo_api, url_prefix='/api/todo')

@app.route("/")
def index():
    return "Hello, World!"
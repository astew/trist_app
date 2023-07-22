from flask import Flask
from .clipboard import clipboard
from .todo_list import todo_list_blueprint as todo_list

app = Flask(__name__)

app.config.from_prefixed_env()

app.register_blueprint(clipboard, url_prefix='/api/clipboard')
app.register_blueprint(todo_list, url_prefix='/api/todo')

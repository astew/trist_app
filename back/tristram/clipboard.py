from flask import Blueprint
from flask import request
from flask_jwt_extended import (
    jwt_required
)

clipboard = Blueprint('clipboard', __name__)

clipboard_text = "default"

@clipboard.route('/get', methods=['GET'])
@jwt_required()
def get_clipboard():
    global clipboard_text
    print(request.headers)
    return clipboard_text 

@clipboard.route('/set', methods=['POST'])
@jwt_required()
def set_clipboard():
    global clipboard_text
    clipboard_text = request.json.get('text', None)
    return clipboard_text

@clipboard.route('/clear', methods=['POST'])
@jwt_required()
def clear_clipboard():
    global clipboard_text
    clipboard_text = ""
    return clipboard_text

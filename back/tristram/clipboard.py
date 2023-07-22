from flask import Blueprint
from flask import request

clipboard = Blueprint('clipboard', __name__)

clipboard_text = "default"

@clipboard.route('/get', methods=['GET'])
def get_clipboard():
    global clipboard_text
    return clipboard_text 

@clipboard.route('/set', methods=['POST'])
def set_clipboard():
    global clipboard_text
    clipboard_text = request.json.get('text', None)
    return clipboard_text

@clipboard.route('/clear', methods=['POST'])
def clear_clipboard():
    global clipboard_text
    clipboard_text = ""
    return clipboard_text

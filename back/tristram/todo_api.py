# Required Libraries
from flask import Blueprint, request, jsonify
from .db import TodoDB
import os

# Flask Blueprint
api = Blueprint('api', __name__)


db_path = '/data'
if not os.path.exists(db_path):
    db_path = './'
db_path = os.path.join(db_path, 'todo.db')

# Instantiate TodoDB
todo_db = TodoDB(db_path)

@api.route('/lists', methods=['POST'])
def add_list():
    name = request.json.get('name')
    list_id = todo_db.add_todo_list(name)
    return jsonify({'id': list_id}), 201

@api.route('/lists', methods=['GET'])
def get_lists():
    lists = todo_db.get_todo_lists()
    lists = [{"id": ll[0], "name": ll[1]} for ll in lists]
    return jsonify(lists), 200

@api.route('/lists/<int:list_id>', methods=['DELETE'])
def delete_list(list_id):
    todo_db.delete_todo_list(list_id)
    return jsonify({'message': 'Deleted'}), 200

@api.route('/items', methods=['POST'])
def add_item():
    list_id = request.json.get('list_id')
    title = request.json.get('title')
    desc = request.json.get('desc')
    item_id = todo_db.add_todo_item(list_id, title, desc)
    return jsonify({'id': item_id}), 201

@api.route('/lists/<int:list_id>/items', methods=['GET'])
def get_items(list_id):
    items = todo_db.get_todo_items(list_id)
    items = [{
        'id': item[0],
        'list_id': item[1],
        'title': item[2],
        'desc': item[3],
        'creation_date': item[4],
        'completion_date': item[5]
      } for item in items ]
    return jsonify(items), 200

@api.route('/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    item = todo_db.get_todo_item(item_id)
    item = {
        'id': item[0],
        'list_id': item[1],
        'title': item[2],
        'desc': item[3],
        'creation_date': item[4],
        'completion_date': item[5]
      }
    return jsonify(item), 200

@api.route('/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    todo_db.delete_todo_item(item_id)
    return jsonify({'message': 'Deleted'}), 200

@api.route('/items/<int:item_id>/complete', methods=['POST'])
def complete_item(item_id):
    todo_db.mark_todo_item_complete(item_id)
    return jsonify({'message': 'Marked as complete'}), 200

@api.route('/items/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    title = request.json.get('title')
    desc = request.json.get('desc')
    list_id = request.json.get('list_id')
    todo_db.update_todo_item(item_id, title, desc, list_id)
    return jsonify({'message': 'Updated'}), 200

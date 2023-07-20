from flask import Blueprint
from flask import request
from flask_jwt_extended import jwt_required
from pydantic import BaseModel
from typing import List, Dict

blueprint = Blueprint('todo', __name__)


class TodoItem(BaseModel):
  id: int
  title: str
  desc: str
  completed: bool


class TodoList(BaseModel):
    __root__: Dict[int, TodoItem] = {}

    def add_item(self, title: str, desc: str):
        item_id = max(self.__root__.keys()) + 1 if self.__root__ else 1
        item = TodoItem(id=item_id, title=title, desc=desc, completed=False)
        self.__root__[item.id] = item
        return item_id

    def remove_item(self, item_id: int):
        del self.__root__[item_id]

    def get_item(self, item_id: int) -> TodoItem:
        return self.__root__.get(item_id)

    def get_all_items(self) -> Dict[int, TodoItem]:
        return self.__root__

    def has_item(self, item_id: int) -> bool:
        return item_id in self.__root__
    
    def __in__(self, item_id: int) -> bool:
        return self.has_item(item_id)
    
    def clear(self):
        self.__root__ = {}



todo_list = TodoList()

item1 = TodoItem(id=1, title="test", desc="Description for item 1", completed=False)
item2 = TodoItem(id=2, title="test2", desc="Description for the other item", completed=True)

todo_list.add_item("test", "Description for item 1")
todo_list.add_item("test2", "Description for the other item")



@blueprint.route('/get', methods=['GET'])
@jwt_required()
def get_items():
  return todo_list.json()

@blueprint.route('/get/<int:id>', methods=['GET'])
@jwt_required()
def get_item(id: int):
  return (todo_list.get_item(id).json()
          if todo_list.has_item(id)
          else (f"Item {id} not found.", 404))


@blueprint.route('/add', methods=['POST'])
@jwt_required()
def add_item():
  try:
    title = request.json.get('title', None)
    desc = request.json.get('desc', None)
    item_id = todo_list.add_item(title=title, desc=desc)

    return {'id': item_id}, 201
  except Exception as e:
    return f"Error: {e}", 400


@blueprint.route('/delete/<int:id>', methods=['POST'])
@jwt_required()
def delete_item(id):

  if not todo_list.has_item(id):
    return f"Item {id} not found.", 404
  
  item = todo_list.get_item(id)
  todo_list.remove_item(id)
  return item.json()


@blueprint.route('/update/<int:id>', methods=['POST'])
@jwt_required()
def update_item(id):
  
  if not todo_list.has_item(id):
    return f"Item {id} not found.", 404
  
  item = todo_list.get_item(id)
  new_title = request.json.get('title', None)
  new_desc = request.json.get('desc', None)
  new_completed = request.json.get('completed', None)

  item.title = new_title if new_title else item.title
  item.desc = new_desc if new_desc else item.desc
  item.completed = new_completed if new_completed else item.completed

  return item.json()


@blueprint.route('/clear', methods=['POST'])
@jwt_required()
def clear_items():
  todo_list.clear()
  return "ok"


@blueprint.route('/complete/<int:id>', methods=['POST'])
@jwt_required()
def mark_complete(id):
  
  if not todo_list.has_item(id):
    return f"Item {id} not found.", 404
  
  item = todo_list.get_item(id)
  item.completed = True

  return item.json()

todo_list_blueprint = blueprint
# Required Libraries
import sqlite3
from datetime import datetime

class TodoDB:
    def __init__(self, db_path):
        self.db_path = db_path
        self.conn = sqlite3.connect(db_path, check_same_thread=False)
        self._create_tables()


    def __del__(self):
        self.conn.close()

    def _create_tables(self):
        cursor = self.conn.cursor()

        cursor.execute("""
        CREATE TABLE IF NOT EXISTS todo_lists (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL
        )
        """)

        cursor.execute("""
        CREATE TABLE IF NOT EXISTS todo_items (
            id INTEGER PRIMARY KEY,
            list INTEGER NOT NULL,
            title TEXT NOT NULL,
            desc TEXT,
            creation_date TEXT,
            completion_date TEXT,
            FOREIGN KEY(list) REFERENCES todo_lists(id)
        )
        """)

        self.conn.commit()

    def add_todo_list(self, name):
        cursor = self.conn.cursor()
        cursor.execute("""
        INSERT INTO todo_lists (name) VALUES (?)
        """, (name,))
        self.conn.commit()
        return cursor.lastrowid

    def get_todo_lists(self):
        cursor = self.conn.cursor()
        cursor.execute("""
        SELECT * FROM todo_lists
        """)
        return cursor.fetchall()

    def delete_todo_list(self, list_id):
        cursor = self.conn.cursor()
        cursor.execute("""
        DELETE FROM todo_items WHERE list = ?
        """, (list_id,))
        cursor.execute("""
        DELETE FROM todo_lists WHERE id = ?
        """, (list_id,))
        self.conn.commit()

    def add_todo_item(self, list_id, title, desc):
        cursor = self.conn.cursor()
        cursor.execute("""
        INSERT INTO todo_items (list, title, desc, creation_date) VALUES (?, ?, ?, ?)
        """, (list_id, title, desc, datetime.now().isoformat()))
        self.conn.commit()
        return cursor.lastrowid

    def get_todo_items(self, list_id):
        cursor = self.conn.cursor()
        cursor.execute("""
        SELECT * FROM todo_items WHERE list = ?
        """, (list_id,))
        return cursor.fetchall()

    def get_todo_item(self, item_id):
        cursor = self.conn.cursor()
        cursor.execute("""
        SELECT * FROM todo_items WHERE id = ?
        """, (item_id,))
        return cursor.fetchone()

    def delete_todo_item(self, item_id):
        cursor = self.conn.cursor()
        cursor.execute("""
        DELETE FROM todo_items WHERE id = ?
        """, (item_id,))
        self.conn.commit()

    def mark_todo_item_complete(self, item_id):
        cursor = self.conn.cursor()
        cursor.execute("""
        UPDATE todo_items SET completion_date = ? WHERE id = ?
        """, (datetime.now().isoformat(), item_id))
        self.conn.commit()

    def update_todo_item(self, item_id, title=None, desc=None, list_id=None):
        cursor = self.conn.cursor()
        if title is not None:
            cursor.execute("""
            UPDATE todo_items SET title = ? WHERE id = ?
            """, (title, item_id))
        if desc is not None:
            cursor.execute("""
            UPDATE todo_items SET desc = ? WHERE id = ?
            """, (desc, item_id))
        if list_id is not None:
            cursor.execute("""
            UPDATE todo_items SET list = ? WHERE id = ?
            """, (list_id, item_id))
        self.conn.commit()

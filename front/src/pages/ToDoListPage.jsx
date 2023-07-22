import React from "react";
import ListView from "./todo/ListView";
import AddTodo from "./todo/AddTodo";
import { useState, useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import todo from "../script/todo";

const ToDoListPage = () => {
  const [todo_items, setTodoItems] = useState([]);

  const [needsRefresh, setNeedsRefresh] = useState(false);

  const handleNeedsRefresh = () => {
    setNeedsRefresh(true);
  };

  useEffect(() => {
    async function getAll() {
      const todo_items = await todo.getAll();
      setTodoItems(todo_items);
    }
    getAll();
  }, []);

  useEffect(() => {
    async function getAll() {
      const todo_items = await todo.getAll();
      setTodoItems(todo_items);
      setNeedsRefresh(false);
    }
    if (needsRefresh) getAll();
  }, [needsRefresh]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ListView
              todo_items={todo_items}
              onItemChanged={handleNeedsRefresh}
            />
          }
        />
        <Route
          path="/add"
          element={<AddTodo onItemAdd={handleNeedsRefresh} />}
        />
      </Routes>
    </>
  );
};

export default ToDoListPage;

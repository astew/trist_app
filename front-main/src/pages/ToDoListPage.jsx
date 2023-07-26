import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Stack } from "react-bootstrap";

import Footer from "../components/Footer";

import ToDoLists from "../components/todo/ListsView";
import ToDoList from "../components/todo/ListView";
import AddTodoList from "../components/todo/AddList";
import AddTodoItem from "../components/todo/AddTodoItem";
import EditTodoItem from "../components/todo/EditTodoItem";
import TodoItemView from "../components/todo/TodoItemView";

const ToDoListPage = () => {
  const [pageActions, setPageActions] = useState([]);

  return (
    <Stack>
      <Routes>
        <Route
          path="/"
          element={<ToDoLists updatePageActions={setPageActions} />}
        />
        <Route
          path="/item/:item_id"
          element={<TodoItemView updatePageActions={setPageActions} />}
        />
        <Route
          path="/item/:item_id/edit"
          element={<EditTodoItem updatePageActions={setPageActions} />}
        />
        <Route
          path="/list/:list_id/add"
          element={<AddTodoItem updatePageActions={setPageActions} />}
        />
        <Route
          path="/list/:list_id/*"
          element={<ToDoList updatePageActions={setPageActions} />}
        />
        <Route
          path="/add"
          element={<AddTodoList updatePageActions={setPageActions} />}
        />
      </Routes>
      <Footer pageActions={pageActions} />
    </Stack>
  );
};

export default ToDoListPage;

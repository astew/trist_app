import React, { useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import TodoItem from "./todo/TodoItem";

import { useNavigate } from "react-router-dom";

const ToDoListPage = ({ authToken }) => {
  const navigate = useNavigate();

  useEffect(() => {
    let rd = typeof authToken !== "string" || authToken === "";
    if (rd) {
      console.log("navigating to /login");
      navigate("/login");
    }
  }, [authToken, navigate]);

  const todo_items = ["ItemA", "ItemB", "ItemC"];

  return (
    <>
      <h1>To-Do</h1>
      <Stack
        gap={3}
        className="flex-column-reverse"
      >
        {todo_items.map((item, dex) => (
          <TodoItem
            desc={item}
            key={dex}
          />
        ))}
      </Stack>
    </>
  );
};

export default ToDoListPage;

import React from "react";
import Stack from "react-bootstrap/Stack";
import TodoItem from "../components/TodoItem";
import { useState, useEffect } from "react";

import todo from "../script/todo";

const ToDoListPage = () => {
  const [todo_items, setTodoItems] = useState([]);

  useEffect(() => {
    async function getAll() {
      const todo_items = await todo.getAll();

      console.log(Object.entries(todo_items));

      setTodoItems(todo_items);
    }
    getAll();
  }, []);

  return (
    <>
      <Stack gap={3}>
        {Object.entries(todo_items).map((item, dex) => (
          <TodoItem
            item={item[1]}
            key={dex}
          />
        ))}
      </Stack>
    </>
  );
};

export default ToDoListPage;

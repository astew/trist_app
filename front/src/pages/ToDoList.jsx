import React from "react";
import Stack from "react-bootstrap/Stack";
import TodoItem from "../components/TodoItem";

const ToDoListPage = () => {
  const todo_items = ["ItemA", "ItemB", "ItemC"];

  return (
    <>
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

import React from "react";
import TodoItem from "./TodoItem";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ListView = ({ todo_items, onItemChanged }) => {
  return (
    <>
      <Link to="add">
        <Button variant="primary">Add Item</Button>
      </Link>
      <br />
      <Container className="todo-container">
        {Object.entries(todo_items).map((item, dex) => (
          <TodoItem
            item={item[1]}
            key={dex}
            onItemChanged={onItemChanged}
          />
        ))}
      </Container>
    </>
  );
};

export default ListView;

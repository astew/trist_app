import React from "react";
import { Button } from "react-bootstrap";

const TodoItem = ({ item }) => {
  return (
    <>
      <span>
        <div>
          <h4>{item.title}</h4>
          <p>{item.desc}</p>
        </div>
        <Button>Done</Button>
      </span>
    </>
  );
};

export default TodoItem;

import React from "react";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useParams, useNavigate } from "react-router-dom";

import todo from "../../script/todo";
import { formatISODateToReadable } from "../../script/util";

const TodoItemView = ({ updatePageActions }) => {
  const [item, setItem] = useState([]);
  const { item_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    updatePageActions([
      {
        text: "Mark Done",
        action: () => {
          todo.completeItem(item_id);
          navigate(-1, { replace: true });
        },
      },
      {
        text: "Edit",
        action: () => {
          navigate(`edit`);
        },
      },
      {
        text: "Delete",
        action: () => {
          todo.deleteItem(item_id);
          navigate(-1, { replace: true });
        },
      },
    ]);
  }, [item_id, item, navigate, updatePageActions]);

  useEffect(() => {
    async function getAllItems() {
      let newItem = await todo.getItem(item_id);
      setItem(newItem);
    }
    getAllItems();
  }, [item_id]);

  return (
    <Card
      bg={item.completion_date ? "success" : "dark"}
      border="primary"
      style={{ width: "18rem" }}
    >
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>{item.desc}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        <small>Created {formatISODateToReadable(item.creation_date)}</small>
      </Card.Footer>
    </Card>
  );
};

export default TodoItemView;

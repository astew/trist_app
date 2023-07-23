import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { useCallback } from "react";

import todo from "../../script/todo";

const TodoItem = ({ item, onItemChanged }) => {
  const handleComplete = useCallback(() => {
    async function completeItem() {
      try {
        await todo.complete(item.id);
        onItemChanged();
      } catch (e) {
        console.log("Failed to complete todo item.");
        console.log(e);
      }
    }
    completeItem();
  }, [item.id, onItemChanged]);

  const handleEdit = useCallback(() => {
    async function editItem() {
      try {
        // await todo.delete(item.id);
        console.log(`Edit item not yet implemented. ID: ${item.id}`);
      } catch (e) {
        console.log("Failed to edit todo item.");
        console.log(e);
      }
    }
    editItem();
  }, [item.id]);

  const handleDelete = useCallback(() => {
    async function deleteItem() {
      try {
        await todo.delete(item.id);
        onItemChanged();
      } catch (e) {
        console.log("Failed to delete todo item.");
        console.log(e);
      }
    }
    deleteItem();
  }, [item.id, onItemChanged]);

  return (
    <Card
      bg={item.completed ? "success" : "dark"}
      border="primary"
      style={{ width: "18rem" }}
    >
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>{item.desc}</Card.Text>
        {item.completed ? (
          ""
        ) : (
          <Button
            variant="primary"
            onClick={handleComplete}
          >
            Complete
          </Button>
        )}
        &nbsp;
        {item.completed ? (
          ""
        ) : (
          <Button
            variant="secondary"
            onClick={handleEdit}
          >
            Edit
          </Button>
        )}
        &nbsp;
        <Button
          variant="danger"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">
        Created {item.creation_time}{" "}
      </Card.Footer>
    </Card>
  );
};

export default TodoItem;

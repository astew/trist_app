import React from "react";
import { useState, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useNavigate } from "react-router-dom";

import todo from "../../script/todo";

const AddTodo = ({ onItemAdd }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();

  const handleAdd = useCallback(() => {
    async function addItem() {
      try {
        await todo.add(title, desc);
        onItemAdd();
        navigate(-1, { replace: true });
      } catch (e) {
        console.log("Failed to add todo item.");
        console.log(e);
      }
    }
    addItem();
  }, [title, desc, navigate, onItemAdd]);

  return (
    <>
      <Form>
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
        >
          <Form.Label>Title</Form.Label>
          <Form.Control
            as="input"
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="description"
            onChange={(e) => setDesc(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          onClick={handleAdd}
        >
          Add
        </Button>
      </Form>
    </>
  );
};

export default AddTodo;

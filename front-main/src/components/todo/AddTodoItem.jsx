import React from "react";
import { useState, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useNavigate, useParams } from "react-router-dom";

import todo from "../../script/todo";

const AddTodoItem = () => {
  const { list_id } = useParams();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();

  const handleAdd = useCallback(() => {
    async function addItem() {
      try {
        await todo.addItem(list_id, title, desc);
        navigate(-1, { replace: true });
      } catch (e) {
        console.log("Failed to add todo item.");
        console.log(e);
      }
    }
    addItem();
  }, [list_id, title, desc, navigate]);

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
            autoComplete="off"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="description"
            autoComplete="off"
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

export default AddTodoItem;

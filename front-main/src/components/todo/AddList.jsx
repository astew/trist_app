import React from "react";
import { useState, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useNavigate } from "react-router-dom";

import todo from "../../script/todo";

const AddTodoList = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleAdd = useCallback(() => {
    async function addList() {
      try {
        await todo.addList(name);
        navigate(-1, { replace: true });
      } catch (e) {
        console.log("Failed to add todo list.");
        console.log(e);
      }
    }
    addList();
  }, [name, navigate]);

  return (
    <>
      <Form>
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
        >
          <Form.Label>Name</Form.Label>
          <Form.Control
            as="input"
            placeholder="name"
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
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

export default AddTodoList;

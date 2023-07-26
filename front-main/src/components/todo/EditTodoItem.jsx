import React from "react";
import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import todo from "../../script/todo";

const EditTodoItem = ({ updatePageActions }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [listId, setListId] = useState("");
  const { item_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    updatePageActions([]);
  }, [updatePageActions]);

  useEffect(() => {
    async function getAllItems() {
      let item = await todo.getItem(item_id);
      setTitle(item.title);
      setDesc(item.desc);
      setListId(item.list_id);
    }
    getAllItems();
  }, [item_id]);

  const handleUpdate = useCallback(() => {
    async function addItem() {
      try {
        await todo.updateItem(item_id, title, desc, listId);
        navigate(-1, { replace: true });
      } catch (e) {
        console.log("Failed to add todo item.");
        console.log(e);
      }
    }
    addItem();
  }, [listId, item_id, title, desc, navigate]);

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
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="description"
            autoComplete="off"
            defaultValue={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          onClick={handleUpdate}
        >
          Update
        </Button>
      </Form>
    </>
  );
};

export default EditTodoItem;

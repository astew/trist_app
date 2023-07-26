import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

import TodoItemCard from "./TodoItemCard";

import todo from "../../script/todo";

const ToDoList = ({ updatePageActions }) => {
  const { list_id } = useParams();
  const [todoItems, setTodoItems] = useState([]);
  const navigate = useNavigate();

  const [needsRefresh, setNeedsRefresh] = useState(false);

  useEffect(() => {
    updatePageActions([
      {
        text: "Add Item",
        action: () => {
          navigate(`add`);
        },
      },
      {
        text: "Refresh",
        action: () => {
          setNeedsRefresh(true);
        },
      },
      {
        text: "Delete List",
        action: () => {
          todo.deleteList(list_id);
          navigate(-1, { replace: true });
        },
      },
    ]);
  }, [navigate, list_id, updatePageActions]);

  useEffect(() => {
    async function getAllItems() {
      const lists = await todo.getItems(list_id);
      setTodoItems(lists);
    }
    getAllItems();
  }, [list_id]);

  useEffect(() => {
    async function getAllItems() {
      const lists = await todo.getItems(list_id);
      setTodoItems(lists);
      setNeedsRefresh(false);
    }
    if (needsRefresh) getAllItems();
  }, [list_id, needsRefresh]);

  return (
    <Container className="todo-container">
      {todoItems.map((item, dex) => (
        <TodoItemCard
          item={item}
          key={dex}
        />
      ))}
    </Container>
  );
};

export default ToDoList;

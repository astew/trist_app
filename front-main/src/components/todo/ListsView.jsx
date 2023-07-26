import React from "react";
import { useState, useEffect } from "react";

import { Container, Stack, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import todo from "../../script/todo";

const ToDoLists = ({ updatePageActions }) => {
  const [todoLists, setTodoLists] = useState([]);

  const [needsRefresh, setNeedsRefresh] = useState(false);
  const navigate = useNavigate();

  // const refreshLists = () => {
  //   setNeedsRefresh(true);
  // };

  useEffect(() => {
    updatePageActions([
      {
        text: "Refresh",
        action: () => {
          setNeedsRefresh(true);
        },
      },
      {
        text: "Add",
        action: () => {
          navigate(`add`);
        },
      },
    ]);
  }, [navigate, updatePageActions]);

  useEffect(() => {
    async function getAll() {
      const lists = await todo.getLists();
      setTodoLists(lists);
    }
    getAll();
  }, []);

  useEffect(() => {
    async function getAll() {
      const lists = await todo.getLists();
      setTodoLists(lists);
      setNeedsRefresh(false);
    }
    if (needsRefresh) getAll();
  }, [needsRefresh]);

  return (
    <Stack>
      {todoLists.map((list_json, dex) => (
        <Container key={dex}>
          <div>
            <Link to={"list/" + list_json.id}>
              <Badge>{list_json.name}</Badge>
            </Link>
          </div>
        </Container>
      ))}
    </Stack>
  );
};

export default ToDoLists;

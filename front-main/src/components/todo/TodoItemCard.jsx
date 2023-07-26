import React from "react";
// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

import { formatISODateToReadable } from "../../script/util";

const TodoItemCard = ({ item, onItemChanged }) => {
  return (
    <>
      <Link
        to={`/todo/item/${item.id}`}
        style={{ textDecoration: "none" }}
      >
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
            Created {formatISODateToReadable(item.creation_date)}{" "}
          </Card.Footer>
        </Card>
      </Link>
    </>
  );
};

export default TodoItemCard;

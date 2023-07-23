import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

import axios from "axios";

const App = () => {

  const [show] = useState(true);
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    try {
      e.preventDefault()
      await axios.post("/auth/login", { password }, { withCredentials: true });
      console.log("login successful");
      window.location.href = "/app";

    } catch (err) {
      console.log(err);
      setPassword("");
    }
  };


  return (    
  <Modal
    show={show}
    backdrop="static"
    keyboard={false}
    centered
  >
    <Modal.Header>
      <Modal.Title>Login</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={handleLogin}>
        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button
        variant="primary"
        onClick={handleLogin}
      >
        Submit
      </Button>
    </Modal.Footer>
  </Modal>
  );
};

export default App;

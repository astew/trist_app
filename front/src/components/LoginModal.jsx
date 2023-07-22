import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";

function LoginModal() {
  const [show] = useState(true);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async () => {
    try {
      await axios.post("/auth/login", { password }, { withCredentials: true });
      console.log("login successful");

      navigate("/");
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
          type="submit"
          onSubmit={handleLogin}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginModal;

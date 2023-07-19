import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

import auth from "../script/auth";

function LoginModal() {
  const [show, setShow] = useState(true);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async () => {
    const success = await auth.login(password);

    if (!success) {
      console.log("login failed");
      setPassword("");
      return;
    }

    const verified = await auth.test_auth();

    if (!verified) {
      alert("Couldn't verify authorization");
      return;
    }

    console.log("login successful");
    let navto = "/";
    if (location.state != null)
      navto = location.state.previousLocation.pathname;
    navigate(navto, {
      replace: true,
    });
  };

  return (
    <Modal
      show={show}
      // onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
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
          type="button"
          onClick={handleLogin}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginModal;

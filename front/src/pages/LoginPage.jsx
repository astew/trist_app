import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { getAuthToken } from "../script/auth";

const LoginPage = ({ setAuthToken }) => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  return (
    <div className="login">
      <h1>Login</h1>
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
        <Button
          variant="primary"
          type="button"
          onClick={async () => {
            const token = await getAuthToken(password);
            if (token) {
              console.log("login successful");
              setAuthToken(token);
              navigate("/");
            } else {
              console.log("login failed");
              setPassword("");
            }
          }}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;

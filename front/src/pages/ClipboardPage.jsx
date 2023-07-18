import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import Config from "../config";

import { useNavigate } from "react-router-dom";

const API_BASE = Config.APIBaseURL + "/clipboard";

const ClipboardPage = ({ authToken }) => {
  const navigate = useNavigate();

  useEffect(() => {
    let rd = typeof authToken !== "string" || authToken === "";
    if (rd) {
      console.log("navigating to /login");
      navigate("/login");
    }
  }, [authToken, navigate]);

  const [text, setText] = useState("");

  useEffect(() => {
    async function getClipboard() {
      let res = await axios.get(API_BASE + "/get");
      setText(res.data);
    }
    getClipboard();
  }, []);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handlePush = async () => {
    // Adjust the URL to your actual API endpoint
    await axios.post(API_BASE + "/set", { text });
  };

  const handlePull = async () => {
    // Adjust the URL to your actual API endpoint
    const response = await axios.get(API_BASE + "/get");
    setText(response.data);
  };

  const handleClear = async () => {
    // Adjust the URL to your actual API endpoint
    await axios.post(API_BASE + "/clear", "");
    setText("");
  };

  return (
    <div className="clipboard">
      <h1>Clipboard</h1>
      <textarea
        value={text}
        onChange={handleChange}
        className="clipboard-text"
        rows="10"
        cols="30"
      />
      <div>
        <Button
          variant="primary"
          onClick={handlePush}
        >
          Push
        </Button>
        <Button
          variant="secondary"
          onClick={handlePull}
        >
          Pull
        </Button>
        <Button
          variant="secondary"
          onClick={handleClear}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

export default ClipboardPage;

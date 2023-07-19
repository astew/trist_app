import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

import clipboard from "../script/clipboard";

const ClipboardPage = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    async function getClipboard() {
      let newText = await clipboard.pullText();
      setText(newText);
    }
    getClipboard();
  }, []);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handlePush = async () => {
    await clipboard.pushText(text);
  };

  const handlePull = async () => {
    let newText = await clipboard.pullText();
    setText(newText);
  };

  const handleClear = async () => {
    await clipboard.pushText("");
    setText("");
  };

  return (
    <div className="clipboard">
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

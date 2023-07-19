import React from "react";

const TodoItem = ({ desc }) => {
  return (
    <>
      <div>
        <input
          type="checkbox"
          label={desc}
        />
        {desc}
      </div>
    </>
  );
};

export default TodoItem;

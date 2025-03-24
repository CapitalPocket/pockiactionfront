import React, { useState } from "react";

const Input = ({ sendMessage }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="input-container">
      <input
        type="text"
        className="input-box"
        placeholder="Escribe un mensaje..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button className="send-button" onClick={handleSend}>
        ➤
      </button>
    </div>
  );
};

export default Input;

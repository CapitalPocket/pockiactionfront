import React, { useState } from "react";
import Message from "./Message";
import Input from "./Input";

let _messages = [{ text: "Hola! ¿Como puedo ayudarte?", sender: "bot" }]

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: "Hola! ¿Como puedo ayudarte?", sender: "bot" }
  ]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    console.log(text)
    _messages = [..._messages, { text, sender: "user" },  { text: 'Procesando...', sender: "bot" }]; 
    setMessages(_messages);
    
    fetch("https://pockiactionloadbalancer-1198368912.us-east-1.elb.amazonaws.com/postdata", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          "prompt": text
      })
    })
    .then(response => response.json())  // Parse JSON response
    .then(data =>  { 
      console.log("Success:", data)
      _messages = [..._messages, { text: data.result, sender: "bot" }];    
      setMessages(_messages);
    })  // Handle success
    .catch(error => console.error("Error:", error));  // Handle error
  };

  return (
    <div className="chat-container">
      <div className="chat-header"><img height={50} src="image/logo.svg"></img></div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} />
        ))}
      </div>
      <Input sendMessage={sendMessage} />
    </div>
  );
};

export default Chat;

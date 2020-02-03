import React, { useState, useEffect } from "react";
import { TextField, Card } from "@material-ui/core";
import io from "socket.io-client";
import { connect } from "react-redux";
import { addMessage } from "../../actions/chat-actions";
import config from "../../config";

const Chat = props => {
  const [socket, setSocket] = useState(Function);
  const [inputText, setInputText] = useState("");
  const sendRequest = e => {
    e.preventDefault();
    props.addMessage(`You: ${inputText}`);
    socket.emit("message", inputText);
    setInputText("");
  };
  useEffect(() => {
    const socket = io(config.serverd || "http://localhost:5000");
    setSocket(socket);
    socket.on("connect", () => {
      console.log("you are connected");

      socket.on("messageRes", text => {
        props.addMessage(text);
      });
    });
  }, []);
  return (
    <div className="App">
      <section className="chat--wrapper">
        <form className="chat--inner" onSubmit={e => sendRequest(e)}>
          <TextField
            onChange={e => setInputText(e.target.value)}
            value={inputText}
            placeholder="message"
            className="chat__inputText"
          />
        </form>
        <div className="chat">
          <ul className="chat__messages">
            {props.messages.map((message, id) => {
              return (
                <li key={id} className={"chat__message"}>
                  <Card>{message} </Card>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
};
export default connect(
  state => ({
    messages: state.chat.messages
  }),
  {
    addMessage: addMessage
  }
)(Chat);

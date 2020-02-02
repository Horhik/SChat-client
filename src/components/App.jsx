import React, {useState, useEffect} from 'react';
import config from '../config';
import {TextField} from '@material-ui/core';
import io from 'socket.io-client';

function App() {
  const [messageList, addToMessageList] = useState(['']);
  const [socket, setSocket] = useState(Function);
  const [inputText, setInputText] = useState('');
  const sendRequest = e => {
    e.preventDefault();
    socket.emit('message', inputText);
    setInputText('');
  };
  useEffect(() => {
    const socket = io(/*config.server ||*/ 'http://192.168.0.105:5000');
    setSocket(socket);
    socket.on('connect', () => {
      console.log(socket);
      alert('you are connected');

      socket.on('messageRes', text => {
        let newList = [...messageList];
        newList.push(text);
        console.log(newList);
        addToMessageList(newList);
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
          <ul>
            {messageList.map((message, id) => {
              return <li key={id}>{message}</li>;
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default App;

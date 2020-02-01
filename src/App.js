import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import config from './config';

function App() {
    const [res, setRes] = useState('null')
    const sendRequest =async () => {
        const response = await fetch(config.server);
        const data = await response.text();
        await setRes(data)
    }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <button onClick={sendRequest}>Send request</button>
        <code>{res}</code>

    </div>
  );
}

export default App;

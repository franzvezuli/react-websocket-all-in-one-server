import React, { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState('');
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8080');

    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.current.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const sendMessage = () => {
    if (name === '') {
      return alert('Please enter a name.');
    }

    if (inputValue.trim() !== '') {
      const message = `(${getCurrentTimestamp()}) ${name}: ${inputValue}`;
      ws.current.send(message);
      setInputValue('');
    }
  };

  return (
      <div className="app">
        <header className="content">
          <h1>React Websocket All-In-One Server</h1>
        </header>

        <div className="content">
          From: <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="content">
          Message: <input id="myInput" type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <button onClick={sendMessage}>Send</button>
        </div>

        <div className="content">
          {messages.map((message, index) => (
              <p key={index}>{message}</p>
          ))}
        </div>
      </div>
  );
}

export default App;

/**
 * Retrieves the current timestamp
 *
 * @returns {string} in the format of HH:mm:ss AM/PM
 */
function getCurrentTimestamp() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // If hour is 0, set it to 12
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return hours + ':' + minutes + ':' + seconds + ' ' + ampm;
}

import React from 'react';
import ChatBox from './components/ChatBox';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Chatbox</h1> {/* titulo da aplicação */}
      <ChatBox /> {/* renderiza o componente Chatbox*/}
    </div>
  );
}

export default App;

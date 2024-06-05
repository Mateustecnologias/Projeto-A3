import React from 'react';
import './ChatMessage.css';


const ChatMessage = ({ message }) => { // componente para exibir as mensagens de forma individuais //
    console.log('renderizando nmensagem' , message);
    return (
        <div className={`message ${message.sender}`}>
            <p>{message.text}</p>
        </div>
    );
};

export default ChatMessage;
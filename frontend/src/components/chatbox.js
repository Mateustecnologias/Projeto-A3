import React, { useState } from 'react';
import axios from 'axios'; // Importa o Axios
import ChatMessage from './ChatMessage'; // Importa o componente ChatMessage
import './ChatBox.css'; // Arquivo CSS opcional para estilização

const ChatBox = () => {
  const [messages, setMessages] = useState([]); // Estado para armazenar as mensagens
  const [input, setInput] = useState(''); // Estado para armazenar o valor do input

  // Função para enviar a mensagem
  const sendMessage = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    if (input.trim() === '') return; // Verifica se o input está vazio

    const newMessage = { text: input, sender: 'user' }; // Cria um objeto para a nova mensagem do usuário
    setMessages([...messages, newMessage]); // Adiciona a nova mensagem ao estado

    setInput(''); // Limpa o input

    try {
      // Envia a mensagem para o backend
      const response = await axios.post('http:/localhost:4000/chatbox/', {
        message: input,
      });
l
      const data = response.data; // Obtém os dados da resposta
      const botMessage = { text: data.response, sender: 'bot' }; // Cria um objeto para a mensagem do bot
      setMessages((prevMessages) => [...prevMessages, botMessage]); // Adiciona a mensagem do bot ao estado
    } catch (error) {
      console.error('Error:', error); // Lida com erros na requisição
    }
  };

  return (
    <div className="chatbox">
      <div className="messages">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} /> // Renderiza cada mensagem
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)} // Atualiza o estado com o valor do input
          placeholder="Type your message..."
        />
        <button type="submit">Send</button> {/* Botão para enviar a mensagem */}
      </form>
    </div>
  );
};

export default ChatBox;

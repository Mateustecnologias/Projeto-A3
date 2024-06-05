import React, { useState, useRef, useEffect } from 'react'; // Importe o useRef e o useEffect
import axios from 'axios';
import ChatMessage from './ChatMessage';
import './ChatBot.css';

const ChatBot = () => {
  const [messages, setMessages] = useState([]); // Estado para armazenar as mensagens
  const [input, setInput] = useState(''); // Estado para armazenar o valor do input
  const [sending, setSending] = useState(false); // Estado para controlar o envio

  const messagesEndRef = useRef(null); // Referência para o final da lista de mensagens

  // Função para rolar até o final das mensagens
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // UseEffect para rolar para o final das mensagens sempre que as mensagens mudarem
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Função para enviar a mensagem
  const sendMessage = async (e) => {
    e.preventDefault(); // Previne o comportamento do formulário
    if (input.trim() === '' || sending)  // Verifica se o input está vazio ou se o envio está em andamento
      return;

    setSending(true); // Define que o envio está em andamento

    const newMessage = { text: input, sender: 'user' }; // Cria um objeto para a mensagem do usuário
    setMessages([...messages, newMessage]); // Adiciona mensagem ao estado
    setInput(''); // Limpa o input

    try { // Envia a mensagem para o backend
      console.log('Enviando mensagem para o backend...');
      const response = await axios.post('http://localhost:8080/chatBot', {
        prompt: input
      });

      console.log('Resposta recebida:', response.data);
      const data = response.data; // Obtém os dados da resposta
      const botMessage = { text: data.response, sender: 'bot' }; // Cria um objeto para a mensagem do bot
      setMessages((prevMessages) => [...prevMessages, botMessage]); // Adiciona a mensagem do bot 
    } catch (error) {
      console.error('Error:', error); // Lida com erros na requisição
    } finally {
      setSending(false); // Define que o envio foi concluído, independentemente de ser bem-sucedido ou não
    }
  };

  return (
    <div className="chatBot">
      <header className="header">
        <h3>CHAT BOT</h3>
      </header>
      <div className="messages">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} /> // Renderiza cada mensagem
        ))}
        <div ref={messagesEndRef} /> {/* Referência para o final da lista de mensagens */}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)} // Atualiza o estado com o valor do input
          placeholder="Escreva aqui..."
          disabled={sending} // Desabilita o input enquanto o envio está em andamento
        />
        <button type="submit" disabled={sending}> {/* Desabilita o botão enquanto o envio está em andamento */}
          {sending ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
};

export default ChatBot;

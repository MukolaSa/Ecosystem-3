import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Стилі для компонентів
const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  max-width: 400px;
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #4CAF50;
  cursor: pointer;
  margin-top: 10px;
  text-decoration: underline;
`;

const Message = styled.p`
  color: #f44336;
  margin-top: 10px;
`;

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // Перемикач між реєстрацією та входом
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Обробка форми
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { email, password };

    try {
      const url = isLogin ? '/api/login' : '/api/register'; // Визначаємо URL для API
      const response = await axios.post(url, userData);
      setMessage(response.data.message); // Виведення повідомлення
    } catch (error) {
      setMessage(error.response.data.message); // Якщо є помилка, виводимо її
    }
  };

  return (
    <AuthContainer>
      <Title>{isLogin ? 'Login' : 'Register'}</Title>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Встановлюємо email
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Встановлюємо пароль
          required
        />
        <Button type="submit">{isLogin ? 'Login' : 'Register'}</Button>
      </form>
      <ToggleButton onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Create an account' : 'Already have an account?'}
      </ToggleButton>
      {message && <Message>{message}</Message>} {/* Виведення повідомлення про помилку або успіх */}
    </AuthContainer>
  );
}

export default AuthPage;

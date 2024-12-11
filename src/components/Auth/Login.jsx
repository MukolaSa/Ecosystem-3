import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
`;

const FormWrapper = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Link = styled.a`
  color: #007bff;
  text-decoration: none;
  display: block;
  margin-top: 10px;
  text-align: center;
`;

const Alert = styled.div`
  color: red;
  text-align: center;
  margin-top: 10px;
`;

export function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    // Перевірка, чи існує вже користувач
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(user => user.email === email)) {
      setError("Цей email вже зареєстрований.");
      return;
    }

    // Збереження нового користувача
    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    setUsername("");
    setEmail("");
    setPassword("");
    setError("");
    alert("Реєстрація успішна!");
  };

  return (
    <Wrapper>
      <FormWrapper>
        <h2>Реєстрація</h2>
        <Input
          type="text"
          placeholder="Ім'я"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleRegister}>Зареєструватися</Button>
        {error && <Alert>{error}</Alert>}
        <Link href="/login">Вже є акаунт? Увійти</Link>
      </FormWrapper>
    </Wrapper>
  );
}

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      navigate("/dashboard");
    } else {
      setError("Невірний email або пароль.");
    }
  };

  return (
    <Wrapper>
      <FormWrapper>
        <h2>Вхід</h2>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Увійти</Button>
        {error && <Alert>{error}</Alert>}
        <Link href="/register">Ще немає акаунта? Зареєструватися</Link>
      </FormWrapper>
    </Wrapper>
  );
}

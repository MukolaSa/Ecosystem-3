// PromoCodeGenerator.jsx
import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9f9fc;
`;

const Container = styled.div`
  padding: 40px; /* Збільшений відступ */
  max-width: 500px; /* Збільшена ширина */
  background-color: #ffffff;
  border-radius: 16px; /* Більший радіус для згладжених країв */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const BackgroundCircle = styled.div`
  position: absolute;
  width: 200px; /* Збільшений розмір */
  height: 200px; /* Збільшений розмір */
  border-radius: 50%;
  background-color: rgba(41, 128, 185, 0.2); /* Напівпрозорий синій */
  z-index: 0;

  &:nth-child(1) {
    top: -60px; /* Зміщено більше */
    left: -60px;
  }

  &:nth-child(2) {
    bottom: -60px;
    right: -60px;
  }
`;

const Title = styled.h2`
  font-size: 2rem; /* Збільшений шрифт */
  margin-bottom: 30px; /* Більший відступ */
  color: #2980b9; /* Синій */
  z-index: 1;
`;

const Code = styled.div`
  margin: 25px 0;
  font-size: 1.6rem; /* Збільшений шрифт */
  font-weight: bold;
  color: #3498db; /* Насичений синій */
  z-index: 1;
`;

const Button = styled.button`
  padding: 14px 20px; /* Збільшений розмір кнопки */
  width: 100%;
  font-size: 1.2rem; /* Збільшений розмір шрифту */
  font-weight: bold;
  background-color: #3498db; /* Насичений синій */
  color: white;
  border: none;
  border-radius: 10px; /* Трохи більший радіус */
  cursor: pointer;
  z-index: 1;
  transition: background-color 0.3s ease, transform 0.2s ease;
  outline: none;

  &:hover {
    background-color: #2c81ba; /* Темніший синій */
    transform: scale(1.05); /* Легка анімація масштабування */
  }
`;

const PromoCodeGenerator = () => {
  const [promoCode, setPromoCode] = useState('');

  const generateCode = () => {
    const randomCode = `PROMO-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
    setPromoCode(randomCode);
  };

  return (
    <Wrapper>
      <Container>
        <BackgroundCircle />
        <BackgroundCircle />
        <Title>Генератор промокодів</Title>
        <Button onClick={generateCode}>Згенерувати промокод</Button>
        {promoCode && <Code>{promoCode}</Code>}
      </Container>
    </Wrapper>
  );
};

export default PromoCodeGenerator;

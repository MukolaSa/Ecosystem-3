import React, { useState } from 'react';
import { ChartBarIcon, CashIcon } from '@heroicons/react/outline';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
  position: relative;
  overflow: hidden;

  /* Фонові іконки */
  &::before,
  &::after {
    content: "";
    position: absolute;
    font-size: 220px;
    color: rgba(0, 123, 255, 0.1);
    z-index: 0;
  }

  &::before {
    top: -80px;
    left: -80px;
  }

  &::after {
    bottom: -80px;
    right: -80px;
  }
`;

const Container = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 40px 50px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  width: 550px;
  z-index: 1;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #290486;
  margin-bottom: 20px;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 12px;
  margin: 15px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.95rem;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 6px rgba(0, 123, 255, 0.5);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #6425fe;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #004085;
  }
`;

const Result = styled.div`
  margin-top: 20px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #28a745;
`;

const DiscountCalculator = () => {
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [finalPrice, setFinalPrice] = useState('');

  const calculateDiscount = () => {
    const result = price - (price * discount) / 100;
    setFinalPrice(result.toFixed(2));
  };

  return (
    <Wrapper>
      <Container>
        <Title>Розрахунок ціни зі знижкою</Title>
        <Input
          type="number"
          placeholder="Початкова ціна"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Знижка, %"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
        <Button onClick={calculateDiscount}>Розрахувати</Button>
        {finalPrice && <Result>Ціна зі знижкою: {finalPrice}</Result>}
      </Container>
    </Wrapper>
  );
};

export default DiscountCalculator;

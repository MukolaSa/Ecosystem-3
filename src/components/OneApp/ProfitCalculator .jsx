import React, { useState } from 'react';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const ProfitCalculatorContainer = styled.div`
  max-width: 600px;
  margin: 20px;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
  text-align: center;

  &:hover {
    transform: scale(1.025);
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333333;
  margin-bottom: 20px;
  font-weight: 700;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 1.1rem;
  color: #444444;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: 600;
`;

const InputField = styled.input`
  padding: 12px;
  border: 1px solid #dddddd;
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s, box-shadow 0.3s;
  background-color: #f9f9f9;
  margin-top: 8px;

  &:focus {
    outline: none;
    border-color: #444444;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  }

  &[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
`;

const CalculateButton = styled.button`
  padding: 12px 20px;
  background-color: #444444;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.2s;

  &:hover {
    background-color: #222222;
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Result = styled.h3`
  margin-top: 25px;
  padding: 15px;
  background-color: #f4f4f4;
  border-radius: 8px;
  border: 1px solid #dddddd;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  text-align: center;

  p {
    font-size: 1.3rem;
    color: #333333;
    margin: 0;
    font-weight: 600;
  }

  strong {
    font-size: 1.5rem;
    color: #222222;
    font-weight: bold;
  }
`;

const ProfitCalculator = () => {
  const [adCost, setAdCost] = useState('');
  const [productCost, setProductCost] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [unitsSold, setUnitsSold] = useState('');
  const [profit, setProfit] = useState(null);

  const calculateProfit = () => {
    const totalRevenue = salePrice * unitsSold;
    const totalCost = adCost + productCost * unitsSold;
    const netProfit = totalRevenue - totalCost;
    setProfit(netProfit);
  };

  return (
    <AppContainer>
      <ProfitCalculatorContainer>
        <Title>Калькулятор прибутковості</Title>
        <InputContainer>
          <Label>Рекламні витрати:</Label>
          <InputField
            type="number"
            value={adCost}
            onChange={e => setAdCost(parseFloat(e.target.value) || 0)}
          />
        </InputContainer>
        <InputContainer>
          <Label>Собівартість товару:</Label>
          <InputField
            type="number"
            value={productCost}
            onChange={e => setProductCost(parseFloat(e.target.value) || 0)}
          />
        </InputContainer>
        <InputContainer>
          <Label>Ціна продажу товару:</Label>
          <InputField
            type="number"
            value={salePrice}
            onChange={e => setSalePrice(parseFloat(e.target.value) || 0)}
          />
        </InputContainer>
        <InputContainer>
          <Label>Кількість проданих одиниць:</Label>
          <InputField
            type="number"
            value={unitsSold}
            onChange={e => setUnitsSold(parseInt(e.target.value) || 0)}
          />
        </InputContainer>
        <CalculateButton onClick={calculateProfit}>
          Розрахувати прибуток
        </CalculateButton>
        {profit !== null && <Result>Прибуток: {profit.toFixed(0)}</Result>}
      </ProfitCalculatorContainer>
    </AppContainer>
  );
};

export default ProfitCalculator;

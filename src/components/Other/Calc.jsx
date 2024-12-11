import React, { useState } from "react";
import styled from "styled-components";

const App = () => {
  const [leads, setLeads] = useState("");
  const [buyers, setBuyers] = useState("");
  const [conversion, setConversion] = useState(null);

  const calculateConversion = () => {
    if (leads && buyers && leads > 0) {
      const result = ((buyers / leads) * 100).toFixed(2);
      setConversion(result);
    } else {
      setConversion("Введіть коректні дані.");
    }
  };

  return (
    <AppContainer>
      <AppContent>
        <Header>
          <h1>Конверсія у продаж</h1>
        </Header>
        <InputContainer>
          <label>
            Кількість лідів:
            <input
              type="number"
              value={leads}
              onChange={(e) => setLeads(e.target.value)}
              // placeholder="Кількість лідів"
            />
          </label>
          <label>
            Кількість покупців:
            <input
              type="number"
              value={buyers}
              onChange={(e) => setBuyers(e.target.value)}
              // placeholder="Кількість покупців"
            />
          </label>
          <Button onClick={calculateConversion}>Розрахувати</Button>
        </InputContainer>
        {conversion !== null && (
          <Result>
            {typeof conversion === "string" ? (
              <p>{conversion}</p>
            ) : (
              <p>Конверсія у продаж: <strong>{conversion}%</strong></p>
            )}
          </Result>
        )}
      </AppContent>
    </AppContainer>
  );
};

export default App;

// Styled-components
const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const AppContent = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 30px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.01);
  }
`;

const Header = styled.header`
  h1 {
    font-size: 2.5rem;
    color: #333333;
    margin-bottom: 20px;
    font-weight: 700;
  }
  p {
    color: #666666;
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;

  label {
    font-size: 1.1rem;
    color: #444444;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-weight: 600;
  }

  input {
    padding: 12px;
    border: 1px solid #dddddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s, box-shadow 0.3s;
    background-color: #f9f9f9;

    &:focus {
      outline: none;
      border-color: #444444;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    }
  }
`;

const Button = styled.button`
  background-color: #444444;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
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

const Result = styled.div`
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

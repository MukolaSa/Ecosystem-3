import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Зовнішній контейнер для колонок
const Board = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

const CardContainer = styled.div`
  width: 380px;
  min-height: 695px;
  max-height: 695px;
  background-color: #6930f6;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: white;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const Title = styled.h3`
  margin-bottom: 10px;
  color: #fff;
  font-size: 20px;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CardStyled = styled.div`
  width: 100%;
  height: auto;
  min-height: 110px;
  border-radius: 10px;
  background: linear-gradient(
    to bottom,
    ${(props) => props.topColor} 45%,
    ${(props) => props.bottomColor} 45%
  );
  flex-shrink: 0;
  cursor: move;
  position: relative;
  padding: 10px;
`;

const DeleteButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const AddCardButton = styled.div`
  display: flex;
  align-items: center;
  color: white;
  cursor: pointer;
  font-size: 18px;
  margin-top: 20px;

  &:hover {
    opacity: 0.8;
  }

  span {
    margin-left: 10px;
  }
`;


const TaskInput = styled.input`
  width: 100%;
  height: 40px;
  margin-top: 50px;
  font-size: 16px;
  font-weight: 400;
  text-align: flex-start;
  color: #333;
  border-radius: 8px;
  outline: none;
  padding: 5px;
  transition: all 0.3s ease-in-out;

  &:hover {
    border-color: #aaa;
  }

  &:focus {
    border-color: #6c32fe;
    box-shadow: 0 0 5px rgba(108, 50, 254, 0.5);
    background-color: #f9f9ff;
  }

  &::placeholder {
    color: #bbb;
    font-weight: 500;
  }
`;


const Card = ({ card, moveCardToColumn, removeCard, updateCardText }) => {
  const [, drag] = useDrag({
    type: "CARD",
    item: { id: card.id, card },
  });

  const handleTextChange = (e) => {
    updateCardText(card.id, e.target.value);
  };

  return (
    <CardStyled ref={drag} topColor={card.topColor} bottomColor={card.bottomColor}>
      <DeleteButton onClick={() => removeCard(card.id)}>×</DeleteButton>
      <TaskInput
        value={card.text}
        onChange={handleTextChange}
      />
    </CardStyled>
  );
};

const ToDoCard = ({ title, cards, setCards, columnId, moveCardToColumn }) => {
  const colorPalette = ["#ff4382", "#00c8db", "#f1c40f", "#2ecc71", "#e74c3c"];

  const handleAddCard = () => {
    const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    const newCard = {
      id: Date.now(),
      topColor: randomColor,
      bottomColor: "#fff",
      text: "",
    };
    setCards((prev) => ({ ...prev, [columnId]: [...prev[columnId], newCard] }));
  };

  const removeCard = (cardId) => {
    setCards((prevCards) => ({
      ...prevCards,
      [columnId]: prevCards[columnId].filter((card) => card.id !== cardId),
    }));
  };

  const updateCardText = (cardId, newText) => {
    setCards((prevCards) => ({
      ...prevCards,
      [columnId]: prevCards[columnId].map((card) =>
        card.id === cardId ? { ...card, text: newText } : card
      ),
    }));
  };
  

  const [, drop] = useDrop({
    accept: "CARD",
    drop: (item) => moveCardToColumn(item.card, columnId),
  });

  return (
    <CardContainer ref={drop}>
      <Title>{title}</Title>
      <CardList>
        {cards[columnId]?.map((card) => (
          <Card
            key={card.id}
            card={card}
            moveCardToColumn={moveCardToColumn}
            removeCard={removeCard}
            updateCardText={updateCardText}
          />
        ))}
      </CardList>
      <AddCardButton onClick={handleAddCard}>
        <div>+</div>
        <span>Додати картку</span>
      </AddCardButton>
    </CardContainer>
  );
};

const Trello = () => {
  const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  
  const loadFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };
  
  const [cards, setCards] = useState(() => {
    const savedData = loadFromLocalStorage("trelloCards");
    return savedData || {
      column1: [],
      column2: [],
      column3: [],
    };
  });

  useEffect(() => {
    saveToLocalStorage("trelloCards", cards);
  }, [cards]);

  const moveCardToColumn = (card, targetColumnId) => {
    setCards((prevCards) => {
      const sourceColumnId = Object.keys(prevCards).find((columnId) =>
        prevCards[columnId].some((c) => c.id === card.id)
      );

      if (sourceColumnId === targetColumnId) return prevCards;

      return {
        ...prevCards,
        [sourceColumnId]: prevCards[sourceColumnId].filter((c) => c.id !== card.id),
        [targetColumnId]: [...prevCards[targetColumnId], card],
      };
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Board>
        <ToDoCard title="To Do" columnId="column1" cards={cards} setCards={setCards} moveCardToColumn={moveCardToColumn} />
        <ToDoCard title="In Progress" columnId="column2" cards={cards} setCards={setCards} moveCardToColumn={moveCardToColumn} />
        <ToDoCard title="Done" columnId="column3" cards={cards} setCards={setCards} moveCardToColumn={moveCardToColumn} />
      </Board>
    </DndProvider>
  );
};

export default Trello;

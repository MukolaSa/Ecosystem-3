// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { FaTrash } from 'react-icons/fa'; 

// const CardContainer = styled.div`
//   width: 380px;
//   min-height: 345px;

//   background-color: #6425fe;
//   padding: 20px;
//   border-radius: 10px;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   color: white;
//   font-family: Arial, sans-serif;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   overflow-y: scroll;
//   &::-webkit-scrollbar {
//     display: none;
//   }
//   scrollbar-width: none;
//   -ms-overflow-style: none;
// `;

// const Title = styled.h3`
//   margin-bottom: 10px;
//   color: #fff;
//   font-size: 20px;
// `;

// const CardList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
// `;

// const Card = styled.div`
//   width: 100%;
//   height: auto;
//   min-height: 110px;
//   border-radius: 10px;
//   background: linear-gradient(
//     to bottom,
//     ${props => props.topColor} 45%,
//     ${props => props.bottomColor} 45%
//   );
//   flex-shrink: 0;
//   padding: 10px;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   justify-content: space-between;
//   color: #333;
//   position: relative;
// `;


// const Input = styled.input`
//   width: 100%;
//   height: 40px;
//   margin-top: 50px;
//   font-size: 16px;
//   font-weight: 600;
//   text-align: center;
//   color: #333;
//   border-radius: 8px;
//   outline: none;
//   padding: 5px;
//   transition: all 0.3s ease-in-out;

//   &:hover {
//     border-color: #aaa;
//   }

//   &:focus {
//     border-color: #6c32fe;
//     box-shadow: 0 0 5px rgba(108, 50, 254, 0.5);
//     background-color: #f9f9ff;
//   }

//   &::placeholder {
//     color: #bbb;
//     font-weight: 400;
//   }
// `;

// const TaskText = styled.div`
//   width: 100%;
//   padding: 8px;
//   font-size: 16px; 
//   font-weight: 700;
//   color: #fff;
//   font-style: italic;
//   word-wrap: break-word;
//   cursor: pointer;
//   transition: color 0.2s ease-in-out, transform 0.2s ease-in-out;

//   &:hover {
//     color: #fff;
//     transform: scale(1.05);
//   }
// `;


// const DeleteButton = styled.div`
//   cursor: pointer;
//   color: #ff4d4d;
//   font-size: 18px;
//   position: absolute;
//   top: 10px;
//   right: 10px;

//   svg {
//     fill: #fff; 
//     width: 20px;
//     height: 20px;
//   }

//   &:hover {
//     color: #ff1a1a;
//   }
// `;

// const AddCardButton = styled.div`
//   display: flex;
//   align-items: center;
//   color: white;
//   cursor: pointer;
//   font-size: 18px;
//   margin-top: 20px;

//   &:hover {
//     opacity: 0.8;
//   }

//   span {
//     margin-left: 10px;
//   }
// `;

// const ToDoCard = () => {
//   const [cards, setCards] = useState([
//     {
//       id: 1,
//       topColor: '#ff4382',
//       bottomColor: '#fff',
//       task: '',
//       editing: false,
//     },
//     {
//       id: 2,
//       topColor: '#00c8db',
//       bottomColor: '#fff',
//       task: '',
//       editing: false,
//     },
//   ]);

//   const handleAddCard = () => {
//     const newId = cards.length + 1;
//     const randomColors = [
//       '#ff4382',
//       '#00c8db',
//       '#f1c40f',
//       '#2ecc71',
//       '#e74c3c',
//     ];
//     const lastCard = cards[cards.length - 1];
//     let randomTopColor;

//     do {
//       randomTopColor =
//         randomColors[Math.floor(Math.random() * randomColors.length)];
//     } while (lastCard && lastCard.topColor === randomTopColor);

//     const newCard = {
//       id: newId,
//       topColor: randomTopColor,
//       bottomColor: '#fff',
//       task: '',
//       editing: true
//     };
//     setCards([...cards, newCard]);
//   };

//   const handleTaskChange = (id, newTask) => {
//     setCards(prevCards =>
//       prevCards.map(card =>
//         card.id === id ? { ...card, task: newTask } : card
//       )
//     );
//   };

//   const handleDeleteCard = id => {
//     setCards(prevCards => prevCards.filter(card => card.id !== id));
//   };

//   const toggleEditMode = id => {
//     setCards(prevCards =>
//       prevCards.map(card =>
//         card.id === id ? { ...card, editing: !card.editing } : card
//       )
//     );
//   };

//   const handleKeyPress = (id, event) => {
//     if (event.key === 'Enter') {
//       const currentCard = cards.find(card => card.id === id);
//       if (currentCard.task.trim() !== '') {
//         toggleEditMode(id);
//       }
//     }
//   };

//   return (
//     <CardContainer>
//       <Title>To Do</Title>
//       <CardList>
//         {cards.map(card => (
//           <Card
//             key={card.id}
//             topColor={card.topColor}
//             bottomColor={card.bottomColor}
//           >
//             <DeleteButton onClick={() => handleDeleteCard(card.id)}>
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//                 <path d="M12 10.586l-4.707-4.707-1.414 1.414L10.586 12l-4.707 4.707 1.414 1.414L12 13.414l4.707 4.707 1.414-1.414L13.414 12l4.707-4.707-1.414-1.414z" />
//               </svg>
//             </DeleteButton>
//             {card.editing ? (
//             <Input
//               type="text"
//               value={card.task}
//               onChange={e => handleTaskChange(card.id, e.target.value)}
//               onKeyPress={e => handleKeyPress(card.id, e)}
//               autoFocus 
//             />
//           ) : (
//             <TaskText onClick={() => toggleEditMode(card.id)}>
//               {card.task || 'Click to edit'}
//             </TaskText>
//           )}
//           </Card>
//         ))}
//       </CardList>
//       <AddCardButton onClick={handleAddCard}>
//         <div>+</div>
//         <span>Add a card</span>
//       </AddCardButton>
//     </CardContainer>
//   );
// };

// export default ToDoCard;



import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  width: 380px;
  min-height: 345px;

  background-color: #6425fe;
  padding: 20px;
  border-radius: 10px;
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

const Card = styled.div`
  width: 100%;
  height: auto;
  min-height: 110px;
  border-radius: 10px;
  background: linear-gradient(
    to bottom,
    ${props => props.topColor} 45%,
    ${props => props.bottomColor} 45%
  );
  flex-shrink: 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  color: #333;
  position: relative;
`;


const Input = styled.input`
  width: 100%;
  height: 40px;
  margin-top: 50px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
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
    font-weight: 400;
  }
`;

const TaskText = styled.div`
  width: 100%;
  padding: 8px;
  font-size: 16px; 
  font-weight: 700;
  color: #fff;
  font-style: italic;
  word-wrap: break-word;
  cursor: pointer;
  transition: color 0.2s ease-in-out, transform 0.2s ease-in-out;

  &:hover {
    color: #fff;
    transform: scale(1.05);
  }
`;


const DeleteButton = styled.div`
  cursor: pointer;
  color: #ff4d4d;
  font-size: 18px;
  position: absolute;
  top: 10px;
  right: 10px;

  svg {
    fill: #fff; 
    width: 20px;
    height: 20px;
  }

  &:hover {
    color: #ff1a1a;
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
const ToDoCard = () => {
  const [cards, setCards] = useState(() => {
    // Зчитуємо дані з Local Storage при завантаженні
    const savedCards = localStorage.getItem('todoCards');
    return savedCards ? JSON.parse(savedCards) : [
      {
        id: 1,
        topColor: '#ff4382',
        bottomColor: '#fff',
        task: '',
        editing: false,
      },
      {
        id: 2,
        topColor: '#00c8db',
        bottomColor: '#fff',
        task: '',
        editing: false,
      },
    ];
  });

  useEffect(() => {
    // Зберігаємо дані в Local Storage при кожній зміні стану
    localStorage.setItem('todoCards', JSON.stringify(cards));
  }, [cards]);

  const handleAddCard = () => {
    const newId = cards.length + 1;
    const randomColors = [
      '#ff4382',
      '#00c8db',
      '#f1c40f',
      '#2ecc71',
      '#e74c3c',
    ];
    const lastCard = cards[cards.length - 1];
    let randomTopColor;

    do {
      randomTopColor =
        randomColors[Math.floor(Math.random() * randomColors.length)];
    } while (lastCard && lastCard.topColor === randomTopColor);

    const newCard = {
      id: newId,
      topColor: randomTopColor,
      bottomColor: '#fff',
      task: '',
      editing: true,
    };
    setCards([...cards, newCard]);
  };

  const handleTaskChange = (id, newTask) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === id ? { ...card, task: newTask } : card
      )
    );
  };

  const handleDeleteCard = id => {
    setCards(prevCards => prevCards.filter(card => card.id !== id));
  };

  const toggleEditMode = id => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === id ? { ...card, editing: !card.editing } : card
      )
    );
  };

  const handleKeyPress = (id, event) => {
    if (event.key === 'Enter') {
      const currentCard = cards.find(card => card.id === id);
      if (currentCard.task.trim() !== '') {
        toggleEditMode(id); // Завершення редагування
      }
    }
  };

  return (
    <CardContainer>
      <Title>To Do</Title>
      <CardList>
        {cards.map(card => (
          <Card
            key={card.id}
            topColor={card.topColor}
            bottomColor={card.bottomColor}
          >
            <DeleteButton onClick={() => handleDeleteCard(card.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 10.586l-4.707-4.707-1.414 1.414L10.586 12l-4.707 4.707 1.414 1.414L12 13.414l4.707 4.707 1.414-1.414L13.414 12l4.707-4.707-1.414-1.414z" />
              </svg>
            </DeleteButton>
            {card.editing ? (
              <Input
                type="text"
                value={card.task}
                onChange={e => handleTaskChange(card.id, e.target.value)}
                onKeyPress={e => handleKeyPress(card.id, e)}
                autoFocus
              />
            ) : (
              <TaskText onClick={() => toggleEditMode(card.id)}>
                {card.task || 'Click to edit'}
              </TaskText>
            )}
          </Card>
        ))}
      </CardList>
      <AddCardButton onClick={handleAddCard}>
        <div>+</div>
        <span>Додати картку</span>
      </AddCardButton>
    </CardContainer>
  );
};

export default ToDoCard;

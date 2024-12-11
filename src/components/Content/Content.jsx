import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaTrash } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: auto;
  height: 100vh;
  padding: 20px 0;
  flex-wrap: wrap;
  gap: 20px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Column = styled.div`
  width: 380px;
  height: 695px;
  box-shadow: 0 3px 34px 0 rgba(0, 0, 0, 0.15);
  background: #f6f6f6;
  border-radius: 40px;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  scroll-snap-align: start;
  overflow-y: hidden;
`;

const Header = styled.div`
  width: 380px;
  height: 56px;
  font-family: var(--font-family);
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  text-align: center;
  color: #fff;
  background: #4d09e8;
  padding: 17px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const TaskContainer = styled.div`
  border-radius: 20px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const TaskText = styled.div`
  background-color: #ffffff;
  padding: 12px 20px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  max-width: 290px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  text-align: left;
  flex-grow: 1;
  word-wrap: break-word;
  white-space: pre-wrap;
`;

const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: #e53935;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
    transform: translateY(-3px);
  }

  &:active {
    background-color: #f44336;
    transform: translateY(1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Input = styled.textarea`
  border: 2px solid #4d09e8;
  border-radius: 10px;
  padding: 10px;
  font-size: 16px;
  width: 290px;
  outline: none;
  resize: none;
  overflow: hidden;
  line-height: 1.5;
  margin: 5px 15px;
  box-sizing: border-box;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const AddTask = styled.div`
  margin: 20px auto;
  font-size: 30px;
  color: #7c3aed;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const TaskList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const DayColumn = ({ day, tasks, addTask, handleDeleteTask }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey && inputValue.trim() !== "") {
      e.preventDefault();
      addTask(day, inputValue.trim());
      setInputValue("");
      setIsAdding(false);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);

    // Динамічна висота
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <Column>
      <Header>{day.toUpperCase()}</Header>
      <TaskList>
        {tasks.map((task, index) => (
          <TaskContainer key={index}>
            <TaskText>{task}</TaskText>
            <DeleteButton onClick={() => handleDeleteTask(day, index)}>
              <FaTrash />
            </DeleteButton>
          </TaskContainer>
        ))}
        {isAdding && (
          <Input
            // placeholder="Enter your task"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
        )}
      </TaskList>
      <AddTask onClick={() => setIsAdding(true)}>+</AddTask>
    </Column>
  );
};

const Trello = () => {
  const [task, setTask] = useState({
    понеділок: [],
    вівторок: [],
    середа: [],
    четвер: [],
    пятниця: [],
    субота: [],
    неділя: [],
  });

  useEffect(() => {

    const savedTasks = localStorage.getItem("task");
    if (savedTasks) {
      setTask(JSON.parse(savedTasks));
    }
  }, []);

  const addTask = (day, taskText) => {
    const newTasks = { ...task, [day]: [...task[day], taskText] };
    setTask(newTasks);
    localStorage.setItem("task", JSON.stringify(newTasks));
  };

  const handleDeleteTask = (day, index) => {
    const newDayTasks = [...task[day]];
    newDayTasks.splice(index, 1);
    const newTasks = { ...task, [day]: newDayTasks };
    setTask(newTasks);
    localStorage.setItem("task", JSON.stringify(newTasks)); 
  };

  return (
    <Container>
      {Object.keys(task).map((day) => (
        <DayColumn
          key={day}
          day={day}
          tasks={task[day]}
          addTask={addTask}
          handleDeleteTask={handleDeleteTask}
        />
      ))}
    </Container>
  );
};

export default Trello;

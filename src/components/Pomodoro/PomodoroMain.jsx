import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTrash, FaCheckSquare, FaRegSquare } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const PomodoroContainer = styled.div`
  background-color: #6c7af4;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  width: 715px;
  height: 465px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
`;

const ModeButtons = styled.div`
  display: flex;
  gap: 20px;
`;

const ModeButton = styled.button`
  background-color: ${({ active }) => (active ? '#fff' : '#545ED6')};
  color: ${({ active }) => (active ? '#545ED6' : '#fff')};
  border: none;
  padding: 15px 30px;
  font-size: 1.2em;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
`;

const TimerDisplay = styled.h1`
  font-size: 180px;
  margin: 0;
  color: #fff;
  font-weight: bold;
  margin-top: 28px;
  margin-bottom: 28px;
`;

const StartButton = styled.button`
  background-color: #fff;
  color: #6e36f8;
  border: none;
  padding: 25px 90px;
  font-weight: bold;
  font-size: 30px;
  border-radius: 10px;
  cursor: pointer;
`;

const TaskContainer = styled.div`
  width: 715px;
  background-color: #545ed6;
  border-radius: 20px;
  margin-top: 20px;
  padding: 20px;
  /* padding-top: 40px; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h2`
  color: #fff;
  font-size: 1.5em;
  margin-bottom: 75px;
`;

const TaskList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 20px;

  /* Приховуємо смугу прокрутки */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* Для Internet Explorer і Edge */
  scrollbar-width: none; /* Для Firefox */
`;

const TaskItem = styled.li`
  background-color: #6c7af4;
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskText = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1em;
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
  outline: none;
  color: ${({ completed }) =>
    completed ? '#fff' : '#fff'}; // Білий колір для закресленого тексту
`;

const CheckboxIcon = styled.div`
  font-size: 1.5em;
  display: block;
  color: ${({ completed }) =>
    completed ? '#fff' : '#fff'}; // Білий колір для галочки
  margin-right: 10px;
  margin-top: 5px;
  cursor: pointer;
`;

const DeleteIcon = styled.div`
  color: #fff;
  font-size: 1.5em;
  cursor: pointer;
  user-select: none;
`;

const AddTaskButton = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 1.2em;
  color: #fff;
  background-color: #6c7af4;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    /* background-color: #545ED6; */
    transform: scale(1.01);
  }
`;

const TaskInput = styled.input`
  width: 100%;
  padding: 15px;
  margin-top: 10px;
  font-size: 1.2em;
  border-radius: 10px;
  outline: none;
  border: 2px solid #6c7af4;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #545ed6;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const Pomodoro = () => {
  const [time, setTime] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('pomodoro');
  const [tasks, setTasks] = useState(() => {
    // Завантажуємо збережені завдання з localStorage при ініціалізації стану
    const savedTasks = localStorage.getItem('pomodoroTasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  // Зберігаємо завдання в localStorage при кожній зміні `tasks`
  useEffect(() => {
    localStorage.setItem('pomodoroTasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    let timer = null;
    if (isActive && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      alert('Час закінчився!');
    }
    return () => clearInterval(timer);
  }, [isActive, time]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = (mode) => {
    setMode(mode);
    setIsActive(false);
    if (mode === 'pomodoro') setTime(1500);
    if (mode === 'shortBreak') setTime(300);
    if (mode === 'longBreak') setTime(900);
  };

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
  };

  const handleAddTask = () => setIsAddingTask(true);

  const handleSaveTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
      setIsAddingTask(false);
    }
  };

  const handleDeleteTask = (index) =>
    setTasks(tasks.filter((_, i) => i !== index));

  const handleToggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveTask();
    }
  };

  const startEditingTask = (index) => setEditingIndex(index);

  const stopEditingTask = (index) => {
    if (tasks[index].text.trim() === '') {
      handleDeleteTask(index);
    }
    setEditingIndex(null);
  };

  const handleTaskChange = (index, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = value;
    setTasks(updatedTasks);
  };

  return (
    <Container>
      <PomodoroContainer>
        <ModeButtons>
          <ModeButton
            active={mode === 'pomodoro'}
            onClick={() => resetTimer('pomodoro')}
          >
            Pomodoro
          </ModeButton>
          <ModeButton
            active={mode === 'shortBreak'}
            onClick={() => resetTimer('shortBreak')}
          >
            Коротка Перерва
          </ModeButton>
          <ModeButton
            active={mode === 'longBreak'}
            onClick={() => resetTimer('longBreak')}
          >
            Довга Перерва
          </ModeButton>
        </ModeButtons>
        <TimerDisplay>{formatTime()}</TimerDisplay>
        <StartButton onClick={toggleTimer}>
          {isActive ? 'Пауза' : 'Старт'}
        </StartButton>
      </PomodoroContainer>

      <TaskContainer>
        <Header>Завдання</Header>
        <TaskList>
          {tasks.map((task, index) => (
            <TaskItem key={index}>
              <CheckboxIcon
                completed={task.completed}
                onClick={() => handleToggleComplete(index)}
              >
                {task.completed ? <FaCheckSquare /> : <FaRegSquare />}
              </CheckboxIcon>
              {editingIndex === index ? (
                <TaskText
                  type="text"
                  value={task.text}
                  onChange={(e) => handleTaskChange(index, e.target.value)}
                  onBlur={() => stopEditingTask(index)}
                  completed={task.completed}
                  autoFocus
                />
              ) : (
                <TaskText
                  as="span"
                  completed={task.completed}
                  onClick={() => startEditingTask(index)}
                >
                  {task.text}
                </TaskText>
              )}
              <DeleteIcon onClick={() => handleDeleteTask(index)}>
                <FaTrash />
              </DeleteIcon>
            </TaskItem>
          ))}
        </TaskList>
        {isAddingTask ? (
          <TaskInput
            type="text"
            placeholder="Введіть завдання"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <AddTaskButton onClick={handleAddTask}>Додати завдання</AddTaskButton>
        )}
      </TaskContainer>
    </Container>
  );
};

export default Pomodoro;
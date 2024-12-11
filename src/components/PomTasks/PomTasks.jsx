import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Імпортуємо useNavigate

const ButtonWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const BackgroundShape = styled.div`
  position: absolute;
  top: -20px;
  left: -30px;
  width: 120px;
  height: 120px;
  background-color: rgba(0, 123, 255, 0.1);
  border-radius: 50%;
  z-index: 1;
`;

const Button = styled.button`
  position: relative;
  z-index: 2;
  background-color: ${({ color }) => color || '#3498db'};
  color: #fff;
  border-radius: 12px;
  padding: 15px 20px;
  width: 100%;
  font-family: 'Arial', sans-serif;
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
`;

const PomTasks = () => {
  const navigate = useNavigate(); // Ініціалізуємо navigate

  const handleNavigateToPromo = () => {
    navigate('/promo');
  };

  const handleNavigateToSales = () => {
    navigate('/sales-calc');
  };

  const handleNavigateToNotion = () => {
    navigate('/notion-templates');
  };

  const handleNavigateToTextAI = () => {
    navigate('/notion-templates');
  };

  const handleNavigateToSalesFunnel = () => {
    navigate('/sales-funnel');
  };

  return (
    <Container>
      <ButtonWrapper>
        <BackgroundShape />
        <Button color="#2d00f7" onClick={handleNavigateToSales}>КАЛЬКУЛЯТОР ЗНИЖОК</Button>
      </ButtonWrapper>
      <ButtonWrapper>
        <BackgroundShape />
        <Button color="#6a00f4" onClick={handleNavigateToPromo}>ГЕНЕРАТОР ПРОМОКОДІВ</Button>
      </ButtonWrapper>
      <ButtonWrapper>
        <BackgroundShape />
        <Button color="#8900f2" onClick={handleNavigateToNotion}>NOTION TEMPLATES</Button>
      </ButtonWrapper>
      {/* <ButtonWrapper>
        <BackgroundShape />
        <Button color="#a100f2" onClick={handleNavigateToTextAI}>AI ДЛЯ ПРОДАЮЩИХ ТЕКСТІВ</Button>
      </ButtonWrapper> */}
            <ButtonWrapper>
        <BackgroundShape />
        <Button color="#a100f2" onClick={handleNavigateToSalesFunnel}>ВОРОНКА ПРОДАЖІВ</Button>
      </ButtonWrapper>
    </Container>
  );
};

export default PomTasks;










// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { FaPlus, FaTrash, FaPause, FaPlay, FaRegClock } from "react-icons/fa";

// const Container = styled.div`
//   width: 380px;
//   min-height: 318px;
//   padding: 16px;
//   display: flex;
//   flex-direction: column;
//   overflow: auto;
//   scrollbar-width: none;
//   -ms-overflow-style: none;
//   ::-webkit-scrollbar {
//     display: none;
//   }
// `;

// const SectionTitle = styled.h4`
//   font-size: 14px;
//   font-weight: 700;
//   color: #000;
//   margin: 0 0 12px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `;

// const AddButton = styled.button`
//   background: none;
//   border: none;
//   color: #6c63ff;
//   font-size: 18px;
//   cursor: pointer;

//   &:hover {
//     color: #4b45b5;
//   }
// `;

// const TaskList = styled.div`
//   max-height: 200px;
//   overflow-y: auto;
// `;

// const TaskItem = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 8px;
//   border-radius: 8px;
//   background-color: ${(props) => (props.inProgress ? "#f3f0ff" : "#ffffff")};
//   box-shadow: ${(props) =>
//     props.inProgress ? "inset 0px 0px 0px 2px #6c63ff" : "none"};
//   margin-bottom: 8px;
// `;

// const Icon = styled(FaRegClock)`
//   margin-right: 12px;
//   font-size: 20px;
//   color: ${(props) => (props.inProgress ? "#6C63FF" : "#666666")};
// `;

// const TaskTitle = styled.span`
//   flex-grow: 1;
//   font-size: 14px;
//   font-weight: 600;
//   color: ${(props) => (props.inProgress ? "#333333" : "#666666")};
//   cursor: ${(props) => (props.editable ? "pointer" : "default")};
//   text-decoration: ${(props) => (props.editable ? "underline" : "none")};
// `;

// const TaskInput = styled.input`
//   flex-grow: 1;
//   font-size: 14px;
//   font-weight: 600;
//   color: #333333;
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   padding: 4px 8px;
//   outline: none;
// `;

// const TimeSelect = styled.select`
//   padding: 4px 8px;
//   font-size: 14px;
//   color: #333333;
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   background-color: #ffffff;
//   margin-right: 8px;
//   cursor: pointer;
// `;

// const ActionButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   padding: 0;
//   margin-left: 8px;

//   &:focus {
//     outline: none;
//   }

//   svg {
//     font-size: 18px;
//     color: #6c63ff;
//   }
// `;

// const DeleteButton = styled(ActionButton)`
//   svg {
//     font-size: 16px;
//     color: #ff6c6c;

//     &:hover {
//       color: #cc5050;
//     }
//   }
// `;

// const EmptyState = styled.div`
//   font-size: 14px;
//   color: #999;
//   text-align: center;
//   margin-top: 50px;
// `;

// const PomTasks = () => {
//   const [tasks, setTasks] = useState([]);
//   const [timers, setTimers] = useState({});
//   const [editingTaskId, setEditingTaskId] = useState(null);

//   const addTask = () => {
//     const newTask = {
//       id: Date.now(),
//       title: "New Task",
//       time: "15",
//       inProgress: false,
//       remainingTime: 15 * 60,
//     };
//     setTasks([...tasks, newTask]);
//   };

//   const deleteTask = (id) => {
//     setTasks(tasks.filter((task) => task.id !== id));
//     clearInterval(timers[id]);
//     setTimers((prev) => {
//       const newTimers = { ...prev };
//       delete newTimers[id];
//       return newTimers;
//     });
//   };

//   const toggleTaskStatus = (id) => {
//     const task = tasks.find((t) => t.id === id);

//     if (task.inProgress) {
//       // Зупиняємо таймер
//       clearInterval(timers[id]);
//       setTimers((prevTimers) => {
//         const newTimers = { ...prevTimers };
//         delete newTimers[id];
//         return newTimers;
//       });
//     } else {
//       // Запускаємо новий таймер
//       const startTime = Date.now();
//       const interval = setInterval(() => {
//         setTasks((prevTasks) =>
//           prevTasks.map((t) => {
//             if (t.id === id) {
//               const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
//               const newRemainingTime = Math.max(t.remainingTime - elapsedTime, 0);
//               return { ...t, remainingTime: newRemainingTime };
//             }
//             return t;
//           })
//         );
//       }, 1000);

//       setTimers((prevTimers) => ({ ...prevTimers, [id]: interval }));
//     }

//     setTasks((prevTasks) =>
//       prevTasks.map((task) =>
//         task.id === id ? { ...task, inProgress: !task.inProgress } : task
//       )
//     );
//   };

//   const updateTaskTitle = (id, newTitle) => {
//     setTasks((prevTasks) =>
//       prevTasks.map((task) => (task.id === id ? { ...task, title: newTitle } : task))
//     );
//   };

//   const renderTimeOptions = (id) => {
//     const task = tasks.find((task) => task.id === id);
//     if (task.inProgress) return null;

//     return (
//       <TimeSelect
//         value={task.time}
//         onChange={(e) => {
//           const newTime = e.target.value;
//           const newTimeInSeconds = parseInt(newTime) * 60;
//           setTasks((prevTasks) =>
//             prevTasks.map((task) =>
//               task.id === id
//                 ? { ...task, time: newTime, remainingTime: newTimeInSeconds }
//                 : task
//             )
//           );
//         }}
//       >
//         <option value="15">15m</option>
//         <option value="20">20m</option>
//         <option value="30">30m</option>
//       </TimeSelect>
//     );
//   };

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
//   };

//   return (
//     <Container>
//       <div>
//         <SectionTitle>In Progress</SectionTitle>
//         <TaskList>
//           {tasks.filter((task) => task.inProgress).length === 0 && (
//             <EmptyState>No tasks in progress</EmptyState>
//           )}
//           {tasks
//             .filter((task) => task.inProgress)
//             .map((task) => (
//               <TaskItem key={task.id} inProgress={task.inProgress}>
//                 <Icon inProgress={task.inProgress} />
//                 <TaskTitle>{task.title}</TaskTitle>
//                 <span>{formatTime(task.remainingTime)}</span>
//                 <ActionButton onClick={() => toggleTaskStatus(task.id)}>
//                   <FaPause />
//                 </ActionButton>
//                 <DeleteButton onClick={() => deleteTask(task.id)}>
//                   <FaTrash />
//                 </DeleteButton>
//               </TaskItem>
//             ))}
//         </TaskList>
//       </div>
//       <div>
//         <SectionTitle>
//           To Do
//           <AddButton onClick={addTask}>
//             <FaPlus />
//           </AddButton>
//         </SectionTitle>
//         <TaskList>
//           {tasks.filter((task) => !task.inProgress).length === 0 && (
//             <EmptyState>No tasks available</EmptyState>
//           )}
//           {tasks
//             .filter((task) => !task.inProgress)
//             .map((task) => (
//               <TaskItem key={task.id}>
//                 <Icon />
//                 {editingTaskId === task.id ? (
//                   <TaskInput
//                     type="text"
//                     defaultValue={task.title}
//                     onBlur={(e) => {
//                       updateTaskTitle(task.id, e.target.value);
//                       setEditingTaskId(null);
//                     }}
//                     autoFocus
//                   />
//                 ) : (
//                   <TaskTitle
//                     editable
//                     onClick={() => setEditingTaskId(task.id)}
//                   >
//                     {task.title}
//                   </TaskTitle>
//                 )}
//                 {renderTimeOptions(task.id)}
//                 <ActionButton onClick={() => toggleTaskStatus(task.id)}>
//                   <FaPlay />
//                 </ActionButton>
//                 <DeleteButton onClick={() => deleteTask(task.id)}>
//                   <FaTrash />
//                 </DeleteButton>
//               </TaskItem>
//             ))}
//         </TaskList>
//       </div>
//     </Container>
//   );
// };

// export default PomTasks;



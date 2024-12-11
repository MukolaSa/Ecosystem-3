import React, { useState, useEffect } from 'react';
import './TaskList.css';
import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa';

const List = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`;

const DeleteIcon = styled.div`
  color: #ff0000;
  font-size: 1rem;
  cursor: pointer;
  user-select: none;
  margin-top: 5px;
`;

const TaskList = () => {
  const [errands, setErrands] = useState([]); 
  const [newErrandText, setNewErrandText] = useState('');
  const [isAddingErrand, setIsAddingErrand] = useState(false); 
  const [editingErrandId, setEditingErrandId] = useState(null); 
  const [editingErrandText, setEditingErrandText] = useState(''); 

  // Завантажуємо завдання з localStorage при завантаженні компонента
  useEffect(() => {
    const storedErrands = localStorage.getItem('errands');
    if (storedErrands) {
      setErrands(JSON.parse(storedErrands));
    }
  }, []);

  // Оновлюємо tasks у localStorage кожного разу, коли вони змінюються
  useEffect(() => {
    if (errands.length > 0) {
      localStorage.setItem('errands', JSON.stringify(errands)); // виправили ключ на 'errands'
    }
  }, [errands]);

  const handleDeleteTask = Id => {
    const updatedErrands = errands.filter(errand => errand.id !== Id);
    setErrands(updatedErrands);
  };

  const toggleTaskCompletion = errandId => {
    const updatedErrands = errands.map(errand =>
      errand.id === errandId ? { ...errand, completed: !errand.completed } : errand
    );
    setErrands(updatedErrands);
  };

  const addErrand = () => {
    if (newErrandText.trim() === '') return;

    const newErrand = {
      id: Date.now(),
      text: newErrandText,
      completed: false,
    };
    setErrands([...errands, newErrand]);
    setNewErrandText('');
    setIsAddingErrand(false);
  };

  const startEditing = (errandId, errandText) => {
    setEditingErrandId(errandId);
    setEditingErrandText(errandText);
  };

  const saveEditedTask = errandId => {
    const updatedTasks = errands.map(errand =>
      errand.id === errandId ? { ...errand, text: editingErrandText } : errand
    );
    setErrands(updatedTasks);
    setEditingErrandId(null);
    setEditingErrandText('');
  };

  const cancelEditing = () => {
    setEditingErrandId(null);
    setEditingErrandText('');
  };

  return (
    <div className="task-list">
      <div className="task-header">
        <h3>
          Mої завдання <span>({errands.length})</span>
        </h3>
      </div>

      <ul className="ul">
        {errands.length === 0 ? (
          <p>У вас ще немає завдань</p>
        ) : (
          errands.map(errand => (
            <List key={errand.id} className={errand.completed ? 'completed' : ''}>
              <span className="task-number">{errands.indexOf(errand) + 1}</span>

              {editingErrandId === errand.id ? (
                <input
                  type="text"
                  value={editingErrandText}
                  onChange={e => setEditingErrandText(e.target.value)}
                  className="edit-task-input"
                />
              ) : (
                <span
                  className="task-text"
                  onClick={() => startEditing(errand.id, errand.text)}
                >
                  {errand.text}
                </span>
              )}

              {editingErrandId === errand.id ? (
                <>
                  <button
                    className="save-task_1"
                    onClick={() => saveEditedTask(errand.id)}
                  >
                    Save
                  </button>
                  <button className="cancel-task" onClick={cancelEditing}>
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className={`task-status ${errand.completed ? 'completed' : ''}`}
                  onClick={() => toggleTaskCompletion(errand.id)}
                >
                  {errand.completed ? '✔' : '✖'}
                </button>
              )}
              <DeleteIcon onClick={() => handleDeleteTask(errand.id)}>
                <FaTrash />
              </DeleteIcon>
            </List>
          ))
        )}
      </ul>

      {isAddingErrand && (
        <div className="add-task-container">
          <input
            type="text"
            value={newErrandText}
            onChange={e => setNewErrandText(e.target.value)}
            placeholder="Введіть нове завдання..."
          />
          <button className="save-task" onClick={addErrand}>
            Save
          </button>
        </div>
      )}

      <div className="add-task-wrapper">
        {!isAddingErrand && (
          <button className="add-task" onClick={() => setIsAddingErrand(true)}>
            +
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskList;

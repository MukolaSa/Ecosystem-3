import React, { useState, useEffect } from 'react';
import './Pomodoro.css';
import { AiFillPauseCircle, AiFillPlayCircle, AiOutlineReload } from 'react-icons/ai'; // імпортуємо іконки

const PomodoroTimer = () => {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  const startPauseTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTime(25 * 60);
    setIsRunning(false);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const percentage = (time / (25 * 60)) * 100;

  return (
    <div className="pomodoro-container">
      <h1>POMODORO</h1>
      <div className="timer-wrapper">
        <div className="circle-background">
          <svg className="progress-ring" width="200" height="200">
            <circle
              className="progress-ring__circle"
              stroke="#6C63FF"
              strokeWidth="6"
              fill="transparent"
              r="90"
              cx="100"
              cy="100"
              style={{ strokeDasharray: 2 * Math.PI * 90, strokeDashoffset: 2 * Math.PI * 90 * (1 - percentage / 100) }}
            />
          </svg>
          <div className="timer-text">{formatTime(time)}</div>
        </div>
      </div>
      <div className="controls">
        <button onClick={startPauseTimer}>
          {isRunning ? (
            <>
              <AiFillPauseCircle size={24} /> 
            </>
          ) : (
            <>
              <AiFillPlayCircle size={24} /> 
            </>
          )}
        </button>
        <button onClick={resetTimer}>
          <AiOutlineReload size={24} /> 
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
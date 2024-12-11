import React from 'react';
import './Dashboard.css';
import Pomodoro from 'components/Pomodoro/Pomodoro';
import TaskList from 'components/Tasks/Tasks';
import ToDoCard from 'components/ToDoCard/ToDoCard';
import { useNavigate } from 'react-router-dom';
import MiniCalendar from 'components/MiniCalendar/MiniCalendar';
import PomTasks from 'components/PomTasks/PomTasks';

import ProfitCalculator from 'components/OneApp/ProfitCalculator ';
import OrderBoard from 'components/OneApp/OrderBoard';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigateToFinance = () => {
    navigate('/finance');
  };

  const handleNavigateToRomi = () => {
    navigate('/romi');
  };

  const handleNavigateToCalc = () => {
    navigate('/calc');
  };

  const handleNavigateToSalesCalc = () => {
    navigate('/sale-calc');
  };

  const handleNavigateToHeading = () => {
    navigate('/heading');
  };
  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <button className="table" onClick={handleNavigateToFinance}>
          РОЗРАХУНОК UNIT ЕКОНОМІКИ БІЗНЕСУ
        </button>
        <button className="table" onClick={handleNavigateToCalc}>
          ОЦИФРОВКА БІЗНЕСУ
        </button>
        <button className="table" onClick={handleNavigateToRomi}>
          КАЛЬКУЛЯТОР ПЛАНУ ПРОДАЖІВ
        </button>
        <button className="table" onClick={handleNavigateToSalesCalc}>Конверсія у продажі</button>
        <button className="table" onClick={handleNavigateToHeading}>БІБЛІОТЕКА ІЗ ЗАГОЛОВКАМИ</button>
      </div>
      <div className="dashboard-card">
        <TaskList />
      </div>
      <div className="dashboard-card">
        <MiniCalendar/>
      </div>
      <div className="dashboard-card">
        <Pomodoro />
      </div>
      <div className="dashboard-card">
        <PomTasks/>
      </div>
      <div className="dashboard-card">
        <ToDoCard />
      </div>
    </div>
  );
};

export default Dashboard;

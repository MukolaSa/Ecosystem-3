import React from 'react';
import './Sidebar.css'; 
import MenuIcon from '../../assets/menu.svg'
import ProjectIcon from '../../assets/icon_1.png'
import TasksIcon from '../../assets/icon_2.png'
import Calendar from '../../assets/Calendar.svg'
import Time from '../../assets/time.png'
import TimeManage from '../../assets/timeManage.png'
import Settings from '../../assets/settings.png'
import Vector from '../../assets/Vector.svg'
import { Link } from 'react-router-dom';
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo"><img className='vector' src={Vector} alt="" /></div>
      <ul className="menu">
        <Link className="menu-item active" to="/dashboard"><span role="img" aria-label="dashboard"><img src={MenuIcon} alt="" /></span> Меню</Link>
        <Link className="menu-item active" to="/pomodoro" ><span role="img" aria-label="projects"><img src={ProjectIcon} alt="" /></span>Помодоро</Link>
        <Link className="menu-item active" to="/content-plan"><span role="img" aria-label="tasks"><img src={TasksIcon} alt="" /></span>Контент план</Link>
        <Link className="menu-item active" to="/calendar"><span role="img" aria-label="calendar"><img src={Calendar} alt="" /></span> Календар</Link>
        <Link className="menu-item active" to="/trello"><span role="img" aria-label="time-manage"><img src={Time} alt="" /></span>Трело</Link>
        <Link className="menu-item active" to="/order-board"><span role="img" aria-label="time-manage"><img src={TimeManage} alt="" /></span> Таблиця замовлень</Link>
        <Link className="menu-item active" to="/profit-calc"><span role="img" aria-label="settings"><img src={Settings} alt="" /></span>Profit calc</Link>
      </ul>
    </div>
  );
}

export default Sidebar;
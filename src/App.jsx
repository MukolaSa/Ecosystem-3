import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
// import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import FinancePage from 'components/Tables/Unit/FinancePage';
import Romi from 'components/Tables/Romi/RomiApp';
import Finances from 'components/Tables/Finances/FinancesApp';
import Pomodoro from 'components/Pomodoro/PomodoroMain';
import Content from './components/Content/Content';
import Trello from 'components/Trello/Trello';
// import ChatUI from 'components/AI/AI';
import Decomposition from 'components/Decomposition/Decomposition';
import Calendar from './components/Calendar/Calendar';
import Heading from 'components/Heading/Heading';

import PostGenerator from './components/PostGenerator/PostGenerator'
import SaleCalendar from 'components/Other/SaleCalendar';
import DiscountCalculator from 'components/Other/SaleCalc';
import DiscountTips from 'components/Other/SalesAdvice';
import DataImportExport from 'components/Other/SalesAdvice';
import PromoCodeGenerator from 'components/Other/SalesAdvice';
import SalesFunnel from 'components/SalesFunnel/SalesFunnel';
import Notion from 'components/NotionPage/NotionPage'

import AuthPage from 'components/Auth/Register';
import { LoginPage } from 'components/Auth/Login';

import Calc from 'components/Other/Calc'
import ProfitCalculator from 'components/OneApp/ProfitCalculator ';
import OrderBoard from 'components/OneApp/OrderBoard';

const App = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        {/* <Header /> */}
        <Routes>
        {/* <Route path="/register" element={<AuthPage />} /> */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
          <Route path="/Ecosystem" element={<Dashboard />} />
          <Route path="/finance" element={<FinancePage />} />
          <Route path="/romi" element={<Romi />} />
          <Route path="/calc" element={<Finances />} />
          <Route path="/pomodoro" element={<Pomodoro />} />
          {/* <Route path="/ai" element={<ChatUI/>} /> */}
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/trello" element={<Trello />} />
          <Route path="/content-plan" element={<Content />} />
          <Route path="/calendar" element={<Calendar/>} />
          {/* <Route path="/decomposition" element={<Decomposition />} /> */}
          <Route path="/heading" element={<Heading/>} />

          {/* Other */}
          <Route path="/sales-calc" element={<SaleCalendar/>} />
          <Route path="/promo" element={<PromoCodeGenerator/>} />
          <Route path="/post-generator" element={<PostGenerator/>} />
          <Route path="/notion-templates" element={<Notion/>} />

          <Route path="/sales-funnel" element={<SalesFunnel/>} />
          <Route path="/sale-calc" element={<Calc/>} />
          <Route path="/profit-calc" element={<ProfitCalculator/>} />
          <Route path="/order-board" element={<OrderBoard/>} />

        </Routes>
      </div>
    </div>
  );
};

export default App;

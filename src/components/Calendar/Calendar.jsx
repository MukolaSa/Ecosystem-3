import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Основний контейнер календаря
const CalendarContainer = styled.div`
  display: flex;
  height: 90vh;
  width: 90%;
  margin: auto;
  background-color: #eef2f9;
  font-family: 'Arial', sans-serif;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
`;

// Контейнер для календаря
const CalendarView = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #ffffff;
  border-right: 1px solid #d3d9f1;
  border-radius: 10px 0 0 10px;
`;

// Секція для подій
const EventsView = styled.div`
  flex: 1.5;
  background-color: #6425fe;
  color: white;
  padding: 20px;
  border-radius: 0 10px 10px 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #6425fe;
  color: white;
  border-radius: 8px;
  font-size: 1.2em;
`;

const Button = styled.button`
  background-color: #6425fe;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #364fc7;
  }
`;

const MonthYear = styled.div`
  font-size: 1.5em;
  font-weight: bold;
`;

const MonthView = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
`;

const WeekDay = styled.div`
  font-weight: bold;
  text-align: center;
  padding: 10px 0;
  background-color: #e3e7ff;
  border-radius: 5px;
  color: #364fc7;
`;

const Day = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  height: 80px;
  background-color: ${({ isToday, isSelected }) =>
    isToday ? '#dbeafe' : isSelected ? '#4263eb' : '#f8f9fa'};
  color: ${({ isSelected }) => (isSelected ? '#ffffff' : '#364fc7')};
  border: 1px solid ${({ hasEvent }) => (hasEvent ? '#ff922b' : '#d3d9f1')};
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #dbe4ff;
  }
`;

const EventList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const EventItem = styled.div`
  background-color: #ffffff;
  color: #364fc7;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  border-left: 5px solid #4263eb;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
    border-left: 5px solid #ff922b;
  }
`;

const EventText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  & > strong {
    font-size: 1.1em;
    color: #364fc7;
  }

  & > p {
    margin: 0;
    font-size: 0.95em;
    color: #495057;
    text-align: left;
  }
`;

const DeleteButton = styled.button`
  background-color: #ff6b6b;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 5px 15px;
  cursor: pointer;
  font-size: 0.9em;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ff4b4b;
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.95);
  }
`;

// Модальне вікно
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const EventModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #6425fe;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #364fc7;
  }
`;

// Масив назв місяців у називному відмінку
const monthNames = [
  'січеня',
  'лютого',
  'березня',
  'квітня',
  'травня',
  'червня',
  'липня',
  'серпня',
  'вересня',
  'жовтня',
  'листопада',
  'грудня',
];

// Функція для форматування дати у називному відмінку
const getFormattedDate = dateString => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

// Компонент календаря
const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const today = new Date();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  useEffect(() => {
    const storedEvents = localStorage.getItem('calendarEvents');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);
  
  
  

  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem('calendarEvents', JSON.stringify(events));
    }
  }, [events]);
  
  
  
  

  const handleDayClick = day => {
    setSelectedDate(new Date(currentYear, currentMonth, day));
    setShowModal(true);
  };

  const handleEventSubmit = () => {
    if (newEvent.trim() && selectedDate) {
      const newEventObject = {
        date: selectedDate.toISOString(),
        title: newEvent,
        time: startTime && endTime ? `${startTime} - ${endTime}` : '',
      };
  
      // Оновлюємо стан подій
      setEvents(prevEvents => {
        const updatedEvents = [...prevEvents, newEventObject];
        // Зберігаємо оновлені події в localStorage
        localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
        return updatedEvents;
      });
  
      // Очищення полів після додавання події
      setNewEvent('');
      setStartTime('');
      setEndTime('');
      setShowModal(false);
    }
  };
  
  

  const handleDeleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };
  
  

  const renderDays = () => {
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday =
        today.getDate() === i &&
        today.getMonth() === currentMonth &&
        today.getFullYear() === currentYear;
      const hasEvent = events.some(
        event =>
          new Date(event.date).toDateString() ===
          new Date(currentYear, currentMonth, i).toDateString()
      );
      days.push(
        <Day
          key={i}
          isToday={isToday}
          isSelected={selectedDate?.getDate() === i}
          hasEvent={hasEvent}
          onClick={() => handleDayClick(i)}
        >
          {i}
        </Day>
      );
    }
    return days;
  };

  return (
    <CalendarContainer>
      <CalendarView>
        <Header>
          <Button
            onClick={() =>
              setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
            }
          >
            ←
          </Button>
          <MonthYear>
            {new Intl.DateTimeFormat('uk-UA', {
              month: 'long',
              year: 'numeric',
            }).format(currentDate)}
          </MonthYear>

          <Button
            onClick={() =>
              setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
            }
          >
            →
          </Button>
        </Header>

        <MonthView>
          {['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'].map(day => (
            <WeekDay key={day}>{day}</WeekDay>
          ))}
          {renderDays()}
        </MonthView>
      </CalendarView>

      <EventsView>
        <h3>Події</h3>
        <EventList>
          {events.map((event, index) => (
            <EventItem key={index}>
              <EventText>
                <strong>{getFormattedDate(event.date)}</strong>
                <p>{event.title}</p>
                <p>{event.time}</p>
              </EventText>
              <DeleteButton onClick={() => handleDeleteEvent(index)}>
                Видалити
              </DeleteButton>
            </EventItem>
          ))}
        </EventList>
      </EventsView>

      {showModal && (
        <>
          <ModalOverlay onClick={() => setShowModal(false)} />
          <EventModal>
            <h3>Додати подію</h3>
            <Input
              type="text"
              placeholder="Назва події"
              value={newEvent}
              onChange={e => setNewEvent(e.target.value)}
            />
            <Input
              type="time"
              placeholder="Час початку"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
            />
            <Input
              type="time"
              placeholder="Час завершення"
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
            />
            <SubmitButton onClick={handleEventSubmit}>Додати</SubmitButton>
          </EventModal>
        </>
      )}
    </CalendarContainer>
  );
};

export default Calendar;

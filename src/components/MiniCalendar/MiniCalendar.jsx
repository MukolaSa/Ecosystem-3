import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
} from "date-fns";

const MiniCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const containerStyle = {
    width: "350px",
    height: "320px",
    display: "flex",
    flexDirection: "column",
    borderRadius: "16px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
    position: "relative",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
  };

  const buttonStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    background: "none",
    color: "#6425fe ",
    cursor: "pointer",
  };

  const calendarContentStyle = {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto", // Enable scrolling when content overflows
    scrollbarWidth: "none", // Hide scrollbar for Firefox
    msOverflowStyle: "none", // Hide scrollbar for IE and Edge
  };

  // Hides scrollbar for Webkit browsers (Chrome, Safari, etc.)
  const calendarScrollStyle = {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  };

  const rowStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "8px",
    marginTop: "10px",
  };

  const cellStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "40px",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: "bold",
    color: "#65676D", // Updated color for the dates
    backgroundColor: "transparent",
  };

  const selectedStyle = {
    ...cellStyle,
    backgroundColor: "#6425fe",
    color: "#fff",
  };

  const disabledStyle = {
    ...cellStyle,
    color: "#ccc",
    cursor: "not-allowed",
  };

  const textMutedStyle = {
    color: "#bbb",
  };

  const renderHeader = () => {
    const buttonStyle = {
      fontSize: "16px",
      border: "none",
      backgroundColor: "#6425fe", // Background color for the buttons
      color: "#fff",
      cursor: "pointer",
      width: "20px", // Width of the button
      height: "20px", // Height of the button
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%", // Fully rounded buttons
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      transition: "transform 0.2s ease, background-color 0.2s ease",
    };

    return (
      <div style={headerStyle}>
        <button
          onClick={prevMonth}
          style={buttonStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#574bcb")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#6c63ff")
          }
        >
          &lt;
        </button>
        <span>{format(currentMonth, "MMMM yyyy")}</span>
        <button
          onClick={nextMonth}
          style={buttonStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#574bcb")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#6c63ff")
          }
        >
          &gt;
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const date = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "14px",
            color: "#000",
          }}
          key={i}
        >
          {date[i]}
        </div>
      );
    }

    return <div style={rowStyle}>{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const isDisabled = !isSameMonth(day, monthStart);
        const isSelected = isSameDay(day, selectedDate);

        days.push(
          <div
            key={day}
            style={isDisabled ? disabledStyle : isSelected ? selectedStyle : cellStyle}
            onClick={() => !isDisabled && onDateClick(day)} // Ensure clicking sets the selected date
          >
            <span style={isDisabled ? textMutedStyle : {}}>{format(day, "d")}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div style={rowStyle} key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div>{rows}</div>;
  };

  const onDateClick = (day) => {
    setSelectedDate(day); // Update the selected date
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <div style={containerStyle}>
      {renderHeader()}
      <div style={{ ...calendarContentStyle, ...calendarScrollStyle }}>
        {renderDays()}
        {renderCells()}
      </div>
    </div>
  );
};

export default MiniCalendar;

import React, { useState, useEffect } from "react";

const SalesFunnel = () => {
  const [levels, setLevels] = useState([]);

  // Завантаження рівнів з localStorage при завантаженні сторінки
  useEffect(() => {
    // Завантажуємо з localStorage
    const storedLevels = localStorage.getItem("funnelLevels");
    if (storedLevels) {
      setLevels(JSON.parse(storedLevels));
    }
  }, []);

  // Оновлення localStorage при зміні масиву levels
  useEffect(() => {
    if (levels.length > 0) {
      // Зберігаємо в localStorage, якщо рівні не порожні
      localStorage.setItem("funnelLevels", JSON.stringify(levels));
    }
  }, [levels]);

  // Додати новий рівень
  const addLevel = () => {
    const newLevel = { label: "", value: 0 };
    const updatedLevels = [...levels, newLevel];
    setLevels(updatedLevels);
  };

  // Оновлення даних рівня
  const updateLevel = (index, field, newValue) => {
    const updatedLevels = [...levels];
    updatedLevels[index][field] = field === "value" ? Number(newValue) : newValue;
    setLevels(updatedLevels);
  };

  // Видалення рівня
  const deleteLevel = (index) => {
    const updatedLevels = levels.filter((_, i) => i !== index);
    setLevels(updatedLevels);
  };

  // Стилі для компоненту
  const styles = {
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      padding: "20px",
      backgroundColor: "#f9fafc",
      minHeight: "100vh",
      fontFamily: "'Roboto', sans-serif",
    },
    inputsContainer: {
      width: "40%",
      maxWidth: "420px",
      marginRight: "60px",
      padding: "20px",
      backgroundColor: "#ffffff",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      alignItems: "center",
    },
    levelInput: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "10px",
      gap: "10px",
    },
    input: {
      flex: 1,
      padding: "10px",
      border: "1px solid #d1d5db",
      borderRadius: "5px",
      fontSize: "14px",
      outline: "none",
    },
    button: {
      marginTop: "10px",
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
      transition: "background-color 0.3s ease",
    },
    funnelVisualization: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "15px",
      width: "50%",
    },
    funnelLevel: (width, index, isSelected) => ({
      backgroundColor: `hsl(${240 - index * 30}, 70%, 50%)`,
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "65px",
      width: `${width}px`,
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      fontSize: "16px",
      fontWeight: "bold",
      transition: "transform 0.3s ease",
      border: isSelected ? "3px solid white" : "none", // біла рамка для вибраного рівня
      position: "relative",
    }),
    funnelLevelHover: {
      transform: "scale(1.05)",
    },
    deleteButton: {
      position: "absolute",
      top: "5px",
      right: "5px",
      backgroundColor: "transparent",
      color: "white", // білий колір для хрестика
      border: "none",
      borderRadius: "50%",
      width: "20px",
      height: "20px",
      cursor: "pointer",
      fontSize: "14px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.funnelVisualization}>
        {levels.map((level, index) => (
          <div
            key={index}
            style={styles.funnelLevel(480 - index * 40, index, false)}
          >
            {`${level.label} ${level.value}`}
            <button
              style={styles.deleteButton}
              onClick={(e) => {
                e.stopPropagation(); // Не даємо клікнути на сам рівень
                deleteLevel(index);
              }}
            >
              ✖
            </button>
          </div>
        ))}
      </div>
      <div style={styles.inputsContainer}>
        {levels.map((level, index) => (
          <div key={index} style={styles.levelInput}>
            <input
              type="text"
              placeholder="Показник"
              value={level.label}
              onChange={(e) => updateLevel(index, "label", e.target.value)}
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Число"
              value={level.value}
              onChange={(e) => updateLevel(index, "value", e.target.value)}
              style={styles.input}
            />
          </div>
        ))}
        <button
          style={styles.button}
          onClick={addLevel}
        >
          Додати
        </button>
      </div>
    </div>
  );
};

export default SalesFunnel;

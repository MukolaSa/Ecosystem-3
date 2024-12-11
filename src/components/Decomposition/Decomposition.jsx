import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const data = [
  'ПРОДАЖІ',
  'ЛІДИ',
  'МАРЖА ВСЬОГО',
  'ЦІНА КЛІЄНТА',
  'ЛІДИ',
  'ПРИБУТОК',
  'ОКУПНІСТЬ',
  'РЕКЛАМНИЙ БЮДЖЕТ',
  'ТОВАРООБІГ',
  'МАРЖА',
  'СЕРЕДНІЙ ЧЕК',
  'ВАРТІСТЬ ЗАЯВКИ',
  'КОНВЕРСІЯ У ПРОДАЖ %',
];

const tileWidths = [
  '120px',
  '120px',
  '120px',
  '120px',
  '120px',
  '120px',
  '120px',
  '170px',
  '140px',
  '120px',
  '130px',
  '140px',
  '150px',
];

const chartDataTemplate = [
  { name: 'Листопад', value: 0 }, // Для листопада початкове значення 0
];

const circlechartDataTemplate = [
  { name: 'A', value: 8 },
  { name: 'B', value: 8 },
  { name: 'C', value: 8 },
  { name: 'D', value: 8 },
  { name: 'E', value: 8 },
  { name: 'F', value: 8 },
  { name: 'G', value: 8 },
  { name: 'H', value: 8 },
  { name: 'I', value: 8 },
  { name: 'J', value: 8 },
  { name: 'K', value: 8 },
  { name: 'L', value: 8 },
];

const circlechartData = [
  { name: 'A', value: 8 },
  { name: 'B', value: 8 },
  { name: 'C', value: 8 },
  { name: 'D', value: 8 },
  { name: 'E', value: 8 },
  { name: 'F', value: 8 },
  { name: 'G', value: 8 },
  { name: 'H', value: 8 },
  { name: 'I', value: 8 },
  { name: 'J', value: 8 },
  { name: 'K', value: 8 },
  { name: 'L', value: 8 },
];

const Container = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  justify-content: center;
`;

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 75%;
  gap: 10px;
`;

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: ${props => props.width};
  height: 112px;
  cursor: pointer;
`;

const TileHeader = styled.div`
  background-color: #6c32fe;
  color: #ffffff;
  height: 43px;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 6px 0;
  border-radius: 10px 10px 0 0;
`;

const TileInput = styled.input`
  width: 90%;
  height: 40px;
  margin-top: 10px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: #333;
  border-radius: 8px;
  outline: none;
  padding: 5px;
  transition: all 0.3s ease-in-out;

  &:hover {
    border-color: #aaa;
  }

  &:focus {
    border-color: #6c32fe;
    box-shadow: 0 0 5px rgba(108, 50, 254, 0.5);
    background-color: #f9f9ff;
  }

  &::placeholder {
    color: #bbb;
    font-weight: 400;
  }
`;

const Summary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 300px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`;

const SummaryTitle = styled.div`
  width: 100%;
  height: 45px;
  background-color: #6c32fe;
  color: #fff;
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border-bottom: 2px solid #fff;
`;

const SummaryItem = styled.div`
  width: 100%;
  height: 47px;
  background-color: #f5f6fb;
  color: #52555f;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  border-top: 2px solid #fff;
  border-bottom: 2px solid #fff;
`;

const ChartsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  width: 100%;
  margin-top: 100px;
  align-items: center;
`;

const ChartWrapper = styled.div`
  background-color: #ffffff;
  border-radius: 20px; /* Updated border-radius */
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  flex: 1;
  max-width: 550px;
  overflow: hidden; /* Ensures content doesn't overflow the border-radius */
`;

const Select = styled.select`
  margin-bottom: 20px;
  padding: 5px;
  font-size: 14px;
`;

const Decomposition = () => {
  const [summaryValues, setSummaryValues] = useState({});
  const [values, setValues] = useState(Array(data.length).fill(''));
  const [selectedIndicator, setSelectedIndicator] = useState('ПРОДАЖІ');
  const [chartData, setChartData] = useState(chartDataTemplate);
  const [circleChartData, setCircleChartData] = useState(circlechartData);

  // Отримуємо поточний місяць
  const currentMonth = new Date()
    .toLocaleString('uk-UA', { month: 'long' })
    .replace(/^./, str => str.toUpperCase());

  // Стан для збереження показників за листопад
  const [novemberValues, setNovemberValues] = useState({});

  // Логіка для обнулення плиток і фіксації значень листопада
  useEffect(() => {
    const currentDate = new Date();
    const currentMonthNumber = currentDate.getMonth(); // 11 для листопада, 0 для січня

    // Якщо настає грудень, фіксуємо значення листопада і очищаємо плитки
    if (currentMonthNumber === 11 && Object.keys(novemberValues).length === 0) {
      setNovemberValues({ ...summaryValues }); // Зберігаємо показники листопада
      setValues(Array(data.length).fill('')); // Очищаємо плитки
    }
  }, [summaryValues, novemberValues]);

  const handleChange = (index, event) => {
    const newValues = [...values];
    newValues[index] = event.target.value;
    setValues(newValues);

    const updatedValue = parseFloat(event.target.value) || 0;

    // Оновлення даних для бар-чарту
    if (data[index] === selectedIndicator) {
      setChartData([{ name: currentMonth, value: updatedValue }]);

      // Оновлення даних для кругової діаграми
      const updatedCircleChartData = circlechartData.map((item, idx) => ({
        ...item,
        value: idx === 0 ? updatedValue : 0, // Лише перший сегмент отримає значення
      }));
      setCircleChartData(updatedCircleChartData);

      // Оновлення значень у Summary
      setSummaryValues(prev => ({
        ...prev,
        [data[index]]: updatedValue,
      }));
    }
  };

  const handleTileClick = (indicator, index) => {
    setSelectedIndicator(indicator);

    const updatedValue = parseFloat(values[index]) || 0;

    // Оновлення даних для бар-чарту
    setChartData([{ name: currentMonth, value: updatedValue }]);

    // Оновлення даних для кругової діаграми
    const updatedCircleChartData = circlechartData.map((item, idx) => ({
      ...item,
      value: idx === 0 ? updatedValue : 0,
    }));
    setCircleChartData(updatedCircleChartData);

    // Оновлення значень у Summary
    setSummaryValues(prev => ({
      ...prev,
      [indicator]: updatedValue,
    }));
  };

  const colors = [
    '#F72585',
    '#4D09E8',
    '#D500F9',
    '#FF4081',
    '#6200EE',
    '#3F51B5',
    '#00E5FF',
    '#00C853',
    '#FFEB3B',
    '#FF9800',
    '#FF5722',
    '#9C27B0',
  ];

  return (
    <>
      <Container>
        <GridContainer>
          {data.map((item, index) => (
            <Tile
              key={index}
              width={tileWidths[index]}
              onClick={() => handleTileClick(item, index)}
            >
              <TileHeader>{item}</TileHeader>
              <TileInput
                type="text"
                value={values[index]}
                onChange={e => handleChange(index, e)}
              />
            </Tile>
          ))}
        </GridContainer>

        <Summary>
          <SummaryTitle>{selectedIndicator}</SummaryTitle>
          <SummaryItem>
            <span>{currentMonth === 'Грудень' ? 'Листопад' : currentMonth}</span>
            <span>
              {currentMonth === 'Грудень'
                ? novemberValues[selectedIndicator] || '0'
                : summaryValues[selectedIndicator] || '0'}
            </span>
          </SummaryItem>
        </Summary>
      </Container>

      <ChartsContainer>
        <ChartWrapper>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis domain={[0, 'dataMax']} />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="url(#colorGradient)"
                radius={[8, 8, 0, 0]}
                barSize={33}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index % 2 === 0 ? '#4D09E8' : '#F72585'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>

        <ChartWrapper>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={circleChartData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
              >
                {circleChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </ChartsContainer>
    </>
  );
};

export default Decomposition;
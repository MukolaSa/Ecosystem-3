import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';

const Wrapper = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    /* flex-direction: column; */
    /* padding-bottom: 80px; */
  }
`;

const SpendingsContainer = styled.div`
  @media (min-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    gap: 90px;
    border-radius: 20px;
  }

  @media (min-width: 1200px) {
    flex-direction: row;
    gap: 30px;
    border-radius: 20px;
  }
`;

const Table = styled.table`
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  border-radius: 20px;
  overflow: hidden;
`;

const TableHead = styled.th`
  background-color: #6425FE;
  color: white;
  padding: 10px;
  text-align: center;
  border: 4px solid #6425FE;
  font-size: 17px;
  font-family: Roboto, sans-serif;
  font-weight: bold;
  height: 28px;

  &:not(:first-child) {
    width: 255px;
  }

  &:nth-child(3) {
    width: 220px;
  }

  &:first-child {
    width: 105px;
  }

  &:last-child {
    width: 110px;
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const TableData = styled.td`
  padding: 10.7px;
  text-align: left;
  border: 3.3px solid #f5f6fb;
  font-size: 14px;
  color: #52555f;
  vertical-align: middle;
  height: 36px;
  position: relative;

  font-family: Roboto, sans-serif;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0.5px;

  &:first-child {
    width: 40px;
    text-align: center;
  }

  &:not(:first-child) {
    width: 145px;
  }

  input {
    width: 100%;
    border: none;
    background: transparent;
    text-align: center;
    font-family: Roboto, sans-serif;
    font-size: 18px;
    color: #52555f;
    outline: none;
    padding: 0;
  }

  &.percentage {
    font-size: 14px;
  }

  &.percentage::after {
    content: '%';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 18px;
    color: #52555f;
  }
`;

export default function UnitEconomyApp() {
  const [data, setData] = useState(() => {
    // Завантаження даних із localStorage під час ініціалізації
    const savedData = localStorage.getItem('unitEconomyData');
    return savedData
      ? JSON.parse(savedData)
      : {
          name: Array(18).fill(''),
          transcript: Array(18).fill(''),
          formula: Array(18).fill(''),
          data: Array(18).fill(''),
        };
  });

  const [focusedCell, setFocusedCell] = useState(null);
  const [currentFormula, setCurrentFormula] = useState('');
  const inputRef = useRef(null);

  const excelData = [
    {
      label: 'TRAFFIC',
      data: 'Потік користувачів чи відвідувачів',
      formula: '',
      number: '',
    },
    {
      label: 'З 1',
      data: 'Конверсія на реєстрацію або заявку',
      formula: 'UA / Traffic',
    },
    {
      label: 'UA або ЛІД',
      data: 'Реєстрації або заявки',
      formula: 'Traffic * C1',
    },
    {
      label: 'С2',
      data: 'Конверсія тих, хто зареєструвався в першу покупку',
      formula: 'Paying Users / UA',
    },
    {
      label: 'BUYERS',
      data: 'Клієнти або користувачі, що платять',
      formula: 'UA * C2',
    },
    {
      label: 'REVENUE',
      data: 'Виручка від цього потоку користувачів',
      formula: 'Buyers * Av.Price * APC',
    },
    { label: 'AV.PRICE', data: 'Середній чек / рахунок', formula: '' },
    {
      label: 'APC',
      data: 'Середня кількість платежів від одного клієнта',
      formula: 'Revenue / Av.Price / Buyers',
    },
    {
      label: 'ARPPU',
      data: 'Середній дохід із клієнта',
      formula: 'Buyers * Av.Price *APC',
    },
    { label: 'COGS', data: 'Собівартість одиниці', formula: '' },
    {
      label: '1sCOGS',
      data: 'Додаткова собівартість на першому продажу',
      formula: '',
    },
    { label: 'AD COSTS', data: 'Витрати на рекламу', formula: '' },
    {
      label: 'CPC',
      data: 'Вартість залучення відвідувача',
      formula: 'Traffic / Ad Costs',
    },
    {
      label: 'CPL',
      data: 'Вартість залучення одного користувача',
      formula: 'UA / Ad Costs',
    },
    {
      label: 'CAC',
      data: 'Вартість залучення одного користувача / клієнта, що платить',
      formula: 'Paying Users / Ad Cost',
    },
    {
      label: 'GROSS PROFIT',
      data: 'Валовий прибуток',
      formula: 'Revenue - Ad Costs - (COGS * APC + 1sCOGS) * Paying Users',
    },
    {
      label: 'PROFIT PER PAYING USER',
      data: 'Прибуток із одного клієнта',
      formula: 'ARPPU - COGS - 1sCOGS / APC - CAC',
    },
  ];

  const calculateData = (updatedData) => {
    const traffic = parseFloat(updatedData.name[0]) || 0;
    const c1 = parseFloat(updatedData.name[1]) / 100 || 0;
    const ua = parseFloat(updatedData.name[2]) || 0;
    const c2 = parseFloat(updatedData.name[3]) / 100 || 0;
    const buyers = parseFloat(updatedData.name[4]) || 0;
    const revenue = parseFloat(updatedData.name[5]) || 0;
    const avPrice = parseFloat(updatedData.name[6]) || 0;
    const apc = parseFloat(updatedData.name[7]) || 0;
    const arppu = parseFloat(updatedData.name[8]) || 0;
    const cogs = parseFloat(updatedData.name[9]) || 0;
    const sCogs = parseFloat(updatedData.name[10]) || 0;
    const adCosts = parseFloat(updatedData.name[11]) || 0;
    const cac = parseFloat(updatedData.name[14]) || 0;
  
    const newData = { ...updatedData };
  
    // UA або ЛІД = TRAFFIC * З 1
    if (traffic && c1) {
      newData.name[2] = (traffic * c1).toFixed(2) || '';
    }
  
    // BUYERS = UA або ЛІД * C2
    if (ua && c2) {
      newData.name[4] = (ua * c2).toFixed(2) || '';
    }
  
    // APC = Revenue / Av.Price / BUYERS
    if (revenue && avPrice && buyers) {
      newData.name[7] = (revenue / buyers / avPrice).toFixed(2) || '';
    }
  
    // ARPPU = Av.Price * APC
    if (avPrice && apc) {
      newData.name[8] = (avPrice * apc).toFixed(2) || '';
    }
  
    // CPC = Traffic / Ad Costs
    if (traffic && adCosts) {
      newData.name[12] = (adCosts / traffic).toFixed(2) || '';
    }
  
    // CPL = UA або ЛІД / Ad Costs
    if (ua && adCosts) {
      newData.name[13] = (adCosts / ua).toFixed(2) || '';
    }
  
    // CAC = Ad Cost / BUYERS
    if (buyers && adCosts) {
      newData.name[14] = (adCosts / buyers).toFixed(2) || '';
    }
  
    // Gross Profit = Revenue - Ad Costs - (COGS * APC + 1sCOGS) * Buyers
    if (revenue && adCosts && cogs && apc && sCogs && buyers) {
      newData.name[15] = (
        revenue -
        adCosts -
        (cogs * apc + sCogs) * buyers
      ).toFixed(2) || '';
    }
  
    // Profit per paying user = ARPPU - CAC - COGS - 1sCOGS
    if (arppu && cac && cogs && sCogs) {
      newData.name[16] = (arppu - cac - cogs - sCogs).toFixed(2) || '';
    }
  
    return newData;
  };

  const handleInputChange = (e, category, index) => {
    const updatedData = { ...data };
    const value = e.target.value;

    // Додаємо знак % до значень у комірках "З 1" та "C2"
    if (index === 1 || index === 3) {
      updatedData[category][index] = value;
    } else {
      updatedData[category][index] = value;
    }

    const calculatedData = calculateData(updatedData);
    setData(calculatedData);

    updateFormula(category, index);
    localStorage.setItem('unitEconomyData', JSON.stringify(updatedData));

  };

  const handleCellClick = (e, category, index) => {
    setFocusedCell({ category, index });
    updateFormula(category, index);
  };

  const updateFormula = (category, index) => {
    setCurrentFormula(excelData[index]?.formula || '');
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      setFocusedCell(null);
    }
  };

  useEffect(() => {
    if (focusedCell) {
      inputRef.current?.focus();
    }
  }, [focusedCell]);


  useEffect(() => {
    // Збереження даних у localStorage після кожної зміни
    localStorage.setItem('unitEconomyData', JSON.stringify(data));
  }, [data]);



  return (
    <Wrapper>
      <SpendingsContainer>
        <Table>
          <thead>
            <TableRow>
              <TableHead>НАЗВА ПОКАЗНИКА</TableHead>
              <TableHead>РОЗШИФРОВКА</TableHead>
              <TableHead>ФОРМУЛА</TableHead>
              <TableHead>ДАНІ</TableHead>
            </TableRow>
          </thead>
          <tbody>
            {excelData.map((item, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableData>{item.label}</TableData>
                <TableData>{item.data}</TableData>
                <TableData>{item.formula}</TableData>
                <TableData
                  className={
                    rowIndex === 1 || rowIndex === 3 ? 'percentage' : ''
                  }
                  onClick={e => handleCellClick(e, 'name', rowIndex)}
                  onKeyDown={handleKeyPress}
                >
                  {focusedCell?.category === 'name' &&
                  focusedCell?.index === rowIndex ? (
                    <input
                      ref={inputRef}
                      value={data.name[rowIndex]}
                      onChange={e => handleInputChange(e, 'name', rowIndex)}
                      onBlur={() => setFocusedCell(null)}
                      autoFocus
                    />
                  ) : (
                    data.name[rowIndex]
                  )}
                </TableData>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </SpendingsContainer>
    </Wrapper>
  );
}

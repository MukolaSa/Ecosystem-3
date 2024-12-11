import styled from "styled-components";
import { useState, useRef, useEffect } from "react";

const Wrapper = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    justify-content: start;
    align-items: start;
    padding-bottom: 80px;
    margin-bottom: 100px;
  }
`;

const SpendingsContainer = styled.div`
  @media (min-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: flex-start;
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
  background-color: #6425fe;
  color: white;
  padding: 10px;
  text-align: center;
  border: 4px solid #6425fe;
  font-size: 17px;
  font-family: Roboto, sans-serif;
  font-weight: bold;
  height: 28px;

  &:not(:first-child) {
    width: 145px;
  }

  input {
    border: none;
    background: transparent;
    color: white;
    text-align: center;
    font-size: 17px;
    font-family: Roboto, sans-serif;
    font-weight: bold;
    outline: none;
    width: 100%;
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const TableData = styled.td`
  padding: 10px;
  text-align: left;
  border: 3.3px solid #f5f6fb;
  font-size: 14px;
  color: #52555f;
  vertical-align: middle;
  height: 36px;
  position: relative;

  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
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
`;

export default function Spendings() {
  const initialData = JSON.parse(localStorage.getItem("spendingsData")) || {
    headers: ["ВЕРЕСЕНЬ", "ТИЖДЕНЬ 1", "ТИЖДЕНЬ 2", "ТИЖДЕНЬ 3", "ТИЖДЕНЬ 4"],
    september: Array(18).fill(""),
    week1: Array(18).fill(""),
    week2: Array(18).fill(""),
    week3: Array(18).fill(""),
    week4: Array(18).fill(""),
  };

  const [data, setData] = useState(initialData);
  const [focusedCell, setFocusedCell] = useState(null);
  const [currentFormula, setCurrentFormula] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("spendingsData", JSON.stringify(data));
  }, [data]);

  const calculatePercentage = (numerator, denominator) => {
    const num = parseFloat(numerator);
    const denom = parseFloat(denominator);
    return denom !== 0 && !isNaN(num) && !isNaN(denom)
      ? ((num / denom) * 100).toFixed(2)
      : "";
  };

  const calculateValue = (numerator, denominator) => {
    const num = parseFloat(numerator);
    const denom = parseFloat(denominator);
    return denom !== 0 && !isNaN(num) && !isNaN(denom)
      ? (num / denom).toFixed(2)
      : "";
  };

  const calculateDifference = (value1, value2) => {
    const val1 = parseFloat(value1);
    const val2 = parseFloat(value2);
    return !isNaN(val1) && !isNaN(val2) ? (val1 - val2).toFixed(2) : "";
  };

  const calculateData = (updatedData) => {
    const categories = ["september", "week1", "week2", "week3", "week4"];
    categories.forEach((category) => {
      const data = updatedData[category];
      data[0] = calculateValue(data[6], data[8]);
      data[2] = calculateValue(data[1], data[8]);
      data[3] = calculatePercentage(data[8], data[4]);
      data[5] = calculateValue(data[12], data[4]);
      data[10] = calculatePercentage(data[9], data[8]);
      data[13] = calculateValue(data[12], data[9]);
      data[14] = calculateValue(data[12], data[8]);
      data[15] = calculateDifference(data[2], data[14]);
      data[16] = calculateDifference(data[1], data[12]);
      data[17] = calculateValue(data[1], data[12]);
    });
    return updatedData;
  };

  const handleInputChange = (e, category, index) => {
    const updatedData = { ...data };
    updatedData[category][index] = e.target.value;

    const calculatedData = calculateData(updatedData);
    setData(calculatedData);
  };

  const handleHeaderChange = (e, index) => {
    const updatedHeaders = [...data.headers];
    updatedHeaders[index] = e.target.value.toUpperCase();
    setData({ ...data, headers: updatedHeaders });
  };

  const handleCellClick = (e, category, index) => {
    setFocusedCell({ category, index });
  };

  useEffect(() => {
    if (focusedCell) {
      inputRef.current?.focus();
    }
  }, [focusedCell]);

  return (
    <Wrapper>
      <SpendingsContainer>
        <Table>
          <thead>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>ДЕКОМПОЗИЦІЯ</TableHead>
              {data.headers.map((header, index) => (
                <TableHead key={index}>
                  <input
                    type="text"
                    value={header}
                    onChange={(e) => handleHeaderChange(e, index)}
                  />
                </TableHead>
              ))}
            </TableRow>
          </thead>
          <tbody>
            {[
              "ЦІНА ТОВАРУ (СЕРЕДНІЙ ЧЕК), $",
              "МАРЖА ВСЬОГО, $",
              "МАРЖА, $ (НА 1 ТОВАР)",
              "КОНВЕРСІЯ У ПРОДАЖ, %",
              "КІЛЬКІСТЬ ЗАЯВОК",
              "ВАРТІСТЬ ЗАЯВКИ, $",
              "ТОВАРООБІГ, $",
              "ЗАЯВКИ НА МЕНЕДЖЕРА",
              "ПРОДАЖІ ВСЬОГО, К-СТЬ",
              "ПОВТОРНІ ПРОДАЖІ, К-СТЬ",
              "% ПОВТОРНИХ ПРОДАЖІВ",
              "КІЛЬКІСТЬ ТОВАРІВ",
              "РЕКЛАМНИЙ БЮДЖЕТ, $",
              "ЦІНА КЛІЄНТА НОВОГО, $",
              "ЦІНА КЛІЄНТА, $",
              "ПРИБУТОК З 1-ГО, $",
              "ПРИБУТОК ВСЬОГО, $",
              "ОКУПНІСТЬ",
            ].map((label, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableData>{rowIndex + 1}</TableData>
                <TableData>{label}</TableData>
                {["september", "week1", "week2", "week3", "week4"].map(
                  (category, colIndex) => (
                    <TableData
                      key={colIndex}
                      onClick={(e) => handleCellClick(e, category, rowIndex)}
                    >
                      <input
                        type="text"
                        value={data[category][rowIndex]}
                        onChange={(e) =>
                          handleInputChange(e, category, rowIndex)
                        }
                        ref={
                          focusedCell?.category === category &&
                          focusedCell?.index === rowIndex
                            ? inputRef
                            : null
                        }
                        onBlur={() => setFocusedCell(null)}
                      />
                    </TableData>
                  )
                )}
              </TableRow>
            ))}
          </tbody>
        </Table>
      </SpendingsContainer>
    </Wrapper>
  );
}

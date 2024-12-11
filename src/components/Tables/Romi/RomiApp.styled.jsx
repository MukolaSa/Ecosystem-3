import styled from 'styled-components';

export const Wrapper = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-top: 20px;
    padding-bottom: 20px;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
`;

export const TableContainer = styled.div`
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

export const TableHeader = styled.th`
  background-color: #6425FE;
  color: white;
  padding: 10px;
  text-align: center;
  font-size: 17px;
  font-family: Roboto, sans-serif;
  font-weight: bold;
  height: 38px;

  &:not(:first-child) {
    width: 145px;
  }

  &:first-child {
    border-radius: 30px 0px 0px 0px;
  }

  &:last-child {
    border-radius: 0px 30px 0px 0px;
  }
`;

export const SubHeader = styled.th`
  padding: 12px;
  background-color: #6425FE;
  color: #fff;
  text-align: center;
  font-size: 16px;
  height: 25px;
`;

export const RowHeader = styled.th`
  border: none;
  padding: 12px;
  background-color: #6425FE;
  color: white;
  text-align: center;
  font-size: 14px;
  width: 160px;
`;

export const RowHeaderBottom = styled.th`
  padding: 12px;
  background-color: #6425FE;
  color: white;
  text-align: center;
  font-size: 14px;
  width: 160px;
  border-bottom: 3.3px solid #f2f5fc;
`;

export const RowHead = styled.th`
  border: none;
  padding: 12px;
  background-color: #6425FE;
  color: white;
  text-align: center;
  font-size: 14px;
  border-radius: 0px 0px 0px 30px;
  height: 35px;
`;

export const TableTitle = styled.td`
  font-family: Roboto, sans-serif;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.5px;
  padding: 10.75px;
  width: 320px;
  background-color: #f2f5fc;
  color: #000;
`;

export const TableTitleTop = styled.td`
  font-family: Roboto, sans-serif;
  border-top: 3.3px solid #f5f6fb;
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 0.5px;
  padding: 10px;
  width: 320px;
  background-color: #f2f5fc;
  color: #000;
`;

export const Romi = styled.td`
  font-family: Roboto, sans-serif;
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 0.5px;
  padding: 10px;
  width: 320px;
  background-color: #6425FE;
  color: #000;
`;

export const TableData = styled.td`
  padding: 10px;
  text-align: center;
  border: 2px solid #f5f6fb;
  font-size: 14px;
  color: #52555f;
  vertical-align: middle;
  height: 25px;
  position: relative;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 0.5px;
`;

export const TableDataBottom = styled.td`
  padding: 10px;
  text-align: center;
  border-bottom: 4px solid #edeef2;
  border-left: 2px solid #f5f6fb;
  border-right: 2px solid #f5f6fb;
  font-size: 14px;
  color: #52555f;
  vertical-align: middle;
  height: 25px;
  position: relative;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 0.5px;
`;

export const DataBold = styled.td`
  border: 2px solid #f5f6fb;
  padding: 10px;
  text-align: center;
  background-color: #e9f1f7;
  color: #000000;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 0.5px;
`;

export const LastDataBold = styled.td`
  border: 2px solid #f5f6fb;
  padding: 10px;
  text-align: center;
  background-color: #e9f1f7;
  color: #000000;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 0.5px;
  border-radius: 0px 0px 30px 0px;
`;

export const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  color: #000;
  text-align: center;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  outline: none;
  padding: 0;
`;
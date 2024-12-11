import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const OrderBoardContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: auto;
  margin: 0;
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  color: #1a73e8;
  font-size: 28px;
  margin-bottom: 20px;
  font-weight: 600;
  animation: fadeIn 1s ease-in-out;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  padding: 10px 20px;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.1s ease;

  &:hover {
    background-color: #1558b0;
  }

  &:active {
    background-color: #0e4a92;
    transform: scale(0.98);
  }
`;

const AddOrderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 800px;
  animation: fadeIn 1.5s ease-in-out;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 48%;
  outline: none;
`;

const InputField = styled.input`
  padding: 12px;
  border: 1px solid #c5cbe9;
  border-radius: 6px;
  font-size: 16px;
  width: 100%;
  background-color: #fff;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  outline: none;

  &:focus {
    border-color: #1a73e8;
    box-shadow: 0 0 6px rgba(26, 115, 232, 0.3);
  }

  &::placeholder {
    color: #888;
  }
`;

const AddButton = styled.button`
  padding: 12px 20px;
  background-color: #1a73e8;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.1s ease;
  width: 100%;
  max-width: 200px;

  &:hover {
    background-color: #1558b0;
  }

  &:active {
    background-color: #0e4a92;
    transform: scale(0.98);
  }

  &:focus {
    outline: none;
    background-color: #0e4a92;
  }
`;

const OrderTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  max-width: 1000px;
  animation: fadeIn 2s ease-in-out;
  border-radius: 10px 10px 0px 0px;
  overflow: hidden;
`;

const TableHeader = styled.th`
  background-color: #1a73e8;
  color: white;
  padding: 14px;
  text-align: left;
  font-size: 16px;
  font-weight: 500;
`;

const TableCell = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
  font-size: 16px;
  position: relative;
  cursor: pointer;
`;

const DeleteIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 8px;
  right: 8px;
  margin-top: 10px;
  color: #cf1313;
  font-size: 18px;
  cursor: pointer;
`;


const StatusCell = styled(TableCell)`
  color: ${(props) => {
    switch (props.status) {
      case 'Новий':
        return '#1a73e8';
      case 'Відмова':
        return '#dc3545';
      case 'Отримано':
        return '#28a745';
      case 'В дорозі':
        return '#ffc107';
      case 'На пошті':
        return '#17a2b8';
      default:
        return '#333';
    }
  }};
  font-weight: bold;
`;

const StatusSelect = styled.select`
  padding: 6px;
  border: 1px solid #c5cbe9;
  border-radius: 4px;
  background-color: #fff;
  font-size: 14px;
  cursor: pointer;
  outline: none;
  transition: border-color 0.3s ease, background-color 0.3s ease;

  &:focus {
    border-color: #1a73e8;
    background-color: #f0f8ff;
  }
`;

const OrderBoard = () => {
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState({
    customerName: '',
    customerSurname: '',
    phoneNumber: '',
    product: '',
    quantity: '',
    status: 'Новий',
  });
  const [activeRowIndex, setActiveRowIndex] = useState(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders'));
    if (savedOrders) {
      setOrders(savedOrders);
    }
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem('orders', JSON.stringify(orders));
    }
  }, [orders]);

  const handleStatusChange = (index, status) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = status;
    setOrders(updatedOrders);
  };

  const deleteOrder = (index) => {
    const updatedOrders = orders.filter((_, i) => i !== index);
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders)); // Оновлюємо localStorage
  };
  

  const addOrder = () => {
    if (orderDetails.customerName && orderDetails.product && orderDetails.quantity) {
      const newOrder = { ...orderDetails };
      const updatedOrders = [...orders, newOrder];
      setOrders(updatedOrders);
      setOrderDetails({
        customerName: '',
        customerSurname: '',
        phoneNumber: '',
        product: '',
        quantity: '',
        status: 'Новий',
      });
    } else {
      alert('Будь ласка, заповніть всі обов\'язкові поля!');
    }
  };

  return (
    <OrderBoardContainer>
      <Title>Дошка замовлень</Title>
      <FilterContainer>
        <FilterButton>День</FilterButton>
        <FilterButton>Тиждень</FilterButton>
        <FilterButton>Місяць</FilterButton>
      </FilterContainer>

      <AddOrderContainer>
        <InputGroup>
          <InputField
            type="text"
            placeholder="Ім'я"
            value={orderDetails.customerName}
            onChange={(e) => setOrderDetails({ ...orderDetails, customerName: e.target.value })}
          />
          <InputField
            type="text"
            placeholder="Прізвище"
            value={orderDetails.customerSurname}
            onChange={(e) => setOrderDetails({ ...orderDetails, customerSurname: e.target.value })}
          />
          <InputField
            type="text"
            placeholder="Номер телефону"
            value={orderDetails.phoneNumber}
            onChange={(e) => setOrderDetails({ ...orderDetails, phoneNumber: e.target.value })}
          />
        </InputGroup>

        <InputGroup>
          <InputField
            type="text"
            placeholder="Товар"
            value={orderDetails.product}
            onChange={(e) => setOrderDetails({ ...orderDetails, product: e.target.value })}
          />
          <InputField
            type="number"
            placeholder="Ціна"
            value={orderDetails.quantity}
            onChange={(e) => setOrderDetails({ ...orderDetails, quantity: e.target.value })}
          />
          <AddButton onClick={addOrder}>Додати замовлення</AddButton>
        </InputGroup>
      </AddOrderContainer>

      <OrderTable>
        <thead>
          <tr>
            <TableHeader>Ім'я</TableHeader>
            <TableHeader>Прізвище</TableHeader>
            <TableHeader>Номер телефону</TableHeader>
            <TableHeader>Товар</TableHeader>
            <TableHeader>Кількість</TableHeader>
            <TableHeader>Статус</TableHeader>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr
              key={index}
              onClick={() => setActiveRowIndex(activeRowIndex === index ? null : index)}
            >
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{order.customerSurname}</TableCell>
              <TableCell>{order.phoneNumber}</TableCell>
              <TableCell>{order.product}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <StatusCell status={order.status}>
                <StatusSelect
                  value={order.status}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                >
                  <option value="Новий">Новий</option>
                  <option value="Відмова">Відмова</option>
                  <option value="Отримано">Отримано</option>
                  <option value="В дорозі">В дорозі</option>
                  <option value="На пошті">На пошті</option>
                </StatusSelect>
                <DeleteIcon
                  icon={faTrash}
                  onClick={() => deleteOrder(index)}
                />
              </StatusCell>
            </tr>
          ))}
        </tbody>
      </OrderTable>
    </OrderBoardContainer>
  );
};

export default OrderBoard;

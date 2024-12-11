import React, { useState, useEffect } from 'react';
import {
  Wrapper,
  StyledTable,
  TableContainer,
  TableHeader,
  SubHeader,
  RowHeader,
  RowHeaderBottom,
  RowHead,
  TableTitle,
  TableTitleTop,
  Romi,
  TableData,
  TableDataBottom,
  DataBold,
  LastDataBold,
  Input,
} from './RomiApp.styled';

const RomiApp = () => {
  // Завантажуємо дані з localStorage
  const loadState = (key, defaultValue) => {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : defaultValue;
  };

  const [salesData, setSalesData] = useState(loadState('salesData', { min: '', optimal: '', max: '' }));
  const [checkData, setCheckData] = useState(loadState('checkData', { min: '', optimal: '', max: '' }));
  const [conversionData, setConversionData] = useState(loadState('conversionData', { min: '', optimal: '', max: '' }));
  const [leadsData, setLeadsData] = useState(loadState('leadsData', { min: '', optimal: '', max: '' }));
  const [leadCostData, setLeadCostData] = useState(loadState('leadCostData', { min: '', optimal: '', max: '' }));
  const [workingDays, setWorkingDays] = useState(loadState('workingDays', { min: '', optimal: '', max: '' }));
  const [managers, setManagers] = useState(loadState('managers', { min: '', optimal: '', max: '' }));

  // Зберігаємо дані в localStorage при кожній зміні
  useEffect(() => {
    localStorage.setItem('salesData', JSON.stringify(salesData));
    localStorage.setItem('checkData', JSON.stringify(checkData));
    localStorage.setItem('conversionData', JSON.stringify(conversionData));
    localStorage.setItem('leadsData', JSON.stringify(leadsData));
    localStorage.setItem('leadCostData', JSON.stringify(leadCostData));
    localStorage.setItem('workingDays', JSON.stringify(workingDays));
    localStorage.setItem('managers', JSON.stringify(managers));
  }, [salesData, checkData, conversionData, leadsData, leadCostData, workingDays, managers]);

  const calculateLeads = (sales, conversion) => {
    if (!sales || !conversion || conversion === '0') return '';
    return (parseFloat(sales) / (parseFloat(conversion) / 100)).toFixed(0);
  };

  const calculateAdBudget = (leads, leadCost) => {
    if (!leads || !leadCost || leadCost === '0') return '';
    return (parseFloat(leads) * parseFloat(leadCost)).toFixed(0);
  };

  const calculateSalesPerDay = (sales, workingDays) => {
    if (!sales || !workingDays || workingDays === '0') return '';
    return (parseFloat(sales) / parseFloat(workingDays)).toFixed(0);
  };

  const calculateTotalSales = (sales, check) => {
    if (!sales || !check || sales === '0' || check === '0') return '0';
    return (parseFloat(sales) * parseFloat(check)).toFixed(0);
  };

  const calculateDailySalesAmount = (sales, check, workingDays) => {
    const totalSales = calculateTotalSales(sales, check);
    if (!totalSales || !workingDays || workingDays === '0') return '';
    return (parseFloat(totalSales) / parseFloat(workingDays)).toFixed(0);
  };

  const calculateManagerSalesPlan = (totalSales, numManagers) => {
    if (!totalSales || !numManagers || numManagers === '0') return '';
    return (parseFloat(totalSales) / parseFloat(numManagers)).toFixed(0);
  };

  const calculateClientsPerManager = (sales, managers) => {
    if (!sales || !managers || managers === '0') return '';
    return (parseFloat(sales) / parseFloat(managers)).toFixed(0);
  };

  const calculateLeadsPerManager = (leads, managers) => {
    if (!leads || !managers || managers === '0') return '';
    return (parseFloat(leads) / parseFloat(managers)).toFixed(0);
  };

  const calculateLeadsPerDayManager = (leadsPerDay, managers) => {
    if (!leadsPerDay || !managers || managers === '0') return '';
    return (parseFloat(leadsPerDay) / parseFloat(managers)).toFixed(0);
  };

  const calculateDealsPerManager = (salesPerDay, managers) => {
    if (!salesPerDay || !managers || managers === '0') return '';
    return (parseFloat(salesPerDay) / parseFloat(managers)).toFixed(0);
  };

  const calculateRevenuePerManager = (salesAmountPerDay, managers) => {
    if (!salesAmountPerDay || !managers || managers === '0') return '';
    return (parseFloat(salesAmountPerDay) / parseFloat(managers)).toFixed(0);
  };

  const calculateROMI = (totalSales, adBudget) => {
    if (!totalSales || !adBudget || adBudget === '0') return '';
    return (
      ((parseFloat(totalSales) - parseFloat(adBudget)) / parseFloat(adBudget)) *
      100
    ).toFixed(0);
  };


  return (
    <Wrapper>
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <TableHeader colSpan="2"></TableHeader>
              <TableHeader>MINIMAL</TableHeader>
              <TableHeader>OPTIMAL</TableHeader>
              <TableHeader>MAXIMUM</TableHeader>
            </tr>
            <tr>
              <SubHeader colSpan="2"></SubHeader>
              <DataBold>
                {calculateTotalSales(salesData.min, checkData.min)} грн
              </DataBold>
              <DataBold>
                {calculateTotalSales(salesData.optimal, checkData.optimal)} грн
              </DataBold>
              <DataBold>
                {calculateTotalSales(salesData.max, checkData.max)} грн
              </DataBold>
            </tr>
          </thead>
          <tbody>
            <tr>
              <RowHeader rowSpan="6">ЩОДЕННА ДИНАМІКА</RowHeader>
              <TableTitleTop gray>КІЛЬКІСТЬ ПРОДАЖІВ</TableTitleTop>
              <TableData>
                <Input
                  type="text"
                  value={salesData.min}
                  onChange={e =>
                    setSalesData({ ...salesData, min: e.target.value })
                  }
                />
              </TableData>
              <TableData>
                <Input
                  type="text"
                  value={salesData.optimal}
                  onChange={e =>
                    setSalesData({ ...salesData, optimal: e.target.value })
                  }
                />
              </TableData>
              <TableData>
                <Input
                  type="text"
                  value={salesData.max}
                  onChange={e =>
                    setSalesData({ ...salesData, max: e.target.value })
                  }
                />
              </TableData>
            </tr>
            <tr>
              <TableTitle gray>СЕРЕДНІЙ ЧЕК ПРОДАЖІВ</TableTitle>
              <TableData>
                <Input
                  type="text"
                  value={checkData.min}
                  onChange={e =>
                    setCheckData({ ...checkData, min: e.target.value })
                  }
                />
              </TableData>
              <TableData>
                <Input
                  type="text"
                  value={checkData.optimal}
                  onChange={e =>
                    setCheckData({ ...checkData, optimal: e.target.value })
                  }
                />
              </TableData>
              <TableData>
                <Input
                  type="text"
                  value={checkData.max}
                  onChange={e =>
                    setCheckData({ ...checkData, max: e.target.value })
                  }
                />
              </TableData>
            </tr>
            <tr>
              <TableTitle gray>ПЛАНОВА КОНВЕРСІЯ З ЛІДА В ОПЛАТУ</TableTitle>
              <TableData>
                <Input
                  type="text"
                  value={conversionData.min}
                  onChange={e =>
                    setConversionData({
                      ...conversionData,
                      min: e.target.value,
                    })
                  }
                />
              </TableData>
              <TableData>
                <Input
                  type="text"
                  value={conversionData.optimal}
                  onChange={e =>
                    setConversionData({
                      ...conversionData,
                      optimal: e.target.value,
                    })
                  }
                />
              </TableData>
              <TableData>
                <Input
                  type="text"
                  value={conversionData.max}
                  onChange={e =>
                    setConversionData({
                      ...conversionData,
                      max: e.target.value,
                    })
                  }
                />
              </TableData>
            </tr>
            <tr>
              <TableTitle gray>ВАРТІСТЬ ЛІДА</TableTitle>
              <TableData>
                <Input
                  type="text"
                  value={leadCostData.min}
                  onChange={e =>
                    setLeadCostData({ ...leadCostData, min: e.target.value })
                  }
                />
              </TableData>
              <TableData>
                <Input
                  type="text"
                  value={leadCostData.optimal}
                  onChange={e =>
                    setLeadCostData({
                      ...leadCostData,
                      optimal: e.target.value,
                    })
                  }
                />
              </TableData>
              <TableData>
                <Input
                  type="text"
                  value={leadCostData.max}
                  onChange={e =>
                    setLeadCostData({ ...leadCostData, max: e.target.value })
                  }
                />
              </TableData>
            </tr>
            <tr>
              <TableTitle gray>КІЛЬКІСТЬ РОБОЧИХ ДНІВ</TableTitle>
              <TableData>
                <Input
                  type="text"
                  value={workingDays.min}
                  onChange={e =>
                    setWorkingDays({ ...workingDays, min: e.target.value })
                  }
                />
              </TableData>
              <TableData>
                <Input
                  type="text"
                  value={workingDays.optimal}
                  onChange={e =>
                    setWorkingDays({ ...workingDays, optimal: e.target.value })
                  }
                />
              </TableData>
              <TableData>
                <Input
                  type="text"
                  value={workingDays.max}
                  onChange={e =>
                    setWorkingDays({ ...workingDays, max: e.target.value })
                  }
                />
              </TableData>
            </tr>
            <tr>
              <TableTitle gray>КІЛЬКІСТЬ МЕНЕДЖЕРІВ</TableTitle>
              <TableDataBottom>
                <Input
                  type="text"
                  value={managers.min}
                  onChange={e =>
                    setManagers({ ...managers, min: e.target.value })
                  }
                />
              </TableDataBottom>
              <TableDataBottom>
                <Input
                  type="text"
                  value={managers.optimal}
                  onChange={e =>
                    setManagers({ ...managers, optimal: e.target.value })
                  }
                />
              </TableDataBottom>
              <TableDataBottom>
                <Input
                  type="text"
                  value={managers.max}
                  onChange={e =>
                    setManagers({ ...managers, max: e.target.value })
                  }
                />
              </TableDataBottom>
            </tr>
            <tr>
              <RowHeader rowSpan="2">МАРКЕТИНГ ПЛАН</RowHeader>
              <TableTitle gray>РЕКЛАМНИЙ БЮДЖЕТ</TableTitle>
              <TableData>
                {calculateAdBudget(
                  calculateLeads(salesData.min, conversionData.min),
                  leadCostData.min
                )}
              </TableData>
              <TableData>
                {calculateAdBudget(
                  calculateLeads(salesData.optimal, conversionData.optimal),
                  leadCostData.optimal
                )}
              </TableData>
              <TableData>
                {calculateAdBudget(
                  calculateLeads(salesData.max, conversionData.max),
                  leadCostData.max
                )}
              </TableData>
            </tr>
            <tr>
              <TableTitle gray>КІЛЬКІСТЬ ЛІДІВ</TableTitle>
              <TableDataBottom>
                <Input
                  type="text"
                  value={calculateLeads(salesData.min, conversionData.min)}
                  readOnly
                />
              </TableDataBottom>
              <TableDataBottom>
                <Input
                  type="text"
                  value={calculateLeads(
                    salesData.optimal,
                    conversionData.optimal
                  )}
                  readOnly
                />
              </TableDataBottom>
              <TableDataBottom>
                <Input
                  type="text"
                  value={calculateLeads(salesData.max, conversionData.max)}
                  readOnly
                />
              </TableDataBottom>
            </tr>

            <tr>
              <RowHeader rowSpan="3">ЩОДЕННА ДИНАМІКА ВП</RowHeader>
              <TableTitle gray>КІЛЬКІСТЬ ЛІДІВ В ДЕНЬ</TableTitle>
              <TableData>
                <Input
                  type="text"
                  value={calculateSalesPerDay(
                    calculateLeads(salesData.min, conversionData.min),
                    workingDays.min
                  )}
                  readOnly
                />
              </TableData>
              <TableData>
                <Input
                  type="text"
                  value={calculateSalesPerDay(
                    calculateLeads(salesData.optimal, conversionData.optimal),
                    workingDays.optimal
                  )}
                  readOnly
                />
              </TableData>
              <TableData>
                <Input
                  type="text"
                  value={calculateSalesPerDay(
                    calculateLeads(salesData.max, conversionData.max),
                    workingDays.max
                  )}
                  readOnly
                />
              </TableData>
            </tr>
            <tr>
              <TableTitle gray>КІЛЬКІСТЬ ПРОДАЖІВ В ДЕНЬ</TableTitle>
              <TableData>
                <Input
                  type="text"
                  value={calculateSalesPerDay(salesData.min, workingDays.min)}
                  readOnly
                />
              </TableData>
              <TableData>
                <Input
                  type="text"
                  value={calculateSalesPerDay(
                    salesData.optimal,
                    workingDays.optimal
                  )}
                  readOnly
                />
              </TableData>
              <TableData>
                <Input
                  type="text"
                  value={calculateSalesPerDay(salesData.max, workingDays.max)}
                  readOnly
                />
              </TableData>
            </tr>
            <tr>
              <TableTitle gray>СУМА ПРОДАЖІВ В ДЕНЬ</TableTitle>
              <TableDataBottom>
                <Input
                  type="text"
                  value={calculateDailySalesAmount(
                    salesData.min,
                    checkData.min,
                    workingDays.min
                  )}
                  readOnly
                />
              </TableDataBottom>
              <TableDataBottom>
                <Input
                  type="text"
                  value={calculateDailySalesAmount(
                    salesData.optimal,
                    checkData.optimal,
                    workingDays.optimal
                  )}
                  readOnly
                />
              </TableDataBottom>
              <TableDataBottom>
                <Input
                  type="text"
                  value={calculateDailySalesAmount(
                    salesData.max,
                    checkData.max,
                    workingDays.max
                  )}
                  readOnly
                />
              </TableDataBottom>
            </tr>

            <tr>
              <RowHeader rowSpan="6">НАВАНТАЖЕННЯ НА МЕНЕДЖЕРА</RowHeader>
              <TableTitle gray>ПЛАН ПРОДАЖІВ НА МЕНЕДЖЕРА, ГРН</TableTitle>
              <TableData>
                {calculateManagerSalesPlan(
                  calculateTotalSales(salesData.min, checkData.min),
                  managers.min
                )}
              </TableData>
              <TableData>
                {calculateManagerSalesPlan(
                  calculateTotalSales(salesData.optimal, checkData.optimal),
                  managers.optimal
                )}
              </TableData>
              <TableData>
                {calculateManagerSalesPlan(
                  calculateTotalSales(salesData.max, checkData.max),
                  managers.max
                )}
              </TableData>
            </tr>
            <tr>
              <TableTitle gray>ПЛАН КЛІЄНТІВ НА МЕНЕДЖЕРА</TableTitle>
              <TableData>
                {calculateClientsPerManager(salesData.min, managers.min)}
              </TableData>
              <TableData>
                {calculateClientsPerManager(
                  salesData.optimal,
                  managers.optimal
                )}
              </TableData>
              <TableData>
                {calculateClientsPerManager(salesData.max, managers.max)}
              </TableData>
            </tr>
            <tr>
              <TableTitle gray>ПЛАН ЛІДІВ НА МЕНЕДЖЕРА, ШТ</TableTitle>
              <TableData>
                {calculateLeadsPerManager(
                  calculateLeads(salesData.min, conversionData.min),
                  managers.min
                )}
              </TableData>
              <TableData>
                {calculateLeadsPerManager(
                  calculateLeads(salesData.optimal, conversionData.optimal),
                  managers.optimal
                )}
              </TableData>
              <TableData>
                {calculateLeadsPerManager(
                  calculateLeads(salesData.max, conversionData.max),
                  managers.max
                )}
              </TableData>
            </tr>
            <tr>
              <TableTitle gray>ЛІДІВ В ДЕНЬ НА МЕНЕДЖЕРА</TableTitle>
              <TableData>
                {calculateLeadsPerDayManager(
                  calculateSalesPerDay(
                    calculateLeads(salesData.min, conversionData.min),
                    workingDays.min
                  ),
                  managers.min
                )}
              </TableData>
              <TableData>
                {calculateLeadsPerDayManager(
                  calculateSalesPerDay(
                    calculateLeads(salesData.optimal, conversionData.optimal),
                    workingDays.optimal
                  ),
                  managers.optimal
                )}
              </TableData>
              <TableData>
                {calculateLeadsPerDayManager(
                  calculateSalesPerDay(
                    calculateLeads(salesData.max, conversionData.max),
                    workingDays.max
                  ),
                  managers.max
                )}
              </TableData>
            </tr>
            <tr>
              <TableTitle gray>ЗАКЛЮЧЕНИХ УГОД В ДЕНЬ НА МЕНЕДЖЕРА</TableTitle>
              <TableData>
                {calculateDealsPerManager(
                  calculateSalesPerDay(salesData.min, workingDays.min),
                  managers.min
                )}
              </TableData>
              <TableData>
                {calculateDealsPerManager(
                  calculateSalesPerDay(salesData.optimal, workingDays.optimal),
                  managers.optimal
                )}
              </TableData>
              <TableData>
                {calculateDealsPerManager(
                  calculateSalesPerDay(salesData.max, workingDays.max),
                  managers.max
                )}
              </TableData>
            </tr>
            <tr>
              <TableTitle gray>ВИРУЧКА В ДЕНЬ НА МЕНЕДЖЕРА</TableTitle>
              <TableData>
                {calculateRevenuePerManager(
                  calculateDailySalesAmount(
                    salesData.min,
                    checkData.min,
                    workingDays.min
                  ),
                  managers.min
                )}
              </TableData>
              <TableData>
                {calculateRevenuePerManager(
                  calculateDailySalesAmount(
                    salesData.optimal,
                    checkData.optimal,
                    workingDays.optimal
                  ),
                  managers.optimal
                )}
              </TableData>
              <TableData>
                {calculateRevenuePerManager(
                  calculateDailySalesAmount(
                    salesData.max,
                    checkData.max,
                    workingDays.max
                  ),
                  managers.max
                )}
              </TableData>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <RowHead colSpan="1">ROMI</RowHead>
              <Romi></Romi>
              <DataBold>
                {calculateROMI(
                  calculateTotalSales(salesData.min, checkData.min),
                  calculateAdBudget(
                    calculateLeads(salesData.min, conversionData.min),
                    leadCostData.min
                  )
                )}
                %
              </DataBold>
              <DataBold>
                {calculateROMI(
                  calculateTotalSales(salesData.optimal, checkData.optimal),
                  calculateAdBudget(
                    calculateLeads(salesData.optimal, conversionData.optimal),
                    leadCostData.optimal
                  )
                )}
                %
              </DataBold>
              <LastDataBold>
                {calculateROMI(
                  calculateTotalSales(salesData.max, checkData.max),
                  calculateAdBudget(
                    calculateLeads(salesData.max, conversionData.max),
                    leadCostData.max
                  )
                )}
                %
              </LastDataBold>
            </tr>
          </tfoot>
        </StyledTable>
      </TableContainer>
    </Wrapper>
  );
};

export default RomiApp;

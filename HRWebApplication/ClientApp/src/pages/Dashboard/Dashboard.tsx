import { Col, Row } from 'antd';
import AppBody from 'components/Layouts/AppBody';
import React from 'react';
import { ChartComponentProps, Pie } from 'react-chartjs-2';
import { EmployeeStatisticItem, StatisticClient } from 'services/ApiClient';

const backgroundColorArray = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
] as const;
const borderColorArray = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
] as const;

const dataToChartProps = (preprocessedData: EmployeeStatisticItem[]): ChartComponentProps => {
  const dataHasValue = preprocessedData.filter((it) => it.employeeNo);
  return {
    data: {
      labels: dataHasValue.map((it) => it.name || ''),
      datasets: [
        {
          data: dataHasValue.map((it) => Number(it.employeeNo)),
          backgroundColor: dataHasValue.map(
            (_, i) => backgroundColorArray[i % backgroundColorArray.length],
          ),
          borderColor: dataHasValue.map((_, i) => borderColorArray[i % borderColorArray.length]),
          borderWidth: 1,
        },
      ],
    },
    legend: {
      position: 'bottom',
    },
  };
};

export function DashboardPage(props) {
  const apiDashboard = React.useRef(new StatisticClient());
  const [byUnit, setByUnit] = React.useState<EmployeeStatisticItem[]>();
  const [byWorkType, setByWorkType] = React.useState<EmployeeStatisticItem[]>();

  React.useEffect(() => {
    async function fetchStatistic() {
      const [byUnit, byWorkType] = await Promise.all([
        apiDashboard.current.employeeNoByUnit(),
        apiDashboard.current.employeeNoByWorkType(),
      ]);
      setByUnit(byUnit);
      setByWorkType(byWorkType);
    }

    fetchStatistic();
  }, []);

  return (
    <AppBody title="Bảng điều khiển">
      <Row gutter={40}>
        {byUnit ? (
          <Col span={12}>
            <h2 style={{ textAlign: 'center', marginBottom: '1em' }}>Thống kê theo đơn vị</h2>
            <Pie {...dataToChartProps(byUnit)} />
          </Col>
        ) : null}
        {byWorkType ? (
          <Col span={12}>
            <h2 style={{ textAlign: 'center', marginBottom: '1em' }}>
              Thống kê theo loại hình làm việc
            </h2>
            <Pie {...dataToChartProps(byWorkType)} />
          </Col>
        ) : null}
      </Row>
    </AppBody>
  );
}
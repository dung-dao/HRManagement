import { Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'routes';
import { EmployeeDTO, PaySlipDTO } from 'services/ApiClient';
import { formatCurrency } from 'utils';

export const paySlipColumns: ColumnsType<PaySlipDTO> = [
  {
    title: 'Tổng lương',
    dataIndex: 'amount',
    key: 'amount',
    render: (value) => formatCurrency(~~value + ''),
  },
  {
    title: 'Thời gian',
    key: 'startDate',
    dataIndex: 'startDate',
    render: (value, record) =>
      moment(record.startDate).format('DD/MM/YYYY') +
      ' -> ' +
      moment(record.endDate).format('DD/MM/YYYY'),
  },
  {
    title: 'Nhân viên',
    key: 'employee',
    dataIndex: 'employee',
    render: (value: EmployeeDTO) => {
      const fullname = (value?.firstName || '') + ' ' + (value?.lastName || '');

      return (
        <Tooltip title={fullname}>
          <Link to={ROUTES.employeeEdit + '/' + value?.id}>{fullname}</Link>
        </Tooltip>
      );
    },
  },
];

type Props = {};

export const Payslip: React.FC<Props> = (props) => {
  const {} = props;

  return <div></div>;
};

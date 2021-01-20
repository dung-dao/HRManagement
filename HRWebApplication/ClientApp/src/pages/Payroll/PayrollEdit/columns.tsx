// import { ActionRenderer } from './ActionRenderer';
import { CheckCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'routes';
import { EmployeeDTO, PaySlipStatus, PaySlipDTO as RecordType } from 'services/ApiClient';
import { formatCurrency } from 'utils';

export const mapProperties = {
  status: {
    [PaySlipStatus.Confirmed]: {
      color: 'success',
      icon: <CheckCircleOutlined />,
      children: 'Đã chốt lương',
    },
    [PaySlipStatus.Temporary]: {
      color: 'warning',
      icon: <SyncOutlined spin />,
      children: 'Tạm tính',
    },
  },
} as const;

export const columns: ColumnsType<RecordType> = [
  {
    title: 'Trạng thái',
    fixed: 'left',
    key: 'status',
    dataIndex: 'status',
    render: (value, record: RecordType, index: number) => (
      <Tag {...mapProperties.status[value]} key={index} />
    ),
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
    title: 'Tổng lương',
    dataIndex: 'amount',
    key: 'amount',
    render: (value) => formatCurrency(~~value + ''),
  },
];

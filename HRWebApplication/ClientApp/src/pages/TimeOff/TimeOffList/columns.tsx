import {
  CarryOutOutlined,
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationOutlined,
} from '@ant-design/icons';
import { Button, Popconfirm, Space, Tag, Tooltip } from 'antd';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'routes';
import { EmployeeDTO, EmployeeStatus } from 'services/ApiClient';
import { mapSex, mapStatusToTagProps, BeautifyEmployeeStatus } from './utils';
import { ActionRenderer } from './ActionRenderer';

export const columns = [
  {
    title: 'Trạng thái',
    fixed: 'left',
    key: 'status',
    dataIndex: 'status',
    render: (status: EmployeeStatus, _, index) => (
      <Tag {...mapStatusToTagProps[status]} key={index} />
    ),
    filters: [
      { text: 'Đang làm việc', value: BeautifyEmployeeStatus.Working },
      { text: 'Chưa làm việc', value: BeautifyEmployeeStatus.Pending },
      { text: 'Ngừng làm việc', value: BeautifyEmployeeStatus.Left },
    ],
    onFilter: (value: EmployeeStatus, record: EmployeeDTO) => record.status === value,
    sorter: (a: EmployeeDTO, b: EmployeeDTO) => {
      const mapPriority = {
        // the higher value should appear first
        [BeautifyEmployeeStatus.Working]: 2,
        [BeautifyEmployeeStatus.Pending]: 1,
        [BeautifyEmployeeStatus.Left]: 0,
      };
      return mapPriority[a.status!] - mapPriority[b.status!];
    },
    sortDirections: ['descend'],
    defaultSortOrder: 'descend',
  },
  { title: 'Họ', key: 'firstName', dataIndex: 'firstName' },
  { title: 'Tên', key: 'lastName', dataIndex: 'lastName' },

  { title: 'Email cá nhân', key: 'personalEmail', dataIndex: 'personalEmail' },
  { title: 'Email công việc', key: 'workEmail', dataIndex: 'workEmail' },
  { title: 'Sđt', key: 'phone', dataIndex: 'phone' },
  {
    title: 'Ngày sinh',
    key: 'dateOfBirth',
    dataIndex: 'dateOfBirth',
    render: (date) => moment(date).format('DD/MM/YYYY'),
  },
  { title: 'Giới tính', key: 'sex', dataIndex: 'sex', render: (sex) => mapSex[sex] },
  { title: 'Địa chỉ hiện tại', key: 'currentAddress', dataIndex: 'currentAddress' },
  { title: 'Địa chỉ thường trú', key: 'address', dataIndex: 'address' },
  {
    title: 'Thao tác',
    key: 'action',
    fixed: 'right',
    render: ActionRenderer,
  },
];

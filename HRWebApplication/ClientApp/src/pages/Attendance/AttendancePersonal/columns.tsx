import { Tag } from 'antd';
import React from 'react';
import { AttendanceDTO, EmployeeDTO, EmployeeStatus } from 'services/ApiClient';
import { ActionRenderer } from './ActionRenderer';
import { logStatusFilters, logStatusMapPriority, mapLogStatusToTagProps } from './utils';

export const columns = [
  {
    title: 'Trạng thái',
    fixed: 'left',
    key: 'logStatus',
    dataIndex: 'logStatus',
    render: (status: EmployeeStatus, _, index) => (
      <Tag {...mapLogStatusToTagProps[status]} key={index} />
    ),
    filters: logStatusFilters,
    onFilter: (value: EmployeeStatus, record: EmployeeDTO) => record.status === value,
    sorter: (a: AttendanceDTO, b: AttendanceDTO) => {
      return logStatusMapPriority[a.logStatus!] - logStatusMapPriority[b.logStatus!];
    },
    sortDirections: ['ascend', 'descend', 'ascend'],
    defaultSortOrder: 'descend',
    width: 'max-content',
  },
  { title: 'Ngày', key: 'date', dataIndex: 'date', width: 200 },
  { title: 'Số giờ', key: 'duration', dataIndex: 'duration', width: 200 },
  { title: 'Ghi chú', key: 'note', dataIndex: 'note' },
  {
    title: 'Thao tác',
    key: 'action',
    fixed: 'right',
    render: ActionRenderer,
    width: 100,
  },
];

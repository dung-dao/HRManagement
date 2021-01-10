// @ts-nocheck
import { CheckCircleOutlined, MinusCircleOutlined, SyncOutlined } from '@ant-design/icons';
import React from 'react';
import { EmployeeStatus, LogStatus } from 'services/ApiClient';

export const BeautifyEmployeeStatus = {
  Pending: EmployeeStatus.Pending,
  Working: EmployeeStatus.Working,
  Left: EmployeeStatus.Leaved,
} as const;

export const logStatusFilters = [
  { text: 'Đang chờ duyệt', value: LogStatus.Pending },
  { text: 'Đã duyệt', value: LogStatus.Approved },
  { text: 'Đã từ chối', value: LogStatus.Rejected },
] as const;

export const logStatusMapPriority = {
  // the higher value should appear first
  [LogStatus.Pending]: 2,
  [LogStatus.Approved]: 1,
  [LogStatus.Rejected]: 0,
};

export const mapLogStatusToTagProps = {
  [LogStatus.Pending]: {
    color: 'warning',
    icon: <SyncOutlined spin />,
    children: 'Đang chờ duyệt',
  },
  [LogStatus.Approved]: {
    color: 'success',
    icon: <CheckCircleOutlined />,
    children: 'Đã duyệt',
  },
  [LogStatus.Rejected]: {
    color: 'default',
    icon: <MinusCircleOutlined />,
    children: 'Đã từ chối',
  },
};

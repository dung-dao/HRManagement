import { CheckCircleOutlined, MinusCircleOutlined, SyncOutlined } from '@ant-design/icons';
import React from 'react';
import { EmployeeStatus, LogStatus } from 'services/ApiClient';

export const mapWorkingStatusToTag = {
  [EmployeeStatus.Pending]: {
    color: 'warning',
    icon: <SyncOutlined spin />,
    children: 'Chưa làm việc',
  },
  [EmployeeStatus.Working]: {
    color: 'success',
    icon: <CheckCircleOutlined />,
    children: 'Đang làm việc',
  },
  [EmployeeStatus.Leaved]: {
    color: 'default',
    icon: <MinusCircleOutlined />,
    children: 'Ngừng làm việc',
  },
};

export const mapLogStatusToTag = {
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

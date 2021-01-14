import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Button, Popconfirm, Space, Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'routes';
import { EmployeeStatus } from 'services/ApiClient';
import { RecordType, usePage } from './PageProvider';

export const mapProperties = {
  status: {
    [EmployeeStatus.Working]: {
      color: 'success',
      icon: <CheckCircleOutlined />,
      children: 'Đang làm việc',
    },
    [EmployeeStatus.Pending]: {
      color: 'warning',
      icon: <SyncOutlined spin />,
      children: 'Chưa làm việc',
    },
    [EmployeeStatus.Leaved]: {
      color: 'default',
      icon: <MinusCircleOutlined />,
      children: 'Ngừng làm việc',
    },
  },
  sex: {
    Male: 'Nam',
    Female: 'Nữ',
    Other: 'Khác',
  },
} as const;

export const columns: ColumnsType<RecordType> = [
  {
    title: 'Trạng thái',
    fixed: 'left',
    key: 'status',
    dataIndex: 'status',
    render: (value: EmployeeStatus, record: RecordType, index: number) => (
      <Tag {...mapProperties.status[value]} key={index} />
    ),
    filters: Object.entries(mapProperties.status).map(([k, v]) => ({
      text: v.children,
      value: k,
    })),
    // @ts-ignore
    onFilter: (value: EmployeeStatus, record: RecordType) => record.status! === value,
    sorter: (a: RecordType, b: RecordType) => {
      const mapPriority = {
        // the higher value should appear first
        [EmployeeStatus.Working]: 2,
        [EmployeeStatus.Pending]: 1,
        [EmployeeStatus.Leaved]: 0,
      };
      return mapPriority[a.status!] - mapPriority[b.status!];
    },
    sortDirections: ['descend', 'ascend', 'descend'],
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
  { title: 'Giới tính', key: 'sex', dataIndex: 'sex', render: (sex) => mapProperties.sex[sex] },
  { title: 'Địa chỉ hiện tại', key: 'currentAddress', dataIndex: 'currentAddress' },
  { title: 'Địa chỉ thường trú', key: 'address', dataIndex: 'address' },

  {
    title: 'Thao tác',
    key: 'action',
    fixed: 'right',
    align: 'center',
    render: ActionRenderer,
  },
];

function ActionRenderer(value: any, record: RecordType, index: number) {
  const { onDelete } = usePage();

  return (
    <Space size="small">
      <Link to={`${ROUTES.employee}/${record?.id}`}>
        <Tooltip title="Chỉnh sửa">
          <Button size="small" type="primary">
            <EditOutlined />
          </Button>
        </Tooltip>
      </Link>
      <Popconfirm
        placement="right"
        title={'Bạn có chắc muốn xoá?'}
        onConfirm={() => onDelete(record.id!)}
        okText="Đồng ý"
        cancelText="Không"
      >
        <Button title="Xoá" size="small" danger>
          <DeleteOutlined />
        </Button>
      </Popconfirm>
    </Space>
  );
}

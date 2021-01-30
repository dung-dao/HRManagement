// import { ActionRenderer } from './ActionRenderer';
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Popconfirm, Space, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'routes';
import { EmployeeDTO } from 'services/ApiClient';
import { roleLevel } from 'services/AuthService.util';
import { RecordType, usePage } from './PageProvider';

export const mapProperties = {
  role: {
    Admin: 'Admin',
    Manager: 'Quản lý',
    User: 'Nhân viên',
  },
} as const;

export const columns: ColumnsType<RecordType> = [
  {
    key: 'userName',
    title: 'Tài khoản',
    dataIndex: 'userName',
    width: '20%',
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    width: '20%',
  },
  {
    key: 'employee',
    title: 'Nhân viên',
    dataIndex: 'employee',
    render: (value: EmployeeDTO | undefined) => {
      const fullname = (value?.firstName || '') + ' ' + (value?.lastName || '');
      return value ? (
        <Tooltip title={fullname}>
          <Link to={ROUTES.employeeEdit + '/' + value?.id}>{fullname}</Link>
        </Tooltip>
      ) : null;
    },
    width: '20%',
  },
  {
    key: 'role',
    title: 'Quyền',
    dataIndex: 'role',
    width: '20%',
    render: (value) => mapProperties.role[value] || value,
    filters: Object.entries(mapProperties.role).map(([k, v]) => ({
      text: v,
      value: k,
    })),
    onFilter: (value, record: RecordType) => record.role! === value,
    sorter: (a: RecordType, b: RecordType) => {
      return roleLevel[a.role!] - roleLevel[b.role!];
    },
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Thao tác',
    key: 'action',
    fixed: 'right',
    align: 'center',
    width: '20%',
    render: ActionRenderer,
  },
];

function ActionRenderer(value: any, record: RecordType, index: number) {
  const { onDelete, setSelectedRecord, setModalVisibleType } = usePage();

  const menu = (
    <Menu>
      <Menu.Item
        key="2"
        onClick={() => {
          setSelectedRecord(record);
          setModalVisibleType('role');
        }}
      >
        Đổi quyền
      </Menu.Item>
    </Menu>
  );

  return (
    <Space size="small">
      <Dropdown.Button
        trigger={['click']}
        overlay={menu}
        disabled={record.role === 'Admin'}
      ></Dropdown.Button>
      <Popconfirm
        placement="right"
        title={'Bạn có chắc muốn xoá?'}
        onConfirm={() => onDelete(record.id!)}
        okText="Đồng ý"
        cancelText="Không"
        disabled={record.role === 'Admin'}
      >
        <Button title="Xoá" size="small" danger disabled={record.role === 'Admin'}>
          <DeleteOutlined />
        </Button>
      </Popconfirm>
    </Space>
  );
}

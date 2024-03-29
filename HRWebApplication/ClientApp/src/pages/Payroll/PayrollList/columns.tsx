// import { ActionRenderer } from './ActionRenderer';
import {
  CheckCircleOutlined,
  CheckSquareOutlined,
  DeleteOutlined,
  EyeOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Button, Popconfirm, Space, Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'routes';
import { EmployeeDTO, PayRollStatus } from 'services/ApiClient';
import { formatCurrency } from 'utils';
import { RecordType, usePage } from './PageProvider';

export const mapProperties = {
  status: {
    [PayRollStatus.Confirmed]: {
      color: 'success',
      icon: <CheckCircleOutlined />,
      children: 'Đã chốt lương',
    },
    [PayRollStatus.Pending]: {
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
    filters: Object.entries(mapProperties.status).map(([k, v]) => ({
      text: v.children,
      value: k,
    })),
    onFilter: (value, record: RecordType) => record.status! === value,
    sorter: (a: RecordType, b: RecordType) => {
      const mapPriority = {
        // the higher value should appear first
        [PayRollStatus.Pending]: 2,
        [PayRollStatus.Confirmed]: 1,
      };
      return mapPriority[a.status!] - mapPriority[b.status!];
    },
    sortDirections: ['descend', 'ascend'],
    defaultSortOrder: 'descend',
  },
  {
    title: 'Tên',
    key: 'name',
    dataIndex: 'name',
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
    title: 'Ngày tạo',
    key: 'createdAt',
    dataIndex: 'createdAt',
    render: (value) => moment(value).format('DD/MM/YYYY'),
  },
  {
    title: 'Số nhân viên',
    key: 'employeeNo',
    dataIndex: 'employeeNo',
  },
  {
    title: 'Tổng lương',
    key: 'amount',
    dataIndex: 'amount',
    render: (value) => formatCurrency(~~value + ''),
  },
  {
    title: 'Người tạo',
    key: 'author',
    dataIndex: 'author',
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
    title: 'Thao tác',
    key: 'action',
    fixed: 'right',
    align: 'center',
    width: '20%',
    render: ActionRenderer,
  },
];

function ActionRenderer(value: any, record: RecordType, index: number) {
  const { onDelete, onConfirm } = usePage();

  return (
    <Space size="small">
      <Popconfirm
        placement="right"
        title={'Bạn có chắc muốn chốt bảng lương?'}
        onConfirm={() => onConfirm(record.id!)}
        okText="Đồng ý"
        cancelText="Không"
        disabled={record.status === PayRollStatus.Confirmed}
      >
        <Tooltip title="Chốt lương">
          <Button type="primary" size="small" disabled={record.status === PayRollStatus.Confirmed}>
            <CheckSquareOutlined />
          </Button>
        </Tooltip>
      </Popconfirm>

      <Link to={`${ROUTES.payrollEdit}/${record?.id}`}>
        <Tooltip title="Chi tiết">
          <Button type="primary" ghost size="small">
            <EyeOutlined />
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
        <Tooltip title="Xoá">
          <Button size="small" danger>
            <DeleteOutlined />
          </Button>
        </Tooltip>
      </Popconfirm>
    </Space>
  );
}

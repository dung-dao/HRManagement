// import { ActionRenderer } from './ActionRenderer';
import {
  CheckCircleOutlined,
  CheckOutlined,
  CloseOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Button, Popconfirm, Space, Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'routes';
import { EmployeeDTO, LogStatus, TimeOffTypeDTO } from 'services/ApiClient';
import { RecordType, usePage } from './PageProvider';

export const mapProperties = {
  logStatus: {
    [LogStatus.Approved]: {
      color: 'success',
      icon: <CheckCircleOutlined />,
      children: 'Đã duyệt',
    },
    [LogStatus.Pending]: {
      color: 'warning',
      icon: <SyncOutlined spin />,
      children: 'Đang chờ',
    },
    [LogStatus.Rejected]: {
      color: 'default',
      icon: <MinusCircleOutlined />,
      children: 'Đã từ chối',
    },
  },
} as const;

export const columns: ColumnsType<RecordType> = [
  {
    title: 'Trạng thái',
    // fixed: 'left',
    key: 'logStatus',
    dataIndex: 'logStatus',
    render: (value: LogStatus, record: RecordType, index: number) => (
      <Tag {...mapProperties.logStatus[value]} key={index} />
    ),
    filters: Object.entries(mapProperties.logStatus).map(([k, v]) => ({
      text: v.children,
      value: k,
    })),
    // @ts-ignore
    onFilter: (value: LogStatus, record: RecordType) => record.logStatus! === value,
    sorter: (a: RecordType, b: RecordType) => {
      const mapPriority = {
        // the higher value should appear first
        [LogStatus.Pending]: 2,
        [LogStatus.Approved]: 1,
        [LogStatus.Rejected]: 0,
      };
      return mapPriority[a.logStatus!] - mapPriority[b.logStatus!];
    },
    sortDirections: ['descend', 'ascend', 'descend'],
    defaultSortOrder: 'descend',
  },
  {
    key: 'employee',
    title: 'Nhân viên',
    dataIndex: 'employee',
    render: (value: EmployeeDTO) => {
      const fullname = (value?.firstName || '') + ' ' + (value?.lastName || '');
      return (
        <Tooltip title={fullname}>
          <Link to={ROUTES.employeeEdit + '/' + value.id}>{fullname}</Link>
        </Tooltip>
      );
    },
    width: '20%',
  },
  {
    key: 'date',
    title: 'Ngày',
    dataIndex: 'date',
    render: (value: Date) => moment(value).format('DD/MM/YYYY'),
  },
  {
    key: 'duration',
    title: 'Số công',
    dataIndex: 'duration',
  },
  {
    key: 'timeOffType',
    title: 'Loại',
    dataIndex: 'timeOffType',
    render: (value: TimeOffTypeDTO) => value.name,
    width: '20%',
  },
  {
    key: 'note',
    title: 'Ghi chú',
    dataIndex: 'note',
    onCell: () => {
      return {
        style: {
          whiteSpace: 'nowrap',
          maxWidth: 150,
        },
      };
    },
    render: (text) => (
      <Tooltip title={text}>
        <div style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</div>
      </Tooltip>
    ),
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
  const { onApprove, onReject } = usePage();

  return (
    <Space size="small">
      <Popconfirm
        placement="right"
        title={'Phê duyệt'}
        onConfirm={() => onApprove(record.id!)}
        okText="Đồng ý"
        cancelText="Không"
        disabled={record.logStatus !== LogStatus.Pending}
      >
        <Button
          title="Phê duyệt"
          size="small"
          type="primary"
          disabled={record.logStatus !== LogStatus.Pending}
        >
          <CheckOutlined />
        </Button>
      </Popconfirm>
      <Popconfirm
        placement="right"
        title={'Từ chối'}
        onConfirm={() => onReject(record.id!)}
        okText="Đồng ý"
        cancelText="Không"
        disabled={record.logStatus !== LogStatus.Pending}
      >
        <Button
          title="Từ chối"
          size="small"
          disabled={record.logStatus !== LogStatus.Pending}
          danger
        >
          <CloseOutlined />
        </Button>
      </Popconfirm>
    </Space>
  );
}

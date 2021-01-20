// import { ActionRenderer } from './ActionRenderer';
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Button, Popconfirm, Space, Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { RecordType, usePage } from './PageProvider';
import { LogStatus, TimeOffTypeDTO } from 'services/ApiClient';
import moment from 'moment';

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
    fixed: 'left',
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
    key: 'date',
    title: 'Ngày',
    dataIndex: 'date',
    render: (value: Date) => moment(value).format('DD/MM/YYYY'),
    width: '20%',
  },
  {
    key: 'duration',
    title: 'Số ngày công',
    dataIndex: 'duration',
    width: '15%',
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
  const { onDelete, setSelectedRecord, setModalVisibleType } = usePage();

  return (
    <Space size="small">
      <Button
        title="Chỉnh sửa"
        size="small"
        type="primary"
        onClick={() => {
          setSelectedRecord(record);
          setModalVisibleType('update');
        }}
        disabled={record.logStatus !== LogStatus.Pending}
      >
        <EditOutlined />
      </Button>
      <Popconfirm
        placement="right"
        title={'Bạn có chắc muốn xoá?'}
        onConfirm={() => onDelete(record.id!)}
        okText="Đồng ý"
        cancelText="Không"
        disabled={record.logStatus !== LogStatus.Pending}
      >
        <Button title="Xoá" size="small" danger disabled={record.logStatus !== LogStatus.Pending}>
          <DeleteOutlined />
        </Button>
      </Popconfirm>
    </Space>
  );
}

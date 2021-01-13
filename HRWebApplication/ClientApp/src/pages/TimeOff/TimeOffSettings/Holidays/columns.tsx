// import { ActionRenderer } from './ActionRenderer';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import React from 'react';
import { usePage } from './PageProvider';
import { RecordType } from './PageProvider';

export const mapProperties = {} as const;

export const columns: ColumnsType<RecordType> = [
  {
    key: 'name',
    title: 'Tên',
    dataIndex: 'name',
  },
  {
    key: 'from',
    title: 'Từ ngày',
    dataIndex: 'from',
    render: (value: Date) => moment(value).format('DD/MM'),
    width: '25%',
  },
  {
    key: 'to',
    title: 'Đến ngày',
    dataIndex: 'to',
    render: (value: Date) => moment(value).format('DD/MM'),
    width: '25%',
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
      >
        <EditOutlined />
      </Button>
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

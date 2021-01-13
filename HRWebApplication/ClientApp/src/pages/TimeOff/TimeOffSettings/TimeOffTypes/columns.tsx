// import { ActionRenderer } from './ActionRenderer';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { AccrualFrequency } from 'services/ApiClient';
import { usePage } from './PageProvider';
import { RecordType } from './PageProvider';

export const mapProperties = {
  isPaidTimeOff: {
    true: 'Có',
    false: 'Không',
  },
  frequency: {
    [AccrualFrequency.Monthly]: 'Hàng tháng',
    [AccrualFrequency.Yearly]: 'Hàng năm',
  },
} as const;

export const columns: ColumnsType<RecordType> = [
  {
    key: 'name',
    title: 'Tên',
    dataIndex: 'name',
  },
  {
    key: 'isPaidTimeOff',
    title: 'Có trả lương',
    dataIndex: 'isPaidTimeOff',
    render: (value: boolean) => mapProperties.isPaidTimeOff[String(value)],
  },
  {
    key: 'frequency',
    title: 'Chu kỳ',
    dataIndex: 'frequency',
    render: (value: string) => mapProperties.frequency[value],
  },
  {
    key: 'maximumCarryOver',
    title: 'Tích luỹ',
    dataIndex: 'maximumCarryOver',
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

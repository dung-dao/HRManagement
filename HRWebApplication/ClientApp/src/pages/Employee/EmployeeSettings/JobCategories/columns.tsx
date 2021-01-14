// import { ActionRenderer } from './ActionRenderer';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';
import { usePage } from './PageProvider';
import { RecordType } from './PageProvider';

export const mapProperties = {} as const;

export const columns: ColumnsType<RecordType> = [
  {
    key: 'name',
    title: 'Tên',
    dataIndex: 'name',
    width: '25%',
  },
  {
    key: 'description',
    title: 'Mô tả',
    dataIndex: 'description',
    // Add ellipsis option to table cell antd: https://github.com/ant-design/ant-design/issues/5753#issuecomment-457319869
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

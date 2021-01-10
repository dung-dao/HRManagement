import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Tooltip } from 'antd';
import React from 'react';
import { usePage } from './PageProvider';

export function ActionRenderer(text, record) {
  const { onDelete } = usePage();
  const disabled = !!Math.round(Math.random());
  return (
    <Space size="small">
      <Popconfirm
        placement="right"
        title={'Bạn có chắc muốn xoá nhân viên này?'}
        onConfirm={() => onDelete(record?.id)}
        okText="Đồng ý"
        cancelText="Không"
        disabled={disabled}
      >
        <Tooltip title="Xoá">
          <Button size="small" danger disabled={disabled}>
            <DeleteOutlined />
          </Button>
        </Tooltip>
      </Popconfirm>
    </Space>
  );
}

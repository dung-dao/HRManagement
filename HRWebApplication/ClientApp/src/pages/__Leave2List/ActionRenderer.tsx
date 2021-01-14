import React from 'react';
import { usePage } from './PageProvider';
import { Button, message, Popconfirm, Space } from 'antd';
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const SuccessButton = styled.div`
  .ant-btn-primary {
    background-color: #42b263;
    border: none;
  }
`;

const ActionButton = styled.div`
  button {
    width: 100%;
  }
`;

let count = 0;

export function ActionRenderer(text, record) {
  const { setModalVisible, setModalType, setRecord, api, data, setData } = usePage();
  const onDelete = async () => {
    try {
      await api.leaveType_Delete(record.id);
      message.info(`Xoá danh sách nghỉ phép ${record.name} thành công`);
      setData(data.filter((d) => d.id !== record.id));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Space size="small" align="end">
      <Button
        title="Chỉnh sửa trực tiếp"
        size="small"
        type="primary"
        onClick={() => {
          setModalVisible(true);
          setRecord(record);
          setModalType('edit');
        }}
      >
        <EditOutlined />
      </Button>
      <Popconfirm
        placement="right"
        title={'Bạn có chắc muốn xoá danh sách nghỉ phép này?'}
        onConfirm={onDelete}
        okText="Đồng ý"
        cancelText="Không"
      >
        <Button title="Xoá" size="small" danger>
          <DeleteOutlined />
        </Button>
      </Popconfirm>
      <Popconfirm
        placement="right"
        title={'Bạn có chắc muốn xoá danh sách nghỉ phép này?'}
        onConfirm={onDelete}
        okText="Đồng ý"
        cancelText="Không"
      >
        {count++ % 2 ? (
          <ActionButton>
            <Button type="primary" size="small">
              PHÊ DUYỆT
            </Button>
          </ActionButton>
        ) : (
          <ActionButton>
            <Button size="small" danger>
              TỪ CHỐI
            </Button>
          </ActionButton>
        )}
      </Popconfirm>
    </Space>
  );
}

import { CarryOutOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Space, Tooltip } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'routes';
import { usePage } from './PageProvider';
import { BeautifyEmployeeStatus } from './utils';

export function ActionRenderer(text, record) {
  const { setModalVisible, setModalType, setRecord, api, data, setData } = usePage();
  const onDelete = async () => {
    try {
      await api.leaveType_Delete(record.id);
      message.info(`Xoá loại nghỉ phép ${record.name} thành công`);
      setData(data.filter((d) => d.id !== record.id));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Space size="small">
      <Tooltip title="Nghỉ phép">
        <Button
          size="small"
          disabled={record.status !== BeautifyEmployeeStatus.Working}
          type="dashed"
          onClick={() => console.log('open popup nghi phep')}
        >
          <CarryOutOutlined />
        </Button>
      </Tooltip>
      <Link to={`${ROUTES.employee}/${record?.id}`}>
        <Tooltip title="Chỉnh sửa">
          <Button size="small" type="primary">
            <EditOutlined />
          </Button>
        </Tooltip>
      </Link>
      <Popconfirm
        placement="right"
        title={'Bạn có chắc muốn xoá nhân viên này?'}
        onConfirm={() => console.log('onDeleteEmployee(record?.id)')}
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

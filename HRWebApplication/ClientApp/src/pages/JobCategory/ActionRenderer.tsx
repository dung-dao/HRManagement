import React from 'react';
import {Button, message, Popconfirm, Space} from "antd";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import {usePage} from "./PageProvider";

export function ActionRenderer(text, record) {
  const {setModalVisible,setModalType, setRecord, api, data, setData} = usePage()
  const onDelete = async () => {
    try {
      await api.jobCategory_Delete(record.id)
      message.info(`Xoá loại hình nhân sự ${record.name} thành công`);
      setData(data.filter(d => d.id !== record.id))
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Space size="small">
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
        <EditOutlined/>
      </Button>
      <Popconfirm
        placement="right"
        title={'Bạn có chắc muốn xoá loại hình nhân sự này?'}
        onConfirm={onDelete}
        okText="Đồng ý"
        cancelText="Không"
      >
        <Button title="Xoá" size="small" danger>
          <DeleteOutlined/>
        </Button>
      </Popconfirm>
      <Button
        title="Thêm mới loại hình nhân sự"
        size="small"
        type="primary"
        onClick={() => {
          setModalVisible(true);
          setModalType('add');
        }}
      >
        <PlusOutlined/>
      </Button>
    </Space>
  );
}

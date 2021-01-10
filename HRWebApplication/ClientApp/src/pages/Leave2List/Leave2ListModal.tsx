import React from 'react';
import { Form, Input, message, Modal } from 'antd';
import { TimeOffDTO } from 'services/ApiClient';
import { usePage } from './PageProvider';

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const title = {
  edit: 'Chỉnh sửa danh sách nghỉ phép',
  add: 'Thêm mới danh sách nghỉ phép',
};

export function Leave2ListModal() {
  const [form] = Form.useForm<TimeOffDTO>();
  const { modalVisible, setModalVisible, modalType, record, api, data, setData } = usePage();
  const initialValues = modalType === 'edit' ? record : undefined;
  const [loading, setLoading] = React.useState(false);
  const onSubmit = async () => {
    try {
      const values = (await form.validateFields()) as TimeOffDTO;
      setLoading(true);

      if (modalType === 'add') {
        const result = await api.leaveType_Create(values);
        message.info(`Thêm mới danh sách nghỉ phép ${values.name} thành công`);
        setData([...data, result]);
      }
      if (modalType === 'edit') {
        values.id = record?.id!;
        await api.leaveType_Update(values.id, values);
        const newData = await api.leaveType_GetAll();
        message.info(`Chỉnh sửa danh sách nghỉ phép ${values?.name} thành công`);
        setData(newData);
      }

      setModalVisible(false);
      setLoading(false);
      form.resetFields();
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    if (modalVisible) {
      const id = data.length + 1;
      form.setFieldsValue(initialValues ?? { id });
    }
  }, [data.length, form, initialValues, modalVisible]);

  return (
    <Modal
      title={title[modalType]}
      visible={modalVisible}
      centered
      okButtonProps={{
        htmlType: 'submit',
      }}
      onOk={onSubmit}
      onCancel={() => setModalVisible(false)}
      confirmLoading={loading}
      destroyOnClose
    >
      <Form {...formLayout} form={form} preserve={false} onFinish={(values) => console.log(values)}>
        <Form.Item
          name="name"
          label="Tên danh sách nghỉ phép"
          rules={[{ required: true, message: 'Tên danh sách nghỉ phép không được bỏ trống' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: 'Mô tả danh sách nghỉ phép không được bỏ trống' }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}

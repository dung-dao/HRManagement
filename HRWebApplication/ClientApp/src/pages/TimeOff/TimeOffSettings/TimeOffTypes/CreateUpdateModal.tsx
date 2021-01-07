import { Form, Input, Modal } from 'antd';
import React from 'react';
import { required } from 'utils';
import { usePage } from './PageProvider';

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const actionVietnamese = {
  create: 'Tạo',
  update: 'Chỉnh sửa',
};

const noun = 'loại nghỉ phép';

export function CreateUpdateModal() {
  const { modalVisibleType, setModalVisibleType, selectedRecord, onUpdate, onCreate } = usePage();

  const [form] = Form.useForm();

  const VerbNoun = actionVietnamese[modalVisibleType] + ' ' + noun;

  const onSubmit = async (values) => {
    const record = {
      ...selectedRecord,
      ...values,
    };
    
    try {
      if (modalVisibleType === 'update') {
        await onUpdate(record);
      } else if (modalVisibleType === 'create') {
        await onCreate(record);
      }
      setModalVisibleType('hidden');
    } catch (err) {
      console.error(err);
    }
  };

  const initialValues = modalVisibleType === 'update' ? selectedRecord : undefined;

  // Form.initialValues doesn't work really well so we need this useEffect
  React.useEffect(() => {
    if (modalVisibleType === 'update') {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [modalVisibleType]);

  return (
    <Modal
      title={VerbNoun}
      visible={modalVisibleType !== 'hidden'}
      centered
      okButtonProps={{
        htmlType: 'submit',
        form: 'create-update-form',
      }}
      onCancel={() => setModalVisibleType('hidden')}
      width={600}
    >
      <Form
        {...formLayout}
        id="create-update-form"
        form={form}
        preserve={false}
        labelAlign="left"
        onFinish={onSubmit}
        // initialValues={initialValues}
      >
        <Form.Item name="name" label="Tên loại nghỉ phép" rules={[required('Tên loại nghỉ phép')]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Mô tả">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}

import { Form, Input, Modal } from 'antd';
import React from 'react';
import { required } from 'utils';
import { usePage, RecordType } from './PageProvider';

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
} as const;

const actionVietnamese = {
  create: 'Tạo',
  update: 'Chỉnh sửa',
} as const;

const noun = 'loại nghỉ phép' as const;

export const CreateUpdateModal: React.FC<{}> = () => {
  const { modalVisibleType, setModalVisibleType, selectedRecord, onUpdate, onCreate } = usePage();

  const [form] = Form.useForm<RecordType>();

  const VerbNoun = actionVietnamese[modalVisibleType] + ' ' + noun;

  const onSubmit = async (values: RecordType) => {
    const record = {
      ...selectedRecord,
      ...values,
    } as RecordType;

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

  const initialValues = React.useMemo(
    () => (modalVisibleType === 'update' ? selectedRecord : undefined),
    [modalVisibleType, selectedRecord],
  );

  // Form.initialValues doesn't work really well so we need this useEffect
  React.useEffect(() => {
    if (modalVisibleType === 'update') {
      form.setFieldsValue(initialValues!);
    } else {
      form.resetFields();
    }
  }, [modalVisibleType, initialValues, form]);

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
};

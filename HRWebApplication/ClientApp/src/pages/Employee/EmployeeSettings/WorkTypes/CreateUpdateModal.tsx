import { Form, Input, Modal } from 'antd';
import React from 'react';
import { required } from 'utils';
import { RecordType, usePage } from './PageProvider';

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
} as const;

const actionVietnamese = {
  create: 'Tạo',
  update: 'Chỉnh sửa',
} as const;

const noun = 'loại công việc' as const;

export const CreateUpdateModal: React.FC<{}> = () => {
  const { modalVisibleType, setModalVisibleType, selectedRecord, onUpdate, onCreate } = usePage();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [form] = Form.useForm<RecordType>();

  const VerbNoun = actionVietnamese[modalVisibleType] + ' ' + noun;

  const onSubmit = async (values: RecordType) => {
    try {
      setIsSubmitting(true);
      if (modalVisibleType === 'update') {
        await onUpdate(values);
      } else if (modalVisibleType === 'create') {
        await onCreate(values);
      }
      setModalVisibleType('hidden');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
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
      confirmLoading={isSubmitting}
    >
      <Form<RecordType>
        {...formLayout}
        id="create-update-form"
        form={form}
        preserve={false}
        labelAlign="left"
        onFinish={onSubmit}
        // initialValues={initialValues}
      >
        <Form.Item
          name="name"
          label="Tên loại công việc"
          rules={[required('Tên loại công việc')]}
        >
          <Input placeholder="vd: full-time, part-time" />
        </Form.Item>
        <Form.Item name="description" label="Mô tả">
          <Input.TextArea placeholder="Mô tả" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

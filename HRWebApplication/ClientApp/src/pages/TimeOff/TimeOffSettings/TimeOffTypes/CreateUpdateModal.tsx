import { Checkbox, Form, Input, InputNumber, Modal, Select } from 'antd';
import React from 'react';
import { required } from 'utils';
import { usePage, RecordType } from './PageProvider';
import { mapProperties } from './columns';

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
          <Input placeholder="vd: Nghỉ thai sản" />
        </Form.Item>
        <Form.Item name="isPaidTimeOff" label="Có trả lương" valuePropName="checked">
          <Checkbox defaultChecked={false} />
        </Form.Item>
        <Form.Item name="frequency" label="Chu kỳ" rules={[required('Chu kỳ')]}>
          <Select placeholder="Chọn">
            {Object.entries(mapProperties.frequency).map(([k, v]) => (
              <Select.Option key={k} value={k}>
                {v}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="maximumCarryOver"
          label="Tích luỹ"
          rules={[required('Tích luỹ')]}
          tooltip="Số ngày nghỉ được tính tích luỹ sang chu kỳ sau (nếu còn dư ở chu kỳ trước)"
        >
          <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

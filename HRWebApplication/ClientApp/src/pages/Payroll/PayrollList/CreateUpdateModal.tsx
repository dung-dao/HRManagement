import { DatePicker, Form, Modal } from 'antd';
import moment from 'moment';
import React from 'react';
import { required } from 'utils';
import { usePage } from './PageProvider';

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
} as const;

type FormType = {
  time: [moment.Moment, moment.Moment];
};

export const CreateUpdateModal: React.FC<{}> = () => {
  const { modalVisibleType, setModalVisibleType, onCreate } = usePage();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [form] = Form.useForm<FormType>();

  const onSubmit = async ({ time }: FormType) => {
    try {
      setIsSubmitting(true);
      await onCreate(time[0].toDate(), time[1].toDate());
      setModalVisibleType('hidden');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      title="Tạo phiếu lương"
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
      <Form<FormType>
        {...formLayout}
        id="create-update-form"
        form={form}
        preserve={false}
        labelAlign="left"
        onFinish={onSubmit}
        // initialValues={initialValues}
      >
        <Form.Item
          name="time"
          label="Thời gian"
          rules={[required('Thời gian')]}
          initialValue={[moment().subtract(1, 'months'), moment()]}
        >
          <DatePicker.RangePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

import { DatePicker, Form, Input, message, Modal } from 'antd';
import moment from 'moment';
import React from 'react';
import { momentToDate, required } from 'utils';
import { usePage } from './PageProvider';
import { AttendanceDTO } from 'services/ApiClient';
import { apiAttendance } from 'services/ApiClient.singleton';

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const initialValues = {
  date: moment(),
  duration: 8,
  note: '',
} as const;

export function ModalNew() {
  const { isModalNewVisible, setIsModalNewVisible } = usePage();
  const [form] = Form.useForm();

  const onSubmit = async (values) => {
    try {
      const newAttendceRecord = await apiAttendance.postMyAttendance(
        momentToDate(values) as AttendanceDTO,
      );
      message.info('Thêm chấm công thành công');
      setIsModalNewVisible(false);
    } catch (err) {
      if (err.isApiException) {
        message.error('Thêm chấm công không thành công');
      }
    }
  };

  // Form.initialValues doesn't work really well so we need this useEffect
  React.useEffect(() => {
    // when modal is closed, reset the fields value of the form
    // we reset the value on CLOSED instead of OPEN
    // we MUST USE setTimeout-0 along with the reseting code, to avoid flashing value changes in the UI
    if (!isModalNewVisible) {
      setTimeout(() => {
        form.setFieldsValue(initialValues);
      }, 0);
    }
  }, [isModalNewVisible]);

  return (
    <Modal
      title={'Thêm chấm công'}
      visible={isModalNewVisible}
      centered
      okButtonProps={{
        htmlType: 'submit',
        form: 'new-form',
      }}
      onCancel={() => setIsModalNewVisible(false)}
      width={600}
    >
      <Form
        {...formLayout}
        id="new-form"
        form={form}
        preserve={false}
        labelAlign="left"
        onFinish={onSubmit}
        // initialValues={initialValues}
      >
        <Form.Item label="Ngày" rules={[required('Ngày')]} name={['date']}>
          <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item label="Số giờ" rules={[required('Số giờ')]} name={['duration']}>
          <Input />
        </Form.Item>
        <Form.Item label="Ghi chú" name={['note']}>
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}

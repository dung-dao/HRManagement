import { Form, Input, Modal, message } from 'antd';
import React from 'react';
import { apiUsers } from 'services/ApiClient.singleton';

type Props = {
  visible: boolean;
  setVisible: (boolean) => void;
};

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const ChangeMyPasswordModal: React.FC<Props> = (props) => {
  const { visible, setVisible } = props;
  const [form] = Form.useForm();

  const onSubmit = async () => {
    try {
      const { currentPassword, newPassword } = form.getFieldsValue();
      await apiUsers.changePassword(currentPassword, newPassword);
      message.info('Đổi mật khẩu thành công');
      setVisible(false);
    } catch (err) {
      if (err.isApiException) {
        message.error('Đổi mật khẩu không thành công');
      }
    }
  };

  return (
    <Modal
      title={'Đổi mật khẩu'}
      visible={visible}
      centered
      okButtonProps={{
        htmlType: 'submit',
        form: 'change-password-form',
      }}
      onCancel={() => setVisible(false)}
      width={600}
      destroyOnClose
    >
      <Form
        {...formLayout}
        id="change-password-form"
        form={form}
        preserve={false}
        labelAlign="left"
        onFinish={onSubmit}
      >
        <Form.Item
          name="currentPassword"
          label="Mật khẩu hiện tại"
          rules={[
            { required: true, message: 'Mật khẩu hiện tại không được bỏ trống' },
            { min: 6, message: 'Mật khẩu phải dài ít nhất 6 ký tự' },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="Mật khẩu mới"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Mật khẩu hiện tại không được bỏ trống' },
            { min: 6, message: 'Mật khẩu phải dài ít nhất 6 ký tự' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (value && getFieldValue('currentPassword') === value) {
                  return Promise.reject('Mật khẩu mới không được giống mật khẩu cũ');
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Nhập lại mật khẩu mới"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Mật khẩu hiện tại không được bỏ trống' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('Nhập lại mật khẩu mới không khớp');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

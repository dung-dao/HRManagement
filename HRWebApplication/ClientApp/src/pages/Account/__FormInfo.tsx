import { Button, Col, DatePicker, Form, Input, message, Row, Select, Skeleton } from 'antd';
import { phoneRegex, required } from 'pages/Employee/EmployeeDetail/utils';
import React from 'react';
import { UserDTO } from 'services/ApiClient';
import { ChangeMyPasswordModal } from 'components';
import { usePage } from './__PageProvider';
import { formItemLayout } from 'utils';

export function FormInfo() {
  const { apiUsers, user, userReady } = usePage();
  const [form] = Form.useForm<UserDTO>();
  const [passwordModalVisible, setPasswordModalVisible] = React.useState(false);
  const [profileSubmitting, setProfileSubmitting] = React.useState(false);

  if (!userReady) return <Skeleton />;

  const onSubmitProfile = async () => {
    try {
      setProfileSubmitting(true);
      const profileUpdate = form.getFieldsValue().employee!;
      await apiUsers.updateProfile(profileUpdate);
      message.info('Cập nhật thông tin thành công');
    } catch {
      message.error('Không thể cập nhật thông tin');
    } finally {
      setProfileSubmitting(false);
    }
  };

  return (
    <div>
      <Form form={form} onFinish={onSubmitProfile} initialValues={user} labelAlign="left">
        <Row gutter={40}>
          <Col span={12}>
            <fieldset>
              <legend>Thông tin tài khoản:</legend>
              <Form.Item {...formItemLayout} label="Tài khoản" name="userName">
                <Input placeholder="admin" readOnly />
              </Form.Item>
              <Form.Item {...formItemLayout} label="Email" name="email">
                <Input placeholder="admin@company.com" readOnly />
              </Form.Item>
              <Form.Item {...formItemLayout} label="Mật khẩu" name="password">
                <Button onClick={() => setPasswordModalVisible(true)}>Đổi mật khẩu</Button>
              </Form.Item>
            </fieldset>
          </Col>
        </Row>
        {user?.employee ? (
          <>
            <Row gutter={40}>
              <Col span={12}>
                <fieldset>
                  <legend>Thông tin cá nhân:</legend>
                  <Form.Item
                    {...formItemLayout}
                    label="ID"
                    hidden
                    name={['employee', 'id']}
                    rules={[required('Họ')]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label="Họ"
                    name={['employee', 'firstName']}
                    rules={[required('Họ')]}
                  >
                    <Input placeholder="Nguyễn" />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label="Tên"
                    name={['employee', 'lastName']}
                    rules={[required('Tên')]}
                  >
                    <Input placeholder="Văn A" />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label="Ngày sinh"
                    name={['employee', 'dateOfBirth']}
                    rules={[required('Ngày sinh')]}
                  >
                    <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label="Giới tính"
                    name={['employee', 'sex']}
                    rules={[required('Giới tính')]}
                  >
                    <Select placeholder="Chọn giới tính">
                      <Select.Option value="Male">Nam</Select.Option>
                      <Select.Option value="Female">Nữ</Select.Option>
                      <Select.Option value="Other">Khác</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label="CMND"
                    name={['employee', 'nationalId']}
                    rules={[
                      required('CMND'),
                      {
                        validator: (_, value: string) =>
                          value === '' ||
                          value === undefined || // "required" rule is already handled by above rule, so we will ignore this case to avoid 2 annoying messages
                          (value &&
                            /^\d+$/.test(value) &&
                            (value.length === 9 || value.length === 12))
                            ? Promise.resolve()
                            : Promise.reject('CMND phải có 9 hoặc 12 chữ số'),
                        validateTrigger: 'onBlur',
                      },
                    ]}
                  >
                    <Input placeholder="123456789" />
                  </Form.Item>
                </fieldset>
              </Col>
              <Col span={12}>
                <fieldset>
                  <legend>Thông tin liên lạc:</legend>
                  <Form.Item
                    {...formItemLayout}
                    label="Email cá nhân"
                    name={['employee', 'personalEmail']}
                    rules={[
                      required('Email cá nhân'),
                      { type: 'email', message: 'Địa chỉ email không đúng định dạng' },
                    ]}
                  >
                    <Input placeholder="nguyenvana@gmail.com" type="email" />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label="Email công việc"
                    name={['employee', 'workEmail']}
                    rules={[
                      required('Email công việc'),
                      { type: 'email', message: 'Địa chỉ email không đúng định dạng' },
                    ]}
                  >
                    <Input placeholder="nguyenvana@gmail.com" type="email" />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label="Địa chỉ hiện tại"
                    name={['employee', 'currentAddress']}
                    rules={[required('Địa chỉ')]}
                  >
                    <Input placeholder="147/40D Tân Lập 2, Hiệp Phú, Quận 9, TPHCM" />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label="Địa chỉ thường trú"
                    name={['employee', 'address']}
                    rules={[required('Địa chỉ')]}
                  >
                    <Input placeholder="147/40D Tân Lập 2, Hiệp Phú, Quận 9, TPHCM" />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label="Số điện thoại"
                    name={['employee', 'phone']}
                    rules={[
                      required('Số điện thoại'),
                      {
                        pattern: phoneRegex,
                        min: 9,
                        max: 12,
                        message: 'Số điện thoại phải bắt dầu bằng (0|84|+84) và theo sau 9 chữ số`',
                      },
                    ]}
                  >
                    <Input placeholder="0123456789" />
                  </Form.Item>
                </fieldset>
              </Col>
            </Row>
            <div style={{ display: 'flex', justifyContent: 'flex-end', columnGap: 10 }}>
              <Button type="primary" htmlType="submit" loading={profileSubmitting}>
                Cập nhật thông tin
              </Button>
            </div>
          </>
        ) : null}
      </Form>
      <ChangeMyPasswordModal visible={passwordModalVisible} setVisible={setPasswordModalVisible} />
    </div>
  );
}

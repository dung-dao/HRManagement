import { Button, Col, Form, Input, Row, Select, Skeleton } from 'antd';
import React from 'react';
import { UserDTO } from 'services/ApiClient';
import { ChangeMyPasswordModal } from './ChangeMyPasswordModal';
import { formItemLayout, required } from 'utils';
import { StandardFormProps } from 'components';

type FormDataType = UserDTO;
type Props = StandardFormProps<FormDataType>;

export const AccountForm: React.FC<Props> = (props) => {
  const { data, dataReady, type, onSubmit, actionButtons, displayLegend, ...rest } = props;
  const [form] = Form.useForm<FormDataType>();
  const [passwordModalVisible, setPasswordModalVisible] = React.useState(false);

  if (type !== 'create' && dataReady && !data) return <h2>Không có dữ liệu</h2>;
  if (type !== 'create' && !dataReady) return <Skeleton />;

  const initialValues = type === 'create' ? undefined : data;

  return (
    <div>
      <Form<FormDataType>
        form={form}
        initialValues={initialValues}
        labelAlign="left"
        name="account-form"
        id="account-form"
        onFinish={(formData) => onSubmit?.({ ...data, ...formData } as FormDataType)}
        {...formItemLayout}
        {...rest}
      >
        <Row gutter={40}>
          <Col span={12}>
            <fieldset>
              {displayLegend ? <legend>Thông tin tài khoản:</legend> : null}
              <Form.Item
                label="Tài khoản"
                name="userName"
                rules={type !== 'read-only' ? [required('Tài khoản')] : undefined}
              >
                <Input placeholder="user001" readOnly={type !== 'create'} />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={
                  type !== 'read-only'
                    ? [
                        { required: true, message: 'Vui lòng nhập email' },
                        { type: 'email', message: 'Email không đúng định dạng' },
                      ]
                    : undefined
                }
              >
                <Input placeholder="Email" readOnly={type !== 'create'} />
              </Form.Item>
              {type === 'create' ? (
                <>
                  <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                      { required: true, message: 'Mật khẩu hiện tại không được bỏ trống' },
                      { min: 6, message: 'Mật khẩu phải dài ít nhất 6 ký tự' },
                    ]}
                  >
                    <Input.Password placeholder="password" />
                  </Form.Item>
                  <Form.Item
                    label="Nhập lại mật khẩu"
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                      { required: true, message: 'Mật khẩu hiện tại không được bỏ trống' },
                      ({ getFieldValue }) => ({
                        validator(rule, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject('Nhập lại mật khẩu không khớp');
                        },
                      }),
                    ]}
                  >
                    <Input.Password placeholder="password" />
                  </Form.Item>
                  <Form.Item label="Quyền" name="role" rules={[required('Quyền')]}>
                    <Select placeholder="Chọn quyền">
                      <Select.Option value="Manager">Quản lý</Select.Option>
                      <Select.Option value="User">Nhân viên</Select.Option>
                    </Select>
                  </Form.Item>
                </>
              ) : (
                <Form.Item label="Mật khẩu" name="password">
                  <Button
                    onClick={() => setPasswordModalVisible(true)}
                    disabled={type === 'read-only'}
                  >
                    Đổi mật khẩu
                  </Button>
                </Form.Item>
              )}
            </fieldset>
          </Col>
        </Row>
        {actionButtons}
      </Form>
      <ChangeMyPasswordModal visible={passwordModalVisible} setVisible={setPasswordModalVisible} />
    </div>
  );
};

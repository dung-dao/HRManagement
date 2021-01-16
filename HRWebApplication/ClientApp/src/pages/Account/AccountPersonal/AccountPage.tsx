import { Button, Col, Form, Input, Row, Skeleton } from 'antd';
import React from 'react';
import { UserDTO } from 'services/ApiClient';
import { ChangeMyPasswordModal } from 'components/ChangeMyPasswordModal';
import { formItemLayout } from 'utils';

type Props = {
  user: UserDTO | undefined;
  userReady: boolean;
};

export const AccountPage: React.FC<Props> = (props) => {
  const { user, userReady } = props;
  const [form] = Form.useForm<UserDTO>();
  const [passwordModalVisible, setPasswordModalVisible] = React.useState(false);

  if (userReady && !user) return <h2>Không có dữ liệu về nhân viên</h2>;
  if (!userReady) return <Skeleton />;

  return (
    <div>
      <Form<UserDTO> form={form} initialValues={user} labelAlign="left">
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
      </Form>
      <ChangeMyPasswordModal visible={passwordModalVisible} setVisible={setPasswordModalVisible} />
    </div>
  );
};

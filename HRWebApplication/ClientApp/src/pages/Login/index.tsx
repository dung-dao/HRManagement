import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Tabs, Row, Col, Card, Divider } from 'antd';
import Container from './style';
import {
  UserOutlined,
  LockOutlined,
  SendOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import authService from 'services/AuthService';
import { message } from 'antd';
import { LoginDTO } from 'services/ApiClient';
import { useTry } from 'hooks';

type LoginForm = LoginDTO & {
  remember: boolean;
};

export default function () {
  const history = useHistory();
  const [loginForm] = Form.useForm<LoginForm>();
  const { $try: trySignIn, isPending } = useTry(() =>
    authService.signIn(loginForm.getFieldsValue() as LoginDTO),
  );

  async function onLogin() {
    try {
      await trySignIn();
      history.push('/employees');
    } catch (error) {
      message.error('Đăng nhập không thành công');
    }
  }

  return (
    <Container>
      <Row justify="center">
        <Col span={8} className="login-wrapper">
          <Card className="login-card">
            <Card.Meta
              description={
                <Tabs type="card" style={{ minHeight: 290 }}>
                  <Tabs.TabPane tab="Đăng nhập" key="1">
                    <Form form={loginForm} onFinish={onLogin}>
                      <Form.Item
                        name="userName"
                        rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản' }]}
                      >
                        <Input prefix={<UserOutlined />} placeholder="Tên tài khoản" />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                      >
                        <Input.Password
                          prefix={<LockOutlined />}
                          type="password"
                          placeholder="Mật khẩu"
                        />
                      </Form.Item>
                      <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                          <Checkbox>Nhớ đăng nhập</Checkbox>
                        </Form.Item>
                      </Form.Item>
                      <Form.Item>
                        <Button
                          block
                          type="primary"
                          size="large"
                          htmlType="submit"
                          loading={isPending}
                        >
                          {'ĐĂNG NHẬP'}
                        </Button>
                      </Form.Item>
                    </Form>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Đăng ký" key="2">
                    <Form name="login" initialValues={{ remember: true }}>
                      <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản' }]}
                      >
                        <Input prefix={<UserOutlined />} placeholder="Tên tài khoản" />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                      >
                        <Input.Password
                          prefix={<LockOutlined />}
                          type="password"
                          placeholder="Mật khẩu"
                        />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                      >
                        <Input
                          prefix={<LockOutlined />}
                          type="password"
                          placeholder="Nhập lại mật khẩu"
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button block type="primary" size="large" onClick={onLogin}>
                          ĐĂNG KÝ
                        </Button>
                      </Form.Item>
                    </Form>
                  </Tabs.TabPane>
                </Tabs>
              }
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

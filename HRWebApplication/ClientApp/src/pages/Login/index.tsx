import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Col, Form, Input, message, Row, Tabs } from 'antd';
import { useTry } from 'hooks';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { LoginDTO, UserDTO } from 'services/ApiClient';
import authService from 'services/AuthService';
import { returnRoute } from 'services/AuthService.util';
import Container from './style';

type LoginForm = LoginDTO & {
  remember: boolean;
};

type SignUpForm = LoginDTO & {
  confirmPassword: string;
};

type TabName = 'signin' | 'signup';

export function LoginPage() {
  const history = useHistory();
  const [loginForm] = Form.useForm<LoginForm>();
  const [signUpForm] = Form.useForm<SignUpForm>();
  const [activeTab, setActiveTab] = React.useState<TabName>('signin');
  const { $try: trySignIn, isPending: isSignInPending } = useTry(() =>
    authService.signIn(loginForm.getFieldsValue() as LoginDTO),
  );
  const { $try: trySignUp, isPending: isSignUpPending } = useTry(() =>
    authService.signUp(signUpForm.getFieldsValue() as UserDTO),
  );

  async function onLogin() {
    try {
      await trySignIn();
      history.push(returnRoute[String(authService.getRole())]);
    } catch (error) {
      message.error('Đăng nhập không thành công');
    }
  }

  async function onSignUp() {
    try {
      await trySignUp();
      message.info('Đăng ký tài khoản thành công');
      setActiveTab('signin');
    } catch (error) {
      message.error('Đăng ký không thành công');
    }
  }

  return (
    <Container>
      <Row justify="center">
        <Col span={8} className="login-wrapper">
          <Card className="login-card">
            <Card.Meta
              description={
                <Tabs
                  type="card"
                  style={{ minHeight: 290 }}
                  activeKey={activeTab}
                  onChange={(activeTab) => setActiveTab(activeTab as TabName)}
                >
                  <Tabs.TabPane tab="Đăng nhập" key="signin">
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
                      <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Nhớ đăng nhập</Checkbox>
                      </Form.Item>
                      <Form.Item>
                        <Button
                          block
                          type="primary"
                          size="large"
                          htmlType="submit"
                          loading={isSignInPending}
                        >
                          {'ĐĂNG NHẬP'}
                        </Button>
                      </Form.Item>
                    </Form>
                  </Tabs.TabPane>
                  {/* <Tabs.TabPane tab="Đăng ký" key="signup">
                    <Form form={signUpForm} onFinish={onSignUp}>
                      <Form.Item
                        name="userName"
                        rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản' }]}
                      >
                        <Input prefix={<UserOutlined />} placeholder="Tên tài khoản" />
                      </Form.Item>
                      <Form.Item
                        name="email"
                        rules={[
                          { required: true, message: 'Vui lòng nhập email' },
                          { type: 'email', message: 'Email không đúng định dạng' },
                        ]}
                      >
                        <Input prefix={<MailOutlined />} placeholder="Email" />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        rules={[
                          { required: true, message: 'Mật khẩu hiện tại không được bỏ trống' },
                          { min: 6, message: 'Mật khẩu phải dài ít nhất 6 ký tự' },
                        ]}
                      >
                        <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
                      </Form.Item>
                      <Form.Item
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
                        <Input.Password prefix={<LockOutlined />} placeholder="Nhập lại mật khẩu" />
                      </Form.Item>
                      <Button
                        block
                        type="primary"
                        size="large"
                        htmlType="submit"
                        loading={isSignUpPending}
                      >
                        ĐĂNG KÝ
                      </Button>
                    </Form>
                  </Tabs.TabPane> */}
                </Tabs>
              }
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

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

export default function () {
  const history = useHistory();

  const login = () => {
    history.push('/employees');
  };

  return (
    <Container>
      <Row justify="center">
        <Col span={8} className="login-wrapper">
          <Card className="login-card">
            <Card.Meta
              description={
                <Tabs type="card" style={{ minHeight: 290 }}>
                  <Tabs.TabPane tab="Đăng nhập" key="1">
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
                      <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                          <Checkbox>Nhớ đăng nhập</Checkbox>
                        </Form.Item>
                      </Form.Item>
                      <Form.Item>
                        <Button block type="primary" size="large" onClick={login}>
                          ĐĂNG NHẬP
                        </Button>
                      </Form.Item>
                    </Form>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Quên mật khẩu" key="2">
                    <b>Nhập email hoặc số điện thoại đăng ký để nhận mã</b> <br />
                    <br />
                    <Input
                      addonBefore={<MailOutlined />}
                      addonAfter={<SendOutlined onClick={() => console.log(1)} />}
                    />
                    <Divider>Hoặc</Divider>
                    <Input
                      addonBefore={<PhoneOutlined />}
                      addonAfter={<SendOutlined onClick={() => console.log(1)} />}
                    />
                    <br />
                    <br />
                    <Input.Group compact>
                      <Input addonBefore="PIN" style={{ width: '50%' }} />
                      <Button type="primary">Tiếp tục</Button>
                      <Button type="link">Gửi lại</Button>
                    </Input.Group>
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

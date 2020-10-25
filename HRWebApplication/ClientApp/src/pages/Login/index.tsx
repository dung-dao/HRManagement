import React, { Component } from 'react';
import * as Constant from '../../common/Constant';
import { Form, Input, Button, Checkbox, Tabs, Row, Col, Card, Divider } from 'antd';
import LoginStyle from './Style';
import {
  UserOutlined,
  LockOutlined,
  SendOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons';

class LoginPage extends Component {
  login = () => {
    // @ts-ignore
    this.props.history.push(Constant.ROUTER_URL.OVERVIEW_PAGE);
  };

  render() {
    return (
      <LoginStyle>
        <Row justify="center">
          <Col span={8} className="login-wrapper">
            <Card className="login-card">
              <Card.Meta
                description={
                  <Tabs type="card" style={{ minHeight: 290 }}>
                    <Tabs.TabPane tab="Đăng nhập" key="1">
                      <Form
                        name="login"
                        initialValues={{ remember: true }}
                        // @ts-ignore
                        onFinish={this.onFinish}
                      >
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
                          <Button block type="primary" size="large" onClick={this.login}>
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
      </LoginStyle>
    );
  }
}

export default LoginPage;

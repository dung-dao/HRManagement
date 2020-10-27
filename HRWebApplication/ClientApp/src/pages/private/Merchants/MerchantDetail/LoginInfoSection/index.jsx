import React from 'react';
import { Col, Form, Input } from 'antd';
import { formItemLayout, required } from '../utils';
import { useMerchantDetailData } from '../hooks';

function Index({ isDetail, merchantData }) {
  // const { isDetail, merchantData } = useMerchantDetailData();

  return (
    <fieldset>
      <legend>Thông tin đăng nhập:</legend>
      <Form.Item
        {...formItemLayout}
        label="Email"
        name="login-email"
        rules={[
          required('Địa chỉ email'),
          { type: 'email', message: 'Địa chỉ email không đúng định dạng' },
        ]}
      >
        <Input
          placeholder="email@thuonghieu.com"
          readOnly={isDetail}
          defaultValue={merchantData?.loginInfo.email}
        />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label="Mật khẩu"
        name="password"
        rules={[required('Password'), { min: 6, message: 'Mật khẩu phải dài ít nhất 6 kí tự' }]}
      >
        <Input.Password
          placeholder="Ít nhất 6 kí tự"
          readOnly={isDetail}
          visibilityToggle={!isDetail}
          defaultValue={isDetail ? '1234567890123456' : ''} // to hide the real password
        />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label="Nhập lại mật khẩu"
        name="confirm-password"
        rules={[
          required('Password'),
          // confirm password rules: https://ant.design/components/form/?locale=en-US#components-form-demo-register
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('Nhập lại mật khẩu không khớp!');
            },
          }),
        ]}
      >
        <Input.Password
          placeholder="Ít nhất 6 kí tự"
          readOnly={isDetail}
          visibilityToggle={!isDetail}
          defaultValue={isDetail ? '1234567890123456' : ''}
        />
      </Form.Item>
    </fieldset>
  );
}

export default Index;

import React from 'react';
import { Form, Input } from 'antd';
import { formItemLayout, required } from '../utils';
import { useMerchantDetailData } from '../hooks';

const phoneRegex = /^(\+84|0|84)\d{9}$/;

function Index({ isDetail, merchantData }) {
  // const { isDetail, merchantData } = useMerchantDetailData();

  return (
    <fieldset>
      <legend>Thông tin người đại diện:</legend>
      <Form.Item
        {...formItemLayout}
        label="Họ và tên"
        name="full-name"
        rules={[required('Tên người đại diện')]}
        read
      >
        <Input
          placeholder="Nguyễn Văn A"
          defaultValue={merchantData?.representative.fullName}
          readOnly={isDetail}
        />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label="Số điện thoại"
        name="phone"
        rules={[
          required('Số điện thoại người đại diện'),
          {
            pattern: phoneRegex,
            min: 9,
            max: 12,
            message: 'Số điện thoại phải bắt dầu bằng (0|84|+84) và theo sau 9 chữ số`',
          },
        ]}
      >
        <Input
          placeholder="0123456789"
          defaultValue={merchantData?.representative.phone}
          readOnly={isDetail}
        />
      </Form.Item>
      <Form.Item
        {...formItemLayout}
        label="Email"
        name="email"
        rules={[
          required('Địa chỉ email'),
          { type: 'email', message: 'Địa chỉ email không đúng định dạng' },
        ]}
      >
        <Input
          placeholder="nguyenvana@gmail.com"
          type="email"
          defaultValue={merchantData?.representative.email}
          readOnly={isDetail}
        />
      </Form.Item>
    </fieldset>
  );
}

export default Index;

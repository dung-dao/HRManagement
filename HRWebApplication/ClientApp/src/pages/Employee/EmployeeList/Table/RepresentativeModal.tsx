//@ts-nocheck
import React from 'react';
import { Modal, Form, Button, Input } from 'antd';

// common layout defined for Form.Item
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 15, offset: 0 },
  labelAlign: 'left',
};

function RepresentativeModal() {
  return (
    <Modal title={'Chủ thương hiệu: '} footer={[<Button key="back">Đóng</Button>]}>
      <Form>
        <Form.Item {...formItemLayout} label="Họ và tên">
          <Input placeholder="Trống" readOnly />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Số điện thoại">
          <Input placeholder="Trống" readOnly />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Email">
          <Input placeholder="Trống" type="email" readOnly />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default RepresentativeModal;

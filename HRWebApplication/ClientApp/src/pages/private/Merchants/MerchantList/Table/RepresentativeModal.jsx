import React from 'react';
import { Modal, Form, Button, Input } from 'antd';
import { useRecoilState } from 'recoil';
import { representativeModalState } from '../../states';

// common layout defined for Form.Item
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 15, offset: 0 },
  labelAlign: 'left',
};

function RepresentativeModal() {
  const [{ isShow, merchantToShow }, setModal] = useRecoilState(representativeModalState);

  const handleClose = () => {
    setModal({ isShow: false, });
  };

  return (
    isShow && (
      <Modal
        title={'Chủ thương hiệu: ' + merchantToShow?.shop.brand}
        visible={isShow}
        onOk={handleClose}
        onCancel={handleClose}
        footer={[
          <Button key="back" onClick={handleClose}>
            Đóng
          </Button>,
        ]}
      >
        <Form>
          <Form.Item {...formItemLayout} label="Họ và tên">
            <Input placeholder="Trống" value={merchantToShow?.representative.fullName} readOnly />
          </Form.Item>
          <Form.Item {...formItemLayout} label="Số điện thoại">
            <Input placeholder="Trống" value={merchantToShow?.representative.phone} readOnly />
          </Form.Item>
          <Form.Item {...formItemLayout} label="Email">
            <Input
              placeholder="Trống"
              value={merchantToShow?.representative.email}
              type="email"
              readOnly
            />
          </Form.Item>
        </Form>
      </Modal>
    )
  );
}

export default RepresentativeModal;

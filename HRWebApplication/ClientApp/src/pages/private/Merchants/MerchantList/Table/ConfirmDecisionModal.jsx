import React, { useState } from 'react';
import { Modal, Form, Button, Input, message } from 'antd';
import { confirmDecisionModalState } from '../../states';
import { useRecoilState } from 'recoil';

const getDecisionTypeLabel = {
  APPROVE: 'phê duyệt',
  REJECT: 'từ chối',
  SUSPEND: 'ngừng hợp tác',
};

function ConfirmDecisionModal() {
  const [{ isShow, type, merchantToShow }, setModal] = useRecoilState(confirmDecisionModalState);
  const [curInput, setCurInput] = useState('');
  const statement = `${getDecisionTypeLabel[type]} thương hiệu ${merchantToShow?.shop.brand}`;

  const handleCancel = () => {
    setModal({ isShow: false });
    setCurInput('');
  };

  const handleOk = () => {
    message.success(`Đã ${statement}`);
    setModal({ isShow: false })
    setCurInput('');
  };

  return isShow && (
    <Modal
      title={`Bạn có chắc muốn ${statement}`}
      visible={isShow}
      // onOk={handleClose}
      onCancel={handleCancel}
      footer={[
        <Button
          key="ok"
          htmlType="submit"
          onClick={handleOk}
          disabled={curInput !== merchantToShow?.shop.brand}
        >
          Đồng ý
        </Button>,
        <Button key="back" onClick={handleCancel}>
          Đóng
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Form.Item label="Nhập lại tên thương hiệu để xác nhận:">
          <Input
            placeholder="Tên thương hiệu"
            value={curInput}
            onChange={(e) => setCurInput(e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ConfirmDecisionModal;

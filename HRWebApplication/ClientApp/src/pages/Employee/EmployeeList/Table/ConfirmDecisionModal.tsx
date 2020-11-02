import React, { useState } from 'react';
import { Modal, Form, Button, Input, message } from 'antd';

const getDecisionTypeLabel = {
  APPROVE: 'phê duyệt',
  REJECT: 'từ chối',
  SUSPEND: 'ngừng hợp tác',
};

function ConfirmDecisionModal() {
  const [curInput, setCurInput] = useState('');
  const statement = `thương hiệu`;

  const handleCancel = () => {
    setCurInput('');
  };

  const handleOk = () => {
    message.success(`Đã ${statement}`);
    setCurInput('');
  };

  return (
    <Modal
      title={`Bạn có chắc muốn ${statement}`}
      // onOk={handleClose}
      onCancel={handleCancel}
      footer={[
        <Button key="ok" htmlType="submit" onClick={handleOk}>
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

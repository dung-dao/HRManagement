import React from 'react';
import { Button, Menu } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useSetRecoilState } from 'recoil';
import { confirmDecisionModalState } from '../../states';

const MenuItem = ({ content, icon, color, isEnabled, onClick, ...others }) => (
  <Menu.Item onClick={onClick} {...others}>
    <Button
      block
      disabled={!isEnabled}
      icon={icon}
      title={isEnabled ? '' : 'Chức năng không phù hợp với đối tác này'}
      style={{
        textAlign: 'left',
        color: isEnabled && color,
        borderColor: 'currentColor',
      }}
      type="dashed"
      children={content}
    />
  </Menu.Item>
);

// context menu displayed when hover
function DecisionContextMenu({ record }) {
  const setConfirmDecisionModal = useSetRecoilState(confirmDecisionModalState);

  return (
    <Menu>
      <MenuItem
        content="Phê duyệt đối tác"
        color="#1890ff"
        icon={<CheckCircleOutlined />}
        isEnabled={record.acceptStatus === 'PENDING' || record.acceptStatus === 'SUSPENDED'}
        onClick={() => {
          setConfirmDecisionModal({
            isShow: true,
            type: 'APPROVE',
            merchantToShow: record,
          });
        }}
      />
      <MenuItem
        content="Từ chối đối tác"
        color="red"
        icon={<CloseCircleOutlined />}
        isEnabled={record.acceptStatus === 'PENDING'}
        onClick={() => {
          setConfirmDecisionModal({
            isShow: true,
            type: 'REJECT',
            merchantToShow: record,
          });
        }}
      />
      <MenuItem
        content="Dừng hợp tác"
        color="red"
        icon={<MinusCircleOutlined />}
        isEnabled={record.acceptStatus === 'ACTIVE'}
        onClick={() => {
          setConfirmDecisionModal({
            isShow: true,
            type: 'SUSPEND',
            merchantToShow: record,
          });
        }}
      />
    </Menu>
  );
}

export default DecisionContextMenu;

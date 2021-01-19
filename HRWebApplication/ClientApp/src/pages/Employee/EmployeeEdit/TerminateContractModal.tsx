import { Modal } from 'antd';
import { LeaveForm } from 'components';
import React from 'react';
import { PositionDTO } from 'services/ApiClient';
import { momentToDate } from 'utils';
import { usePage } from './PageProvider';

type Props = {};

export const TerminateContractModal: React.FC<Props> = (props) => {
  const {
    curPosition,
    curPositionReady,
    modalVisible,
    setModalVisible,
    onTerminateContract,
  } = usePage();
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const onSubmit = React.useCallback(
    async (data) => {
      try {
        setIsSubmitting(true);
        await onTerminateContract(momentToDate(data) as PositionDTO);
      } finally {
        setIsSubmitting(false);
      }
    },
    [onTerminateContract],
  );

  return (
    <Modal
      title={'Kết thúc hợp đồng'}
      visible={modalVisible}
      centered
      okButtonProps={{
        htmlType: 'submit',
        form: 'leave-form',
      }}
      onCancel={() => setModalVisible(false)}
      width={600}
      confirmLoading={isSubmitting}
    >
      <LeaveForm
        data={curPosition}
        dataReady={curPositionReady}
        type="create"
        onSubmit={onSubmit}
        labelAlign="left"
      />
    </Modal>
  );
};

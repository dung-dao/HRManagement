import { Button, message, Modal } from 'antd';
import { EmployeeInfo, LeaveForm } from 'components';
import React from 'react';
import { EmployeeDTO, EmployeeStatus, PositionDTO } from 'services/ApiClient';
import { apiEmployees } from 'services/ApiClient.singleton';
import { usePage } from './PageProvider';

export const TerminateContactModal: React.FC<{
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ visible, setVisible }) => {
  const { curPosition, curPositionReady } = usePage();
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const onSubmit = React.useCallback(async (data: PositionDTO) => {
    try {
      setIsSubmitting(true);
      await apiEmployees.employees_Leave(data?.employee?.id!, data);
      message.info('Cập nhật thành công');
    } catch (err) {
      console.error(err);
      message.info('Cập nhật thất bại');
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return (
    <Modal
      title={'Kết thúc hợp đồng'}
      visible={visible}
      centered
      okButtonProps={{
        htmlType: 'submit',
        form: 'leave-form',
      }}
      onCancel={() => setVisible(false)}
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

const EmployeeInfoAction: React.FC<{
  isSubmitting: boolean;
  employee: EmployeeDTO | undefined;
}> = ({ isSubmitting, employee }) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', columnGap: 10 }}>
        {employee?.status === EmployeeStatus.Working ? (
          <Button onClick={() => setModalVisible(true)} danger>
            Kết thúc hợp đồng
          </Button>
        ) : null}
        <Button type="primary" htmlType="submit" loading={isSubmitting}>
          Cập nhật thông tin
        </Button>
      </div>
      <TerminateContactModal visible={modalVisible} setVisible={setModalVisible} />
    </>
  );
};

export const EmployeeInfoWrapped: React.FC = () => {
  const { employee, employeeReady } = usePage();
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const onSubmit = React.useCallback(async (data: EmployeeDTO) => {
    try {
      setIsSubmitting(true);
      await apiEmployees.updateEmployeeById(data.id!, data);
      message.info('Cập nhật thành công');
    } catch (err) {
      console.error(err);
      message.info('Cập nhật thất bại');
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return (
    <EmployeeInfo
      data={employee}
      dataReady={employeeReady}
      type="update"
      onSubmit={onSubmit}
      actionButtons={<EmployeeInfoAction isSubmitting={isSubmitting} employee={employee} />}
    />
  );
};

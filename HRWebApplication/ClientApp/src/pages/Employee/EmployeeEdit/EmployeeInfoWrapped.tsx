import { message } from 'antd';
import { EmployeeInfo } from 'components';
import React from 'react';
import { EmployeeDTO } from 'services/ApiClient';
import { apiEmployees } from 'services/ApiClient.singleton';
import { EmployeeAction } from './EmployeeAction';
import { usePage } from './PageProvider';

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
      actionButtons={<EmployeeAction isSubmitting={isSubmitting} />}
    />
  );
};

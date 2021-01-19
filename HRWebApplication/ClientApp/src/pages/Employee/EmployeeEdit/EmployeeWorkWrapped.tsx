import { message } from 'antd';
import { EmployeeWork } from 'components';
import React from 'react';
import { PositionDTO } from 'services/ApiClient';
import { apiEmployees } from 'services/ApiClient.singleton';
import { EmployeeAction } from './EmployeeAction';
import { usePage } from './PageProvider';

export const EmployeeWorkWrapped: React.FC = () => {
  const { curPosition, curPositionReady, positions, positionsReady, employee } = usePage();
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const onSubmit = React.useCallback(
    async (data: PositionDTO) => {
      try {
        setIsSubmitting(true);
        await apiEmployees.employees_AddToPosition(employee?.id!, data);
        message.info('Cập nhật thành công');
      } catch (err) {
        console.error(err);
        message.info('Cập nhật thất bại');
      } finally {
        setIsSubmitting(false);
      }
    },
    [employee],
  );

  const nonePositionYet = !curPosition && curPositionReady;

  return (
    <EmployeeWork
      data={curPosition}
      dataReady={curPositionReady}
      positions={positions}
      positionsReady={positionsReady}
      type={nonePositionYet ? 'create' : 'update'}
      onSubmit={onSubmit}
      actionButtons={<EmployeeAction isSubmitting={isSubmitting} />}
    />
  );
};

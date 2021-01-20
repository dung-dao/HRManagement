import { EmployeeWork } from 'components';
import React from 'react';
import { PositionDTO } from 'services/ApiClient';
import { EmployeeAction } from './EmployeeAction';
import { usePage } from './PageProvider';

export const EmployeeWorkWrapped: React.FC = () => {
  const { curPosition, curPositionReady, positions, positionsReady, onAddPosition } = usePage();
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const onSubmit = React.useCallback(
    async (data: PositionDTO) => {
      try {
        setIsSubmitting(true);
        await onAddPosition(data);
      } finally {
        setIsSubmitting(false);
      }
    },
    [onAddPosition],
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

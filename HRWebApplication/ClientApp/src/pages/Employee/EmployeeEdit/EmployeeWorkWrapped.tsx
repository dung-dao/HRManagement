import { EmployeeWork } from 'components';
import React from 'react';
import { usePage } from './PageProvider';

export const EmployeeWorkWrapped: React.FC = () => {
  const { curPosition, curPositionReady, positions, positionsReady } = usePage();

  const nonePositionYet = !curPosition && curPositionReady;

  return (
    <EmployeeWork
      data={curPosition}
      dataReady={curPositionReady}
      positions={positions}
      positionsReady={positionsReady}
      type={nonePositionYet ? 'create' : 'update'}
    />
  );
};

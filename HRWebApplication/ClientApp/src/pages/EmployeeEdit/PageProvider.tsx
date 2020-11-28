import React, { PropsWithChildren } from 'react';
import { EmployeeDTO, EmployeesClient, PositionDTO } from '../../services/ApiClient';

type PageContextData = {
  id: number;
  setEmployee: (value: EmployeeDTO) => void;
  employee?: EmployeeDTO;
  setPositions: (value: PositionDTO[]) => void;
  positions: PositionDTO[];
  setCurrentPosition: (value: PositionDTO) => void;
  currentPosition?: PositionDTO;
  api: EmployeesClient;
};

export const PageContext = React.createContext<PageContextData>(undefined as any);

type Props = PropsWithChildren<{
  value: PageContextData;
}>;

export function PageProvider(props: Props) {
  const { children, value } = props;

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
}

export function usePage() {
  return React.useContext(PageContext);
}

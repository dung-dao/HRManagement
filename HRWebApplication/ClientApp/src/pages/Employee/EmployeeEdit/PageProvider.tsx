import { message } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import { EmployeeDTO, PositionDTO } from 'services/ApiClient';
import { apiEmployees } from 'services/ApiClient.singleton';

type PageContextData = {
  employee: EmployeeDTO | undefined;
  employeeReady: boolean;
  curPosition: PositionDTO | undefined;
  curPositionReady: boolean;
  positions: PositionDTO[] | undefined;
  positionsReady: boolean;
};

export const PageContext = React.createContext<PageContextData>(undefined as any);

type Props = React.PropsWithChildren<{}>;

export const PageProvider: React.FC<{}> = (props: Props) => {
  const { children } = props;

  const { employeeId } = useParams<any>();

  const [employee, setEmployee] = React.useState<EmployeeDTO>();
  const [employeeReady, setEmployeeReady] = React.useState<boolean>(false);
  const [curPosition, setCurPosition] = React.useState<PositionDTO>();
  const [curPositionReady, setCurPositionReady] = React.useState<boolean>(false);
  const [positions, setPositions] = React.useState<PositionDTO[]>();
  const [positionsReady, setPositionsReady] = React.useState<boolean>(false);

  const fetchAll = React.useCallback(async () => {
    try {
      const employee = await apiEmployees.getEmployeeById(employeeId);
      setEmployee(employee);
      setEmployeeReady(true);
      if (employee) {
        apiEmployees
          .employees_GetCurrentPosition(employee.id!)
          .then(setCurPosition)
          .finally(() => setCurPositionReady(true));
        apiEmployees
          .employees_GetPosition(employee.id!)
          .then(setPositions)
          .finally(() => setPositionsReady(true));
      } else {
        setPositionsReady(true);
        setCurPositionReady(true);
      }
    } catch (err) {
      console.error(err);
      message.error('Không thể tải dữ liệu');
    } finally {
    }
  }, [employeeId]);

  React.useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <PageContext.Provider
      value={{
        employee,
        employeeReady,
        curPosition,
        curPositionReady,
        positions,
        positionsReady,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};

export function usePage() {
  return React.useContext(PageContext);
}

export function withPageProvider<T>(Component: React.FC<T>) {
  return (props: T) => (
    <PageProvider>
      <Component {...props} />
    </PageProvider>
  );
}

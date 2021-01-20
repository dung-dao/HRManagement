import { message } from 'antd';
import React from 'react';
import { EmployeeDTO, PositionDTO, UserDTO } from 'services/ApiClient';
import { apiEmployees, apiUsers } from 'services/ApiClient.singleton';

type PageContextData = {
  user: UserDTO | undefined;
  userReady: boolean;
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

  const [user, setUser] = React.useState<UserDTO>();
  const [userReady, setUserReady] = React.useState<boolean>(false);
  const [employee, setEmployee] = React.useState<EmployeeDTO>();
  const [employeeReady, setEmployeeReady] = React.useState<boolean>(false);
  const [curPosition, setCurPosition] = React.useState<PositionDTO>();
  const [curPositionReady, setCurPositionReady] = React.useState<boolean>(false);
  const [positions, setPositions] = React.useState<PositionDTO[]>();
  const [positionsReady, setPositionsReady] = React.useState<boolean>(false);

  const fetchAll = React.useCallback(async () => {
    try {
      const user = await apiUsers.profile();
      setUser(user);
      setEmployee(user.employee);
      setUserReady(true);
      setEmployeeReady(true);
      if (user.employee) {
        apiEmployees
          .employees_GetCurrentPosition(user.employee.id!)
          .then(setCurPosition)
          .finally(() => setCurPositionReady(true));
        apiEmployees
          .employees_GetPosition(user.employee.id!)
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
  }, []);

  React.useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <PageContext.Provider
      value={{
        user,
        userReady,
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

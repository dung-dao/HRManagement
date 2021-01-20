import { message } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import { EmployeeDTO, EmployeeStatus, PositionDTO } from 'services/ApiClient';
import { apiEmployees } from 'services/ApiClient.singleton';
import { TerminateContractModal } from './TerminateContractModal';

type PageContextData = {
  employee: EmployeeDTO | undefined;
  employeeReady: boolean;
  curPosition: PositionDTO | undefined;
  curPositionReady: boolean;
  positions: PositionDTO[] | undefined;
  positionsReady: boolean;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onTerminateContract: (position: PositionDTO) => Promise<void>;
  onAddPosition: (position: PositionDTO) => Promise<void>;
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
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

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

  const updateEmployeeStatus = React.useCallback(
    (newStatus: EmployeeStatus) => {
      setEmployee({ ...employee, status: newStatus } as EmployeeDTO);
      setCurPosition({
        ...curPosition,
        employee: {
          ...curPosition?.employee,
          status: newStatus,
        } as EmployeeDTO,
      } as PositionDTO);
    },
    [curPosition, employee],
  );

  const onTerminateContract = React.useCallback(
    async (position: PositionDTO) => {
      try {
        await apiEmployees.employees_Leave(employee?.id!, position);
        updateEmployeeStatus(EmployeeStatus.Leaved);
        setModalVisible(false);
        message.info('Cập nhật thành công');
      } catch (err) {
        message.info('Cập nhật thất bại');
        console.error(err);
        throw err;
      }
    },
    [employee, updateEmployeeStatus],
  );

  const onAddPosition = React.useCallback(
    async (position: PositionDTO) => {
      try {
        const newPosition = await apiEmployees.employees_AddToPosition(employee?.id!, position);
        setPositions([newPosition, ...(positions || [])]);
        updateEmployeeStatus(EmployeeStatus.Working);
        message.info('Cập nhật thành công');
      } catch (err) {
        message.info('Cập nhật thất bại');
        console.error(err);
        throw err;
      }
    },
    [employee, positions, updateEmployeeStatus],
  );

  return (
    <PageContext.Provider
      value={{
        employee,
        employeeReady,
        curPosition,
        curPositionReady,
        positions,
        positionsReady,
        modalVisible,
        setModalVisible,
        onTerminateContract,
        onAddPosition,
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
      <TerminateContractModal />
    </PageProvider>
  );
}

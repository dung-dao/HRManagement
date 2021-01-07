import { message } from 'antd';
import React from 'react';
import { LeaveTypeDTO } from 'services/ApiClient';
import { apiLeaveType } from 'services/ApiClient.singleton';
import { CreateUpdateModal } from './CreateUpdateModal';

type RecordType = LeaveTypeDTO;
type ModalType = 'create' | 'update' | 'hidden';

type PageContextData = {
  listData: RecordType[] | undefined;
  listDataReady: boolean;

  onCreate: (record: RecordType) => Promise<void>;
  onUpdate: (record: RecordType) => Promise<void>;
  onDelete: (recordId: number) => Promise<void>;

  modalVisibleType: ModalType;
  setModalVisibleType: React.Dispatch<React.SetStateAction<ModalType>>;

  selectedRecord: RecordType | undefined; // selected record when on modal updating
  setSelectedRecord: React.Dispatch<React.SetStateAction<RecordType | undefined>>;
};

export const PageContext = React.createContext<PageContextData>(undefined as any);

type Props = React.PropsWithChildren<{}>;

export function PageProvider(props: Props) {
  const { children } = props;

  // data related states
  const [listData, setListData] = React.useState<LeaveTypeDTO[]>([]);
  const [listDataReady, setListDataReady] = React.useState<boolean>(false);

  //  modal controlling related states
  const [modalVisibleType, setModalVisibleType] = React.useState<ModalType>('hidden');
  const [selectedRecord, setSelectedRecord] = React.useState<RecordType>();

  const fetchAll = React.useCallback(async () => {
    try {
      setListDataReady(false);
      const data = await apiLeaveType.leaveType_GetAll();
      setListData(data);
    } catch (err) {
      console.error(err);
      message.error('Không thể tải dữ liệu');
    } finally {
      setListDataReady(true);
    }
  }, []);

  React.useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const onCreate = React.useCallback(
    async (record: RecordType) => {
      try {
        await apiLeaveType.leaveType_Create(record);
        setListData([...listData, record]);
        message.info('Tạo mới thành công');
      } catch (err) {
        message.error('Tạo mới không thành công');
        throw err;
      }
    },
    [listData],
  );

  const onUpdate = React.useCallback(async (record: RecordType) => {
    try {
      await apiLeaveType.leaveType_Update(record.id!, record);
      setListData((data) =>
        data?.map((it) => (it.id === record.id! ? ({ ...it, ...record } as RecordType) : it)),
      );
      message.info('Cập nhật thành công');
    } catch (err) {
      message.error('Cập nhật không thành công');
      throw err;
    }
  }, []);

  const onDelete = React.useCallback(async (recordId: number) => {
    try {
      await apiLeaveType.leaveType_Delete(recordId);
      setListData((data) => data?.filter((it) => it.id !== recordId));
      message.info('Xoá thành công');
    } catch (err) {
      message.error('Xoá không thành công');
      throw err;
    }
  }, []);

  return (
    <PageContext.Provider
      value={{
        listData,
        listDataReady,
        onCreate,
        onUpdate,
        onDelete,
        modalVisibleType,
        setModalVisibleType,
        selectedRecord,
        setSelectedRecord,
      }}
    >
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  return React.useContext(PageContext);
}

export function withPageProvider<T>(Component: React.FC<T>) {
  return (props: T) => (
    <PageProvider>
      <Component {...props} />
      <CreateUpdateModal />
    </PageProvider>
  );
}

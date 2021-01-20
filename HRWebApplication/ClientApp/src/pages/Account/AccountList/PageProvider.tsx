import { message } from 'antd';
import React from 'react';
import { UserDTO } from 'services/ApiClient';
import { apiUsers } from 'services/ApiClient.singleton';
import { CreateUpdateModal } from './CreateUpdateModal';

export const apiClient = apiUsers;
export type RecordType = UserDTO;
export type ModalType = 'create' | 'update' | 'hidden';

type PageContextData = {
  listData: RecordType[] | undefined;
  listDataReady: boolean;

  onCreate: (record: RecordType) => Promise<void>;
  onUpdate: (record: RecordType) => Promise<void>;
  onDelete: (recordId: string) => Promise<void>;

  modalVisibleType: ModalType;
  setModalVisibleType: React.Dispatch<React.SetStateAction<ModalType>>;

  selectedRecord: RecordType | undefined; // selected record when on modal UPDATING
  setSelectedRecord: React.Dispatch<React.SetStateAction<RecordType | undefined>>;
};

export const PageContext = React.createContext<PageContextData>(undefined as any);

type Props = React.PropsWithChildren<{}>;

export const PageProvider: React.FC<{}> = (props: Props) => {
  const { children } = props;

  // data related states
  const [listData, setListData] = React.useState<RecordType[]>([]);
  const [listDataReady, setListDataReady] = React.useState<boolean>(false);

  //  modal controlling related states
  const [modalVisibleType, setModalVisibleType] = React.useState<ModalType>('hidden');
  const [selectedRecord, setSelectedRecord] = React.useState<RecordType>();

  const fetchAll = React.useCallback(async () => {
    try {
      setListDataReady(false);
      const data = await apiClient.getListUsers();
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
        await apiClient.signUp(record);
        await apiClient.addRoleForUser(record.userName, record.role);
        setListData([...listData, record]);
        message.info('Tạo mới thành công');
      } catch (err) {
        message.error('Tạo mới không thành công');
        throw err;
      }
    },
    [listData],
  );

  const onUpdate = React.useCallback(
    async (record: RecordType) => {
      try {
        const updatedRecord = { ...selectedRecord, ...record } as RecordType;
        // await apiClient.(updatedRecord.id!, updatedRecord);
        setListData((data) =>
          data?.map((it) => (it.id === updatedRecord.id! ? updatedRecord : it)),
        );
        message.info('Cập nhật thành công');
      } catch (err) {
        message.error('Cập nhật không thành công');
        throw err;
      }
    },
    [selectedRecord],
  );

  const onDelete = React.useCallback(async (recordId: string) => {
    try {
      await apiClient.delete(recordId);
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
};

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

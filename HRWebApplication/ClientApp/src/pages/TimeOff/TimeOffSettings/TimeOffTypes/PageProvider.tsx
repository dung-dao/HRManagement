import { message } from 'antd';
import React from 'react';
import { TimeOffDTO, TimeOffTypeDTO } from 'services/ApiClient';
import { apiTimeOffType } from 'services/ApiClient.singleton';
import { CreateUpdateModal } from './CreateUpdateModal';

export const apiClient = apiTimeOffType;
export type RecordType = TimeOffTypeDTO;
export type ModalType = 'create' | 'update' | 'hidden';

type PageContextData = {
  listData: RecordType[] | undefined;
  listDataReady: boolean;

  onCreate: (record: RecordType) => Promise<void>;
  onUpdate: (record: RecordType) => Promise<void>;
  onDelete: (recordId: number) => Promise<void>;

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
  const [listData, setListData] = React.useState<TimeOffDTO[]>([]);
  const [listDataReady, setListDataReady] = React.useState<boolean>(false);

  //  modal controlling related states
  const [modalVisibleType, setModalVisibleType] = React.useState<ModalType>('hidden');
  const [selectedRecord, setSelectedRecord] = React.useState<RecordType>();

  const fetchAll = React.useCallback(async () => {
    try {
      setListDataReady(false);
      const data = await apiClient.timeOffType_GetAll();
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
        await apiClient.timeOffType_Create(record);
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
      await apiClient.timeOffType_Update(record.id!, record);
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
      await apiClient.timeOffType_Delete(recordId);
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

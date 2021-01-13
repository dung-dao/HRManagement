import { message } from 'antd';
import moment from 'moment';
import React from 'react';
import { HolidayDTO } from 'services/ApiClient';
import { apiHoliday } from 'services/ApiClient.singleton';
import { CreateUpdateModal } from './CreateUpdateModal';

export const apiClient = apiHoliday;
export type RecordType = HolidayDTO;
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

  selectedYear: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
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

  // custom data for this page:
  const [selectedYear, setSelectedYear] = React.useState(moment().year());

  const fetchAll = React.useCallback(async () => {
    try {
      setListDataReady(false);
      const data = await apiClient.holiday_GetAll();
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
        const newRecord = await apiClient.holiday_Create(record);
        setListData([...listData, newRecord]);
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
        await apiClient.holiday_Update(updatedRecord.id!, updatedRecord);
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

  const onDelete = React.useCallback(async (recordId: number) => {
    try {
      await apiClient.holiday_Delete(recordId);
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
        selectedYear,
        setSelectedYear,
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

import { message } from 'antd';
import React from 'react';
import { PayRollDTO, PayRollStatus } from 'services/ApiClient';
import { apiPayroll } from 'services/ApiClient.singleton';
import { CreateUpdateModal } from './CreateUpdateModal';

export const apiClient = apiPayroll;
export type RecordType = PayRollDTO;
export type ModalType = 'create' | 'update' | 'hidden';

type PageContextData = {
  listData: RecordType[] | undefined;
  listDataReady: boolean;

  onCreate: (dateStart: Date, dateEnd: Date) => Promise<void>;
  onDelete: (recordId: number) => Promise<void>;
  onConfirm: (recordId: number) => Promise<void>;

  modalVisibleType: ModalType;
  setModalVisibleType: React.Dispatch<React.SetStateAction<ModalType>>;
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

  const fetchAll = React.useCallback(async () => {
    try {
      setListDataReady(false);
      const data = await apiClient.getAllPayrolls();
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
    async (startDate: Date, endDate: Date) => {
      try {
        const newRecord = await apiClient.createPayroll(startDate, endDate);
        setListData([...listData, newRecord]);
        message.info('Tạo mới thành công');
      } catch (err) {
        message.error('Tạo mới không thành công');
        throw err;
      }
    },
    [listData],
  );

  const onConfirm = React.useCallback(
    async (recordId: number) => {
      try {
        await apiClient.confirmPayroll(recordId);
        setListData(
          listData.map((it) =>
            it.id === recordId ? ({ ...it, status: PayRollStatus.Confirmed } as RecordType) : it,
          ),
        );
        message.info('Chốt lương thành công');
      } catch (err) {
        message.error('Chốt lương không thành công');
        throw err;
      }
    },
    [listData],
  );

  const onDelete = React.useCallback(async (recordId: number) => {
    try {
      await apiClient.deletePayroll(recordId);
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
        onDelete,
        onConfirm,
        modalVisibleType,
        setModalVisibleType,
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

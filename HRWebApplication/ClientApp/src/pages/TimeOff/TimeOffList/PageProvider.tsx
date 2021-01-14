import { message } from 'antd';
import React from 'react';
import { LogStatus, TimeOffDTO } from 'services/ApiClient';
import { apiTimeOff } from 'services/ApiClient.singleton';

export const apiClient = apiTimeOff;
export type RecordType = TimeOffDTO;
export type ModalType = 'create' | 'update' | 'hidden';

type PageContextData = {
  listData: RecordType[] | undefined;
  listDataReady: boolean;

  onApprove: (recordId: number) => Promise<void>;
  onReject: (recordId: number) => Promise<void>;

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
      const data = await apiClient.getAll();
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

  const onApprove = React.useCallback(async (recordId: number) => {
    try {
      await apiClient.approveById(recordId);
      setListData((data) =>
        data?.map((it) =>
          it.id === recordId ? ({ ...it, logStatus: LogStatus.Approved } as RecordType) : it,
        ),
      );
      message.info('Phê duyệt thành công');
    } catch (err) {
      message.error('Phê duyệt không thành công');
      throw err;
    }
  }, []);

  const onReject = React.useCallback(async (recordId: number) => {
    try {
      await apiClient.rejectById(recordId);
      setListData((data) =>
        data?.map((it) =>
          it.id === recordId ? ({ ...it, logStatus: LogStatus.Rejected } as RecordType) : it,
        ),
      );
      message.info('Từ chối thành công');
    } catch (err) {
      message.error('Từ chối không thành công');
      throw err;
    }
  }, []);

  return (
    <PageContext.Provider
      value={{
        listData,
        listDataReady,
        onApprove,
        onReject,
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
    </PageProvider>
  );
}

import { message } from 'antd';
import React from 'react';
import { AttendanceDTO } from 'services/ApiClient';
import { apiAttendance } from 'services/ApiClient.singleton';
import { ModalNew } from './ModalNew';

type RecordType = AttendanceDTO;

type PageContextData = {
  listData: RecordType[] | undefined;
  listDataReady: boolean;
  onDelete: (recordId: number) => Promise<void>;
  isModalNewVisible: boolean;
  setIsModalNewVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PageContext = React.createContext<PageContextData>(undefined as any);

type Props = React.PropsWithChildren<{}>;

export function PageProvider(props: Props) {
  const { children } = props;

  // data related states
  const [listData, setListData] = React.useState<RecordType[]>();
  const [listDataReady, setListDataReady] = React.useState<boolean>(false);

  //  modal controlling related states
  const [isModalNewVisible, setIsModalNewVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchAll = async () => {
      try {
        setListDataReady(false);
        const data = await apiAttendance.getAttendance();
        setListData(data);
      } catch (err) {
        console.error(err);
        message.error('Không thể tải dữ liệu');
      } finally {
        setListDataReady(true);
      }
    };

    fetchAll();
  }, []);

  const onDelete = React.useCallback(async (recordId: number) => {
    try {
      // await apiAttendance.(recordId);
      // setListData((data) => data?.filter((it) => it.id !== recordId));
      message.info('Xoá thành công');
    } catch (err) {
      message.error('Xoá không thành công');
    }
  }, []);

  return (
    <PageContext.Provider
      value={{
        listData,
        listDataReady,
        onDelete,
        isModalNewVisible,
        setIsModalNewVisible,
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
      <ModalNew />
    </PageProvider>
  );
}

import React, { PropsWithChildren } from 'react';
import { TimeOffDTO, TimeOffClient } from '../../services/ApiClient';

export type ModalType = 'add' | 'edit';
type PageContextData = {
  setModalVisible: (visible: boolean) => void;
  modalVisible: boolean;
  setModalType: (visible: ModalType) => void;
  modalType: ModalType;
  setRecord: (visible: TimeOffDTO) => void;
  record?: TimeOffDTO;
  data: TimeOffDTO[];
  setData: (data: TimeOffDTO[]) => void;
  api: TimeOffClient;
};

export const PageContext = React.createContext<PageContextData>(undefined as any);

type Props = PropsWithChildren<{
  value: PageContextData;
}>;

export function PageProvider(props: Props) {
  const { children, value } = props;

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
}

export function usePage() {
  return React.useContext(PageContext);
}
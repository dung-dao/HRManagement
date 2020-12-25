import React, { PropsWithChildren } from 'react';
import { LeaveTypeDTO, LeaveTypeClient } from '../../services/ApiClient';

export type ModalType = 'add' | 'edit';
type PageContextData = {
  setModalVisible: (visible: boolean) => void;
  modalVisible: boolean;
  setModalType: (visible: ModalType) => void;
  modalType: ModalType;
  setRecord: (visible: LeaveTypeDTO) => void;
  record?: LeaveTypeDTO;
  data: LeaveTypeDTO[];
  setData: (data: LeaveTypeDTO[]) => void;
  api: LeaveTypeClient;
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

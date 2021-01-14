import React, {PropsWithChildren} from "react"
import {JobCategoryDTO, JobCategoryClient} from "../../services/ApiClient";

export type ModalType = 'add' | 'edit'
type PageContextData = {
  setModalVisible: (visible: boolean) => void;
  modalVisible: boolean;
  setModalType: (visible: ModalType) => void;
  modalType: ModalType;
  setRecord: (visible: JobCategoryDTO) => void;
  record?: JobCategoryDTO;
  data: JobCategoryDTO[];
  setData: (data: JobCategoryDTO[]) => void;
  api: JobCategoryClient;
}

export const PageContext = React.createContext<PageContextData>(undefined as any)

type Props = PropsWithChildren<{
  value: PageContextData
}>

export function PageProvider(props: Props) {
  const { children, value } = props

  return (
    <PageContext.Provider value={value}>
      {children}
    </PageContext.Provider>
  )
}

export function usePage() {
  return React.useContext(PageContext)
}

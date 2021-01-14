import React, {PropsWithChildren} from "react"
import {EmployeeDTO, EmployeesClient, PositionDTO} from "../../services/ApiClient";

export type ModalType = 'add' | 'edit'
type PageContextData = {
  setEmployee: (value: EmployeeDTO) => void;
  employee?: EmployeeDTO;
  setPosition: (value: PositionDTO) => void;
  position?: PositionDTO;
  api: EmployeesClient;
  nextPage: () => void;
  prevPage: () => void;
  currentPage: number;
  steps: { title: string, content: JSX.Element }[]
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

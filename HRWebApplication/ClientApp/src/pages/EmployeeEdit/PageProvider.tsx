import React, {PropsWithChildren} from "react"
import {EmployeeDTO, EmployeesClient } from "../../services/ApiClient";

type PageContextData = {
  setEmployee: (value: EmployeeDTO) => void;
  employee?: EmployeeDTO;
  api: EmployeesClient;
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

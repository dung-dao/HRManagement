import React from 'react';
import {message, Tabs} from "antd";
import AppBody from "../../components/Layouts/AppBody";
import {EmployeeDTO, EmployeesClient, PositionDTO} from "services/ApiClient";
import {PageProvider, usePage} from "./PageProvider";
import {EmployeeInfoForm} from "../Employee/EmployeeInfoForm";
import {EmployeeWorkForm} from "../Employee/EmployeeWorkForm";
import {EmployeeFormAction} from "./EmployeeFormAction";
import {PositionHistory} from "./PositionHistory";

function Form1() {
  const {api, setEmployee, employee} = usePage()
  const onSubmit = async (data: EmployeeDTO) => {
    try {
      await api.updateEmployeeById(data.id!, data)
      message.info(`Thay đổi thông tin nhân viên ${data.firstName} thành công`)
      setEmployee(data)
    } catch (e) {
      console.error(e)
      message.error(`Không thể thay đổi thông tin nhân viên ${data.firstName}`)
    }
  }

  React.useEffect(() => {
    const id = Number(window.location.pathname.split('/')[2])
    api.getEmployeeById(id).then(data => {
      setEmployee(data)
    })
  }, [])

  return (
    <EmployeeInfoForm
      style={{ marginTop: 25 }}
      action={EmployeeFormAction}
      onSubmit={onSubmit}
      value={employee} />
  )
}
function Form2() {
  const {api, employee, id, positions, setPositions} = usePage()
  const onSubmit = async (data: PositionDTO) => {
    try {
      const position = await api.employees_AddToPosition(id, data)
      setPositions([...positions, position])
      message.info(`Thêm vị trí nhân viên ${employee?.firstName} thành công`)
    } catch (e) {
      console.error(e)
      message.error(`Không thể thêm vị trí nhân viên ${employee?.firstName}`)
    }
  }

  return (
    <EmployeeWorkForm
      style={{ marginTop: 25 }}
      action={EmployeeFormAction}
      onSubmit={onSubmit} />
  )
}

export function EmployeeEditPage(props) {
  const api = React.useRef(new EmployeesClient());
  const [employee, setEmployee] = React.useState<EmployeeDTO>()
  const [positions, setPositions] = React.useState<PositionDTO[]>([])
  const id = Number(window.location.pathname.split('/')[2])
  const contextValue = {
    api: api.current,
    id,
    employee,
    setEmployee,
    positions,
    setPositions,
  }

  React.useEffect(() => {
    api.current.employees_GetPosition(id).then(setPositions)
  }, [])

  return (
    <AppBody title='Chỉnh sửa nhân viên'>
      <PageProvider value={contextValue}>
        <Tabs>
          <Tabs.TabPane tab="Thông tin" key="1">
            <Form1 />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Công việc" key="2">
            <Form2 />
            <PositionHistory values={positions}/>
          </Tabs.TabPane>
        </Tabs>
      </PageProvider>
    </AppBody>
  )
}

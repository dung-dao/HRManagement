import React from 'react';
import { Table, message } from 'antd';
import { columns } from './columns';
// import { employees } from '../../data';
import { EmployeesClient, EmployeeDTO } from 'services/ApiClient';

export default function (props) {
  const [employees, setEmployees] = React.useState<EmployeeDTO[]>();
  const api = React.useRef(new EmployeesClient());

  React.useEffect(() => {
    api.current
      .employees_GetAll()
      .then((data) => setEmployees(data))
      .catch((err: Error) => message.error(err.message));
  }, []);

  const onDeleteEmployee = React.useCallback((employeeId) => {
    api.current
      .deleteEmployeeById(employeeId)
      .then(() => {
        setEmployees((employees) => employees?.filter((it) => it.id != employeeId));
        message.info('Xoá nhân viên thành công');
      })
      .catch((err) => message.error('Xoá nhân viên không thành công'));
  }, []);

  return (
    <>
      <Table
        // @ts-ignore
        columns={columns({ onDeleteEmployee })}
        dataSource={employees}
        loading={!employees}
        // pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [5, 10, 20] }}
        scroll={{ x: 'max-content' }}
        locale={{ emptyText: 'Không tìm thấy nhân viên nào' }}
        rowKey={(record) => String(record.id)}
      />
    </>
  );
}

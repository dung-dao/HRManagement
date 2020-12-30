import React from 'react';
import { Table, message } from 'antd';
import { columns } from './columns';
import { EmployeesClient, EmployeeDTO } from 'services/ApiClient';

export default function ({ searchKeyword }) {
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

  const searchRegex = new RegExp(searchKeyword, 'i');
  const finalEmployees = employees?.filter(
    (it) =>
      `${it.firstName} ${it.lastName}`.match(searchRegex) || JSON.stringify(it).match(searchRegex),
  );

  return (
    <>
      <Table
        // @ts-ignore
        columns={columns({ onDeleteEmployee })}
        dataSource={finalEmployees}
        loading={!finalEmployees}
        // pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [5, 10, 20] }}
        scroll={{ x: 'max-content' }}
        locale={{ emptyText: 'Không tìm thấy nhân viên nào' }}
        rowKey={(record) => String(record.id)}
      />
    </>
  );
}

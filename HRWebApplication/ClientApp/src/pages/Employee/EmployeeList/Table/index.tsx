// @ts-nocheck
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
      .then((data) => console.log(data) || setEmployees(data))
      .catch((err: Error) => message.error(err.message));
  }, []);

  return (
    <>
      <Table
        columns={columns}
        dataSource={employees}
        loading={!employees}
        // pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [5, 10, 20] }}
        scroll={{ x: 'max-content' }}
        locale={{ emptyText: 'Không tìm thấy nhân viên nào' }}
      />
    </>
  );
}

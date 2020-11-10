// @ts-nocheck
import React from 'react';
import { Table } from 'antd';
import { columns } from './columns';
// import { employees } from '../../data';
import { EmployeesClient, Employee } from 'services/ApiClient';

export default function (props) {
  const [employees, setEmployees] = React.useState<Employee[]>([]);

  React.useEffect(() => {
    const employeesClient = new EmployeesClient();
    console.log('aa');
    // employeesClient.employees_GetAll().then((data) => {
    //   console.log(data);
    //   setEmployees(data);
    // });
  }, []);

  return (
    <>
      <Table
        columns={columns}
        dataSource={[...employees, ...employees]}
        // pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [5, 10, 20] }}
        scroll={{ x: 'max-content' }}
        locale={{ emptyText: 'Không tìm thấy nhân viên nào' }}
      />
    </>
  );
}

import React from 'react';
import {Result, Button} from 'antd/';

export function EmployeeAddResult(props) {
  return (
    <Result
      status="success"
      title="Nhân viên TODO: Tên được thêm thành công"
      subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      extra={[
        <Button type="primary" key="console">
          Go to employee
        </Button>,
      ]}
    />
  )
}

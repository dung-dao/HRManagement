// @ts-nocheck
import React from 'react';
import { Table } from 'antd';
import { columns } from './columns';
import { employees } from '../../data';

export default function (props) {
  return (
    <>
      <Table
        columns={columns}
        dataSource={[...employees,...employees]}
        // pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [5, 10, 20] }}
        scroll={{ x: 'max-content' }}
        locale={{ emptyText: 'Không tìm thấy nhân viên nào' }}
      />
    </>
  );
}

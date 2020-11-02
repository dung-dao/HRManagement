// @ts-nocheck
import React from 'react';
import { Table } from 'antd';
import { columns } from './columns';
import ConfirmDecisionModal from './ConfirmDecisionModal';
import RepresentativeModal from './RepresentativeModal';

const dataSource = [
  {
    code: 'some thing',
    firstName: 'some thing',
    lastName: 'some thing',
    avatar: 'some thing',
    dateStarted: 'some thing',
    jobTitle: 'some thing',
    department: 'some thing',
    Branch: 'some thing',
    workType: 'some thing',
    phone: 'some thing',
    email: 'some thing',
    facebook: 'some thing',
    dateOfBirth: 'some thing',
    sex: 'some thing',
    contract: 'some thing',
  },
  {
    code: 'some thing',
    firstName: 'some thing',
    lastName: 'some thing',
    avatar: 'some thing',
    dateStarted: 'some thing',
    jobTitle: 'some thing',
    department: 'some thing',
    Branch: 'some thing',
    workType: 'some thing',
    phone: 'some thing',
    email: 'some thing',
    facebook: 'some thing',
    dateOfBirth: 'some thing',
    sex: 'some thing',
    contract: 'some thing',
  },
];

function Index(props) {
  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        // pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [5, 10, 20] }}
        scroll={{ x: 1600 }}
        locale={{ emptyText: 'Không tìm thấy đối tác phù hợp' }}
      />
      <ConfirmDecisionModal />
      <RepresentativeModal />
    </>
  );
}

export default React.memo(Index);

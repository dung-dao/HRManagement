import React from 'react';
import { Table } from 'antd';
import AppBody from 'components/Layouts/AppBody';
import { Api } from './mock-api';
import { OrganizationUnit } from './mock-data';
import { calculateAllExpandedRowKeys } from './util';

const columns = [
  {
    title: 'Tên tổ chức',
    dataIndex: 'organizationName',
  },
  {
    title: 'Số thành viên',
    dataIndex: 'numberOfPeople',
    width: '12%',
  },
  {
    title: 'Trưởng tổ chức',
    dataIndex: 'leader',
    width: '30%',
  },
];

export default function () {
  const [data, setData] = React.useState<OrganizationUnit[]>();
  const [expandedRowKeys, setExpandedRowKeys] = React.useState<string[]>([]);

  React.useEffect(() => {
    const api = new Api();
    api.getOrganizationUnits().then((data) => {
      setData(data);
    });
  }, []);

  React.useEffect(() => {
    setExpandedRowKeys(calculateAllExpandedRowKeys(data, { level: -1, key: 'id' }));
  }, [data]);

  const onExpand = React.useCallback((expanded: boolean, record: OrganizationUnit) => {
    if (expanded) {
      setExpandedRowKeys((old) => old.concat(record.id));
    } else {
      setExpandedRowKeys((old) => old.filter((it) => it !== record.id));
    }
  }, []);

  return (
    <AppBody>
      <Table
        columns={columns}
        dataSource={data}
        loading={!data}
        onExpand={onExpand}
        rowKey={(record) => record.id}
        expandedRowKeys={expandedRowKeys}
        pagination={false} 
        // defaultExpandAllRows={true}
      />
    </AppBody>
  );
}

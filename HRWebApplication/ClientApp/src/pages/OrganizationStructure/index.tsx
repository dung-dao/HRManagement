import React from 'react';
import { Table } from 'antd';
import AppBody from 'components/Layouts/AppBody';
import { columns, getDataTable } from './util';

// rowSelection objects indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

export default function () {
  const [data, setData] = React.useState<any>();

  React.useEffect(() => {
    getDataTable().then((data) => {
      console.log('> : data', data)
      setData(data);
    });
  }, []);

  return (
    <AppBody>
      <Table columns={columns} rowSelection={rowSelection} dataSource={data} />
    </AppBody>
  );
}

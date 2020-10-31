import React from 'react';
import { Table } from 'antd';
import AppBody from 'components/Layouts/AppBody';
import { Api } from './mock-api';
import { organizationUnits } from './mock-data';

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



export interface ICircularData {
  [key: string]: any;
  children: ICircularData[] | null;
}

interface IOptions {
  level?: number; // 展开几层, 默认-1; 小于0, 展开所有; 等于0, 不展开; 大于0, 展开对应的层数;
  key?: string; // rowKey对应的字段, 默认'ID';
}

export const calculateDefaultExpandedRowKeys = function (
  data: ICircularData[],
  options?: IOptions,
) {
  const rowKeys: string[] = [];
  if (!(data && data.length)) {
    return rowKeys;
  }

  const defaultOptions = {
    level: -1,
    key: 'ID',
    ...options,
  };

  const { level, key } = defaultOptions;

  if (!data[0][key]) {
    return rowKeys;
  }

  if (level === 0) {
    return rowKeys;
  }

  const mapRowKeys = function mapRowKeys(source: ICircularData[], currentLevel: number = 1) {
    let keys: string[] = [];
    source.forEach(({ children, ...rest }) => {
      if (children !== null) {
        keys.push(rest[key]);
        if (level < 0 || (level > 0 && level > currentLevel)) {
          const childrenKeys = mapRowKeys(children, currentLevel + 1);
          keys = keys.concat(childrenKeys);
        }
      }
    });
    return keys;
  };

  return mapRowKeys(data);
};

const columns = [
  {
    title: 'Tên tổ chức',
    dataIndex: 'organizationName',
    key: 'organizationName',
  },
  {
    title: 'Số thành viên',
    dataIndex: 'numberOfPeople',
    key: 'numberOfPeople',
    width: '12%',
  },
  {
    title: 'Trưởng tổ chức',
    dataIndex: 'leader',
    key: 'leader',
    width: '30%',
  },
];
export default function () {
  const [data, setData] = React.useState<any>();

  React.useEffect(() => {
    const api = new Api();
    api.getOrganizationUnits().then((data) => {
      setData(data);
    });
  }, []);
  console.log(data);

  return (
    <AppBody>
      <Table
        /*rowSelection={rowSelection}*/
        columns={columns}
        dataSource={data}
        defaultExpandAllRows={true}
        // defaultExpandedRowKeys={calculateDefaultExpandedRowKeys(data)}
        // expandedRowKeys={['organizationName', 'numberOfPeople', 'leader']}
        // expandRowByClick={true}
      />
    </AppBody>
  );
}

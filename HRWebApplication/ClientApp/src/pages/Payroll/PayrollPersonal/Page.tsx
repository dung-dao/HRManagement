import { Col, Input, Row, Table } from 'antd';
import { useSearchKeywork } from 'hooks/useSearchKeyword';
import React from 'react';
import { PaySlipDTO as RecordType } from 'services/ApiClient';
import { apiPayroll } from 'services/ApiClient.singleton';
import { columns } from './columns';

type Props = {};

export const PayrollPersonal: React.FC<Props> = (props) => {
  const [listData, setListData] = React.useState<RecordType[]>([]);
  const [listDataReady, setListDataReady] = React.useState<boolean>(false);

  const { searchRegex, inputSearchProps } = useSearchKeywork();

  const filterData = listData?.filter((it) => JSON.stringify(it).match(searchRegex));

  React.useEffect(() => {
    apiPayroll
      .getMyPayslips()
      .then(setListData)
      .finally(() => setListDataReady(true));
  }, []);

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Input.Search
            size="middle"
            placeholder="Tìm kiếm"
            enterButton
            allowClear
            {...inputSearchProps}
          />
        </Col>
      </Row>
      <Table<RecordType>
        columns={columns}
        dataSource={filterData}
        loading={!listDataReady}
        // pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [5, 10, 20] }}
        scroll={{ x: 'max-content' }}
        locale={{ emptyText: 'Không tìm thấy dữ liệu nào' }}
        rowKey={(record) => String(record.id)}
      />
    </div>
  );
};

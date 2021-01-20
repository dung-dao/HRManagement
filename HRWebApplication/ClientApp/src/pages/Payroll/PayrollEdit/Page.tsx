import { Col, Input, Row, Table } from 'antd';
import { useSearchKeywork } from 'hooks/useSearchKeyword';
import React from 'react';
import { useParams } from 'react-router-dom';
import { PaySlipDTO as RecordType } from 'services/ApiClient';
import { apiPayroll } from 'services/ApiClient.singleton';
import { columns } from './columns';

type Props = {};

export const PayrollEdit: React.FC<Props> = (props) => {
  const [listData, setListData] = React.useState<RecordType[]>([]);
  const [listDataReady, setListDataReady] = React.useState<boolean>(false);

  const { searchRegex, inputSearchProps } = useSearchKeywork();

  const filterData = listData?.filter((it) => JSON.stringify(it).match(searchRegex));

  const { payrollId } = useParams<any>();

  React.useEffect(() => {
    apiPayroll
      .getPaySlips(payrollId)
      .then(setListData)
      .finally(() => setListDataReady(true));
  }, [payrollId]);

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

import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Table } from 'antd';
import { useSearchKeywork } from 'hooks/useSearchKeyword';
import React from 'react';
import { columns } from './columns';
import { usePage, withPageProvider, RecordType } from './PageProvider';

type Props = {};

export const WorkTypes: React.FC<Props> = withPageProvider((props) => {
  const { searchRegex, inputSearchProps } = useSearchKeywork();
  const { listData, listDataReady, setModalVisibleType } = usePage();

  const filterData = listData?.filter((it) => JSON.stringify(it).match(searchRegex));

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
        <Col style={{ marginLeft: 'auto' }}>
          <Button
            type="primary"
            size="middle"
            icon={<PlusOutlined />}
            onClick={() => setModalVisibleType('create')}
          >
            Thêm mới
          </Button>
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
});

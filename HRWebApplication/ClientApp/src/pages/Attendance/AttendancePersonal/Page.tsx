import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Table } from 'antd';
import { useSearchKeywork } from 'hooks/useSearchKeyword';
import React from 'react';
import { columns } from './columns';
import { RecordType, usePage, withPageProvider } from './PageProvider';

type Props = {};

export const AttendancePersonal: React.FC<Props> = withPageProvider((props) => {
  const { listData, listDataReady, modalVisibleType, setModalVisibleType } = usePage();
  const { searchRegex, inputSearchProps } = useSearchKeywork({
    when: () => modalVisibleType === 'hidden',
  });

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

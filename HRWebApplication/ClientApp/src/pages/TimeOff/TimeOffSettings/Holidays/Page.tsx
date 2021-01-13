import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Select, Table } from 'antd';
import { useSearchKeywork } from 'hooks/useSearchKeyword';
import range from 'lodash/range';
import moment from 'moment';
import React from 'react';
import { columns } from './columns';
import { usePage, withPageProvider, RecordType } from './PageProvider';

type Props = {};

export const Holidays: React.FC<Props> = withPageProvider((props) => {
  const {
    listData,
    listDataReady,
    modalVisibleType,
    setModalVisibleType,
    selectedYear,
    setSelectedYear,
  } = usePage();
  const { searchRegex, inputSearchProps } = useSearchKeywork({
    when: () => modalVisibleType === 'hidden',
  });

  const filterData = listData
    ?.filter((it) => JSON.stringify(it).match(searchRegex))
    .filter((it) => !selectedYear || it.from?.getFullYear() === selectedYear);

  const rangeFrom2020ToNextYear = range(2020, moment().year() + 2);

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
        <Col span={4}>
          <Select<number> placeholder="Chọn năm" onChange={setSelectedYear} value={selectedYear}>
            {rangeFrom2020ToNextYear.map((it) => (
              <Select.Option key={it} value={it}>
                {it}
              </Select.Option>
            ))}
          </Select>
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

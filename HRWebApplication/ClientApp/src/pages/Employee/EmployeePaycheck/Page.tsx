import { PlusOutlined } from '@ant-design/icons';
import { Badge, Button, Col, Input, Row, Space, Table } from 'antd';
import { useSearchKeywork } from 'hooks/useSearchKeyword';
import React from 'react';
import { columns } from './columns';
import { RecordType, usePage, withPageProvider } from './PageProvider';

type Props = {};

export const EmployeePaycheck: React.FC<Props> = withPageProvider((props) => {
  const { listData, listDataReady, modalVisibleType, setModalVisibleType } = usePage();
  const { searchRegex, inputSearchProps } = useSearchKeywork({
    when: () => modalVisibleType === 'hidden',
  });

  const filterData = listData?.filter((it) => JSON.stringify(it).match(searchRegex));

  const expandedRowRender = () => {
    const columns = [
      { title: 'Nhân viên', dataIndex: 'date', key: 'date' },
      { title: 'Số ngày công', dataIndex: 'name', key: 'name' },
      { title: 'Số ngày nghỉ', dataIndex: 'name', key: 'name' },
      { title: 'Mức lương', dataIndex: 'name', key: 'name' },
      {
        title: 'Thao tác',
        key: 'action',
        fixed: 'right',
        align: 'center',
        width: '20%',
        render: (value, record, index) => <Button>Loi</Button>,
      },
    ];

    const data = [] as any;
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56',
      });
    }
    //@ts-ignore
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

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
        expandable={{ expandedRowRender }}
        scroll={{ x: 'max-content' }}
        locale={{ emptyText: 'Không tìm thấy dữ liệu nào' }}
        rowKey={(record) => String(record.id)}
      />
    </div>
  );
});

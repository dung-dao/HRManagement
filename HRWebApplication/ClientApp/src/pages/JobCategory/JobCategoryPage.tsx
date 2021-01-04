import React from 'react';

import { JobCategoryDTO, JobCategoryClient } from '../../services/ApiClient';
import { useTry } from '../../hooks';
import { JobCategoryModal } from 'pages/JobCategory/JobCategoryModal';
import { ModalType, PageProvider } from './PageProvider';
import { ActionRenderer } from './ActionRenderer';
import { Table, Button, Col, Row, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const columns = [
  {
    key: 'name',
    title: 'Tên',
    dataIndex: 'name',
  },
  {
    key: 'description',
    title: 'Mô tả',
    dataIndex: 'description',
  },
  {
    title: 'Thao tác',
    key: 'action',
    fixed: 'right',
    align: 'center',
    width: '20%',
    render: ActionRenderer,
  },
];

export function JobCategoryPage(props) {
  const api = React.useRef(new JobCategoryClient());
  const { isPending, $try: tryGetAll, data, setData } = useTry(() =>
    api.current.jobCategory_GetAll(),
  );
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalType, setModalType] = React.useState<ModalType>('add');
  const [record, setRecord] = React.useState<JobCategoryDTO>();
  const searchInputRef = React.useRef<any>();
  const [searchKeyword, setSearchKeyword] = React.useState('');

  const pageContext = {
    modalVisible,
    setModalVisible,
    modalType,
    setModalType,
    record,
    setRecord,
    data: data ?? [],
    setData,
    api: api.current, // won't change
  };

  React.useEffect(() => {
    tryGetAll();
  }, []);

  return (

      <PageProvider value={pageContext}>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Input.Search
              size="middle"
              placeholder="Tìm kiếm loại hình nhân sự"
              enterButton
              allowClear
              ref={searchInputRef}
              onSearch={setSearchKeyword}
            />
          </Col>
          <Col style={{ marginLeft: 'auto' }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="middle"
              onClick={() => {
                setModalVisible(true);
                setModalType('add');
              }}
            >
              Thêm mới
            </Button>
          </Col>
        </Row>
        <Table
          dataSource={data?.filter((it) =>
            JSON.stringify(it).match(new RegExp(searchKeyword, 'i')),
          )}
          // model doesn't have action field
          // @ts-ignore
          columns={columns}
          loading={isPending}
          pagination={false}
          rowKey={(record) => String(record.id)}
          locale={{ emptyText: 'Không tìm thấy loại hình nhân sự nào' }}
        />
        <JobCategoryModal />
      </PageProvider>

  );
}

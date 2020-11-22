import React from 'react';
import AppBody from '../../components/Layouts/AppBody';
import { Table } from 'antd';
import { JobTitleDTO, JobTitleClient } from '../../services/ApiClient';
import { useTry } from '../../hooks';
import { JobTitleModal } from './JobTitleModal';
import { ModalType, PageProvider } from './PageProvider';
import { ActionRenderer } from './ActionRenderer';
import { Button, Col, Row, Input } from 'antd';
import { PlusOutlined, SyncOutlined, UserAddOutlined } from '@ant-design/icons';

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
    key: 'description',
    title: 'Loại hình nhân sự',
    dataIndex: ['jobCategory', 'name'],
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

export function JobTitlePage(props) {
  const api = React.useRef(new JobTitleClient());
  const { isPending, $try: tryGetAll, data, setData } = useTry(() => api.current.jobTitle_GetAll());
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalType, setModalType] = React.useState<ModalType>('add');
  const [record, setRecord] = React.useState<JobTitleDTO>();
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
    <AppBody title="Chức vụ công việc">
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Input.Search
            size="middle"
            placeholder="Tìm kiếm chức vụ công việc"
            enterButton
            allowClear
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
      <PageProvider value={pageContext}>
        <Table
          dataSource={data}
          // model doesn't have action field
          // @ts-ignore
          columns={columns}
          loading={isPending}
          pagination={false}
          rowKey={(record) => String(record.id)}
          locale={{ emptyText: 'Không tìm thấy chức vụ công việc nào' }}
        />
        <JobTitleModal />
      </PageProvider>
    </AppBody>
  );
}

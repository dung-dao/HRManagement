import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Table } from 'antd';
import React from 'react';
import { useTry } from '../../hooks';
import { WorkTypeClient, WorkTypeDTO } from '../../services/ApiClient';
import { ActionRenderer } from './ActionRenderer';
import { ModalType, PageProvider } from './PageProvider';
import { WorkTypeModal } from './WorkTypeModal';


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

export function WorkTypePage(props) {
  const api = React.useRef(new WorkTypeClient());
  const { isPending, $try: tryGetAll, data, setData } = useTry(() => api.current.workType_GetAll());
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalType, setModalType] = React.useState<ModalType>('add');
  const [record, setRecord] = React.useState<WorkTypeDTO>();
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
    <main>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Input.Search
            size="middle"
            placeholder="Tìm kiếm loại công việc"
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
      <PageProvider value={pageContext}>
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
          locale={{ emptyText: 'Không tìm thấy loại công việc nào' }}
        />
        <WorkTypeModal />
      </PageProvider>
    </main>
  );
}

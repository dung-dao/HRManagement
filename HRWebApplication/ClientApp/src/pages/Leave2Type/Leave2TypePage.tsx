import React from 'react';
import AppBody from '../../components/Layouts/AppBody';
import { LeaveTypeClient, LeaveTypeDTO } from '../../services/ApiClient';
import { useTry } from '../../hooks';
import { Leave2TypeModal } from './Leave2TypeModal';
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

export function Leave2TypePage(props) {
  const api = React.useRef(new LeaveTypeClient());
  const { isPending, $try: tryGetAll, data, setData } = useTry(() =>
    api.current.leaveType_GetAll(),
  );
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalType, setModalType] = React.useState<ModalType>('add');
  const [record, setRecord] = React.useState<LeaveTypeDTO>();
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
    <AppBody title="Loại nghỉ việc">
      <PageProvider value={pageContext}>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Input.Search
              size="middle"
              placeholder="Tìm kiếm loại nghỉ việc"
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
        <Table
          dataSource={data}
          // model doesn't have action field
          // @ts-ignore
          columns={columns}
          loading={isPending}
          pagination={false}
          rowKey={(record) => String(record.id)}
          locale={{ emptyText: 'Không tìm thấy loại nghỉ việc nào' }}
        />
        <Leave2TypeModal />
      </PageProvider>
    </AppBody>
  );
}

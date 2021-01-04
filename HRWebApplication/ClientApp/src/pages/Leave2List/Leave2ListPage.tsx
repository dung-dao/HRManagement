import React from 'react';

import { LeaveTypeClient, LeaveTypeDTO } from '../../services/ApiClient';
import { useTry } from '../../hooks';
import { Leave2ListModal } from './Leave2ListModal';
import { ModalType, PageProvider } from './PageProvider';
import { ActionRenderer } from './ActionRenderer';
import { Table, Button, Col, Row, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
// Tên nhân viên, Thời gian bắt đầu, Thời gian kết thúc, Loại nghỉ phép, Lý do, Trạng thái, Actions
//  + Actions: Đang chờ => Phê duyệt, Đã duyệt => Huỷ, Từ chối => Phê duyệt
const columns = [
  {
    key: 'employeeName',
    title: 'Nhân viên',
    dataIndex: 'employeeName',
  },
  {
    key: 'startDate',
    title: 'Thời gian bắt đầu',
    dataIndex: 'startDate',
  },
  {
    key: 'endDate',
    title: 'Thời gian kết thúc',
    dataIndex: 'endDate',
  },
  {
    key: 'leave2Type',
    title: 'Loại nghỉ phép',
    dataIndex: 'leave2Type',
  },
  {
    key: 'reason',
    title: 'Lý do',
    dataIndex: 'reason',
  },
  {
    key: 'status',
    title: 'Trạng thái',
    dataIndex: 'status',
  },

  {
    title: 'Thao tác',
    key: 'action',
    fixed: 'right',
    align: 'left',
    width: '20%',
    render: ActionRenderer,
  },
];

export function Leave2ListPage(props) {
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

      <PageProvider value={pageContext}>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Input.Search
              size="middle"
              placeholder="Tìm kiếm danh sách nghỉ phép"
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
          locale={{ emptyText: 'Không tìm thấy danh sách nghỉ phép nào' }}
        />
        <Leave2ListModal />
      </PageProvider>

  );
}

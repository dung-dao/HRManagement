import React from 'react';
import { Col, Form, Input, message, Row, Tabs } from 'antd';
import AppBody from '../../components/Layouts/AppBody';
import { EmployeeDTO, EmployeesClient, EmployeeStatus, PositionDTO } from 'services/ApiClient';
import { PageProvider, usePage } from './PageProvider';
import { EmployeeInfoForm } from '../Employee/EmployeeInfoForm';
import { EmployeeWorkForm } from '../Employee/EmployeeWorkForm';
import { EmployeeFormAction } from './EmployeeFormAction';
import { PositionHistory } from './PositionHistory';
import { LeaveDetailForm, LeaveDetailModal, useLeaveDetailForm } from './LeaveDetailModal';
import { BeautifyEmployeeStatus } from 'pages/Employee/EmployeeList/Table/utils';
import moment from 'moment';

function Form1() {
  const { api, setEmployee, employee, modalVisible, setModalVisible } = usePage();

  const onSubmit = async (data: EmployeeDTO) => {
    try {
      await api.updateEmployeeById(data.id!, data);
      message.info(`Thay đổi thông tin nhân viên ${data.firstName} thành công`);
      setEmployee(data);
    } catch (e) {
      console.error(e);
      message.error(`Không thể thay đổi thông tin nhân viên ${data.firstName}`);
    }
  };

  React.useEffect(() => {
    const id = Number(window.location.pathname.split('/')[2]);
    api.getEmployeeById(id).then((data) => {
      setEmployee(data);
    });
  }, []);

  return (
    <>
      <EmployeeInfoForm
        style={{ marginTop: 25 }}
        action={EmployeeFormAction}
        onSubmit={onSubmit}
        value={employee}
      />
      <LeaveDetailModal />
    </>
  );
}
function Form2() {
  const {
    api,
    employee,
    setEmployee,
    id,
    positions,
    setPositions,
    currentPosition,
    setCurrentPosition,
  } = usePage();

  // const { form: leaveDetailForm, leaveTypes } = useLeaveDetailForm();
  const onSubmit = async (data: PositionDTO) => {
    try {
      const position = await api.employees_AddToPosition(id, data);
      setPositions([...positions, position]);
      setCurrentPosition(position);
      employee?.status === BeautifyEmployeeStatus.Pending &&
        setEmployee({ ...employee, status: BeautifyEmployeeStatus.Working } as EmployeeDTO);
      message.info(`Thêm vị trí nhân viên ${employee?.firstName} thành công`);
    } catch (e) {
      console.error(e);
      message.error(`Không thể thêm vị trí nhân viên ${employee?.firstName}`);
    }
  };

  // React.useEffect(() => {
  //   if (employee?.status === BeautifyEmployeeStatus.Left) {
  //     leaveDetailForm.setFieldsValue({
  //       ...currentPosition?.leaveDetail,
  //       type: currentPosition?.id,
  //       date: moment(currentPosition?.leaveDetail?.date),
  //     });
  //   }
  // }, [leaveDetailForm, employee?.status]);
  const [form] = Form.useForm();
  const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  React.useEffect(() => {
    if (!currentPosition?.leaveDetail) return;

    form.setFieldsValue({
      date: moment(currentPosition.leaveDetail.date).format('DD-MM-YYYY'),
      type: currentPosition.leaveDetail.type?.name,
      reason: currentPosition.leaveDetail.reason,
    });
  }, [currentPosition?.leaveDetail]);

  return (
    <>
      {employee?.status === BeautifyEmployeeStatus.Left ? (
        <Form {...formLayout} preserve={false} form={form} labelAlign="left">
          <Row gutter={20}>
            <Col span={12}>
              <fieldset>
                <legend>Lý do nghỉ việc:</legend>
                <Form.Item name="date" label="Ngày kết thúc">
                  <Input readOnly />
                </Form.Item>
                <Form.Item name="type" label="Loại lý do">
                  <Input readOnly />
                </Form.Item>
                <Form.Item name="reason" label="Mô tả">
                  <Input.TextArea readOnly />
                </Form.Item>
              </fieldset>
            </Col>
          </Row>
        </Form>
      ) : (
        <EmployeeWorkForm
          style={{ marginTop: 25 }}
          action={EmployeeFormAction}
          onSubmit={onSubmit}
          value={currentPosition}
        />
      )}

      {employee?.status !== BeautifyEmployeeStatus.Pending ? (
        <PositionHistory values={positions} />
      ) : null}
    </>
  );
}

export function EmployeeEditPage(props) {
  const api = React.useRef(new EmployeesClient());
  const [employee, setEmployee] = React.useState<EmployeeDTO>();
  const [positions, setPositions] = React.useState<PositionDTO[]>([]);
  const [currentPosition, setCurrentPosition] = React.useState<PositionDTO>();
  const id = Number(window.location.pathname.split('/')[2]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const contextValue = {
    api: api.current,
    id,
    employee,
    setEmployee,
    positions,
    setPositions,
    currentPosition,
    setCurrentPosition,
    modalVisible,
    setModalVisible,
  };

  React.useEffect(() => {
    api.current.employees_GetPosition(id).then(setPositions);
    api.current.employees_GetCurrentPosition(id).then(setCurrentPosition);
  }, []);

  return (
    <AppBody title="Chỉnh sửa nhân viên">
      <PageProvider value={contextValue}>
        <Tabs>
          <Tabs.TabPane tab="Thông tin" key="1">
            <Form1 />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Công việc" key="2">
            <Form2 />
          </Tabs.TabPane>
        </Tabs>
      </PageProvider>
    </AppBody>
  );
}

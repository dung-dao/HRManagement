import React from 'react';
import { Col, Form, Input, message, Row, Tabs } from 'antd';

import { EmployeeDTO, EmployeesClient, PositionDTO } from 'services/ApiClient';
import { PageProvider, usePage } from './PageProvider';
import { EmployeeInfoForm } from '../Employee/EmployeeInfoForm';
import { EmployeeWorkForm } from '../Employee/EmployeeWorkForm';
import { EmployeeFormAction } from './EmployeeFormAction';
import { PositionHistory } from '../../components/EmployeeWork/PositionHistory';
import { LeaveDetailModal } from './LeaveDetailModal';
import { BeautifyEmployeeStatus } from 'pages/Employee/EmployeeList/__utils';
import moment from 'moment';

function FormInfo() {
  const { api, setEmployee, employee } = usePage();

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

function FormWork() {
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

  const [leaveDetailForm] = Form.useForm();
  const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  React.useEffect(() => {
    const leavePosition = positions.filter((it) => it.leaveDate).sort()?.[0];
    if (!leavePosition) return;

    leaveDetailForm.setFieldsValue({
      leaveDate: moment(leavePosition.leaveDate).format('DD-MM-YYYY'),
      leaveReason: leavePosition.leaveReason,
    });
  }, [positions, leaveDetailForm]);

  return (
    <>
      {employee?.status === BeautifyEmployeeStatus.Left ? (
        <Form {...formLayout} preserve={false} form={leaveDetailForm} labelAlign="left">
          <Row gutter={20}>
            <Col span={12}>
              <fieldset>
                <legend>Lý do nghỉ việc:</legend>
                <Form.Item name="leaveDate" label="Ngày kết thúc">
                  <Input readOnly />
                </Form.Item>
                <Form.Item name="leaveReason" label="Mô tả">
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

      <PageProvider value={contextValue}>
        <Tabs>
          <Tabs.TabPane tab="Thông tin" key="1">
            <FormInfo />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Công việc" key="2">
            <FormWork />
          </Tabs.TabPane>
        </Tabs>
      </PageProvider>

  );
}

import { Col, Form, Input, Skeleton } from 'antd';
import moment from 'moment';
import { formItemLayoutWide } from 'pages/Employee/EmployeeDetail/utils';
import { PositionHistory } from 'pages/__EmployeeEdit/PositionHistory';
import React from 'react';
import { EmployeesClient, PositionDTO } from 'services/ApiClient';
import { ModifyProp, usePage } from './PageProvider';

export function FormWork() {
  const { user } = usePage();
  const [form] = Form.useForm();
  const apiEmployees = React.useRef(new EmployeesClient());
  const [currentPosition, setCurrentPosition] = React.useState<PositionDTO>();
  const [currentPositionReady, setCurrentPositionReady] = React.useState<boolean>(false);
  const [positions, setPositions] = React.useState<PositionDTO[]>();
  const [positionsReady, setPositionsReady] = React.useState<boolean>(false);
  const [someError, setSomeError] = React.useState<boolean>(false);

  const thisAccountHasEmployeeInfo = user?.employee;

  React.useEffect(() => {
    if (!thisAccountHasEmployeeInfo) return;

    try {
      const employeeId = user?.employee?.id!;

      apiEmployees.current
        .employees_GetCurrentPosition(employeeId)
        .then(setCurrentPosition)
        .finally(() => setCurrentPositionReady(true));
      apiEmployees.current
        .employees_GetPosition(employeeId)
        .then(setPositions)
        .finally(() => setPositionsReady(true));
    } catch (err) {
      console.error('Cannot get position', err);
      setSomeError(true);
    }
  }, [thisAccountHasEmployeeInfo]);

  if (!thisAccountHasEmployeeInfo || someError)
    return <h2>Tài khoản này không có dữ liệu về công việc</h2>;

  if (!currentPositionReady || !positionsReady) return <Skeleton />;

  const initialValues = {
    ...currentPosition,
    startDate: moment(currentPosition?.startDate)?.format('DD/MM/YYYY'),
    endDate: moment(currentPosition?.endDate)?.format('DD/MM/YYYY'),
  } as ModifyProp<PositionDTO, Date, string>;

  return (
    <div>
      <Form name="work" form={form} initialValues={initialValues}>
        <Col span={24}>
          <fieldset>
            <legend>Vị trí công việc</legend>
            <Form.Item {...formItemLayoutWide} label="Ngày bắt đầu" name="startDate">
              <Input readOnly />
            </Form.Item>
            <Form.Item {...formItemLayoutWide} label="Ngày kết thúc" name="endDate">
              <Input readOnly />
            </Form.Item>
            <Form.Item {...formItemLayoutWide} label="Lương" name="salary">
              <Input suffix="VNĐ" readOnly />
            </Form.Item>
            <Form.Item {...formItemLayoutWide} label="Vị trí công việc" name={['jobTitle', 'name']}>
              <Input readOnly />
            </Form.Item>
            <Form.Item
              {...formItemLayoutWide}
              label="Loại hình làm việc"
              name={['workType', 'name']}
            >
              <Input readOnly />
            </Form.Item>
            <Form.Item {...formItemLayoutWide} label="Tổ chức" name={['unit', 'name']}>
              <Input readOnly />
            </Form.Item>
          </fieldset>
        </Col>
      </Form>
      {positions ? <PositionHistory values={positions} /> : null}
    </div>
  );
}

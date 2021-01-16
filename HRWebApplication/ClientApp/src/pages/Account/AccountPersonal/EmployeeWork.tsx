import { Col, Form, Input, Skeleton } from 'antd';
import { PositionHistory } from 'pages/Account/AccountPersonal/PositionHistory';
import { formItemLayoutWide } from 'pages/Employee/EmployeeDetail/utils';
import React from 'react';
import { PositionDTO } from 'services/ApiClient';
import { dateToMoment } from 'utils';

type Props = {
  curPosition: PositionDTO | undefined;
  curPositionReady: boolean;
  positions: PositionDTO[] | undefined;
  positionsReady: boolean;
};

export const EmployeeWork: React.FC<Props> = (props) => {
  const { curPosition, curPositionReady, positions, positionsReady } = props;
  const [form] = Form.useForm();

  if (curPositionReady && !curPosition) return <h2>Không có dữ liệu về công việc</h2>;
  if (!curPositionReady || !positionsReady) return <Skeleton />;

  const initialValues = dateToMoment(curPosition!);

  return (
    <div>
      <Form<PositionDTO>
        name="work"
        id="employee-work-form"
        form={form}
        initialValues={initialValues}
      >
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
};

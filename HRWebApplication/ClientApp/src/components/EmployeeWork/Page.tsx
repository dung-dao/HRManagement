import { Col, Form, Input, Skeleton } from 'antd';
import { StandardFormProps } from 'components';
import { PositionHistory } from 'components/EmployeeWork/PositionHistory';
import { formItemLayoutWide } from 'pages/Employee/EmployeeDetail/utils';
import React from 'react';
import { PositionDTO } from 'services/ApiClient';
import { dateToMoment, momentToDate } from 'utils';

type FormDataType = PositionDTO;
type Props = StandardFormProps<FormDataType> & {
  positions: PositionDTO[] | undefined;
  positionsReady: boolean;
};

export const EmployeeWork: React.FC<Props> = (props) => {
  const { data, dataReady, type, positions, positionsReady, onSubmit, actionButtons } = props;
  const [form] = Form.useForm();

  if (type !== 'create' && dataReady && !data) return <h2>Không có dữ liệu</h2>;
  if ((type !== 'create' && !dataReady) || !positionsReady) return <Skeleton />;

  const initialValues = type === 'create' ? undefined : dateToMoment(data!);

  return (
    <div>
      <Form<FormDataType>
        name="employee-work-form"
        id="employee-work-form"
        form={form}
        onFinish={(formData) => onSubmit?.(momentToDate({ ...data, ...formData }) as FormDataType)}
        initialValues={initialValues}
        {...formItemLayoutWide}
      >
        <Col span={24}>
          <fieldset>
            <legend>Vị trí công việc</legend>
            <Form.Item label="Ngày bắt đầu" name="startDate">
              <Input readOnly />
            </Form.Item>
            <Form.Item label="Ngày kết thúc" name="endDate">
              <Input readOnly />
            </Form.Item>
            <Form.Item label="Lương" name="salary">
              <Input suffix="VNĐ" readOnly />
            </Form.Item>
            <Form.Item label="Vị trí công việc" name={['jobTitle', 'name']}>
              <Input readOnly />
            </Form.Item>
            <Form.Item
              {...formItemLayoutWide}
              label="Loại hình làm việc"
              name={['workType', 'name']}
            >
              <Input readOnly />
            </Form.Item>
            <Form.Item label="Tổ chức" name={['unit', 'name']}>
              <Input readOnly />
            </Form.Item>
          </fieldset>
        </Col>
        {actionButtons}
      </Form>
      {positions ? <PositionHistory values={positions} /> : null}
    </div>
  );
};

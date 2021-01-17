import { Col, DatePicker, Form, Input, Row, Skeleton } from 'antd';
import { StandardFormProps } from 'components';
import React from 'react';
import { PositionDTO } from 'services/ApiClient';
import { dateToMoment, formItemLayout, momentToDate, required } from 'utils';

type FormDataType = PositionDTO;
type Props = StandardFormProps<FormDataType>;

export const LeaveForm: React.FC<Props> = (props) => {
  const { data, dataReady, type, onSubmit, actionButtons } = props;
  const [form] = Form.useForm<FormDataType>();

  if (type !== 'create' && dataReady && !data) return <h2>Không có dữ liệu</h2>;
  if (type !== 'create' && !dataReady) return <Skeleton />;

  const initialValues = type === 'create' ? undefined : dateToMoment(data!);

  return (
    <Form<FormDataType>
      name="leave-form"
      id="leave-form"
      form={form}
      initialValues={initialValues}
      onFinish={(formData) => onSubmit?.(momentToDate({ ...data, ...formData }) as FormDataType)}
      {...formItemLayout}
    >
      <Row gutter={20}>
        <Col span={12}>
          <fieldset>
            <legend>Lý do nghỉ việc:</legend>
            <Form.Item
              name="leaveDate"
              label="Ngày kết thúc"
              rules={type === 'create' ? [required('Ngày kết thúc')] : undefined}
            >
              <DatePicker
                format="DD/MM/YYYY"
                style={{ width: '100%' }}
                open={type === 'read-only' ? false : undefined}
                allowClear={type === 'read-only' ? false : undefined}
                inputReadOnly={type === 'read-only'}
              />
            </Form.Item>
            <Form.Item name="leaveReason" label="Mô tả">
              <Input.TextArea readOnly={type === 'read-only'} />
            </Form.Item>
          </fieldset>
        </Col>
      </Row>
      {actionButtons}
    </Form>
  );
};

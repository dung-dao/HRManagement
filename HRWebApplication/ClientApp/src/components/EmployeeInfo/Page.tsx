import { Col, DatePicker, Form, Input, Row, Select, Skeleton, Tag } from 'antd';
import { StandardFormProps } from 'components';
import { phoneRegex, required } from 'pages/Employee/EmployeeDetail/utils';
import React from 'react';
import { EmployeeDTO } from 'services/ApiClient';
import { dateToMoment, formItemLayout, mapWorkingStatusToTag, momentToDate } from 'utils';

type FormDataType = EmployeeDTO;
type Props = StandardFormProps<FormDataType>;

export const EmployeeInfo: React.FC<Props> = (props) => {
  const { data, dataReady, type, onSubmit, actionButtons } = props;
  const [form] = Form.useForm<FormDataType>();

  if (type !== 'create' && dataReady && !data) return <h2>Không có dữ liệu</h2>;
  if (type !== 'create' && !dataReady) return <Skeleton />;

  const initialValues = type === 'create' ? undefined : dateToMoment(data!);

  return (
    <Form<FormDataType>
      form={form}
      onFinish={(formData) => onSubmit?.(momentToDate({ ...data, ...formData }) as FormDataType)}
      initialValues={initialValues}
      labelAlign="left"
      id="employee-info-form"
      {...formItemLayout}
    >
      <Row gutter={40}>
        <Col span={12}>
          <Form.Item name="status">
            <Tag
              {...mapWorkingStatusToTag[data?.status!]}
              style={{ fontSize: 15, margin: '10px 0 0 10px' }}
              onClick={() => {}}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={40}>
        <Col span={12}>
          <fieldset>
            <legend>Thông tin cá nhân:</legend>
            <Form.Item label="ID" hidden name="id" rules={[required('Họ')]}>
              <Input readOnly={type === 'read-only'} />
            </Form.Item>
            <Form.Item label="Họ" name="firstName" rules={[required('Họ')]}>
              <Input readOnly={type === 'read-only'} placeholder="Nguyễn" />
            </Form.Item>
            <Form.Item label="Tên" name="lastName" rules={[required('Tên')]}>
              <Input readOnly={type === 'read-only'} placeholder="Văn A" />
            </Form.Item>
            <Form.Item label="Ngày sinh" name="dateOfBirth" rules={[required('Ngày sinh')]}>
              <DatePicker
                format="DD/MM/YYYY"
                style={{ width: '100%' }}
                open={type === 'read-only' ? false : undefined}
                allowClear={type === 'read-only' ? false : undefined}
                inputReadOnly={type === 'read-only'}
              />
            </Form.Item>
            <Form.Item label="Giới tính" name="sex" rules={[required('Giới tính')]}>
              <Select placeholder="Chọn giới tính" open={type === 'read-only' ? false : undefined}>
                <Select.Option value="Male">Nam</Select.Option>
                <Select.Option value="Female">Nữ</Select.Option>
                <Select.Option value="Other">Khác</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="CMND"
              name="nationalId"
              rules={[
                required('CMND'),
                {
                  validator: (_, value: string) =>
                    value === '' ||
                    value === undefined || // "required" rule is already handled by above rule, so we will ignore this case to avoid 2 annoying messages
                    (value && /^\d+$/.test(value) && (value.length === 9 || value.length === 12))
                      ? Promise.resolve()
                      : Promise.reject('CMND phải có 9 hoặc 12 chữ số'),
                  validateTrigger: 'onBlur',
                },
              ]}
            >
              <Input readOnly={type === 'read-only'} placeholder="123456789" />
            </Form.Item>
          </fieldset>
        </Col>
        <Col span={12}>
          <fieldset>
            <legend>Thông tin liên lạc:</legend>
            <Form.Item
              label="Email cá nhân"
              name="personalEmail"
              rules={[
                required('Email cá nhân'),
                { type: 'email', message: 'Địa chỉ email không đúng định dạng' },
              ]}
            >
              <Input
                readOnly={type === 'read-only'}
                placeholder="nguyenvana@gmail.com"
                type="email"
              />
            </Form.Item>
            <Form.Item
              label="Email công việc"
              name="workEmail"
              rules={[
                required('Email công việc'),
                { type: 'email', message: 'Địa chỉ email không đúng định dạng' },
              ]}
            >
              <Input
                readOnly={type === 'read-only'}
                placeholder="nguyenvana@gmail.com"
                type="email"
              />
            </Form.Item>
            <Form.Item label="Địa chỉ hiện tại" name="currentAddress" rules={[required('Địa chỉ')]}>
              <Input
                readOnly={type === 'read-only'}
                placeholder="147/40D Tân Lập 2, Hiệp Phú, Quận 9, TPHCM"
              />
            </Form.Item>
            <Form.Item label="Địa chỉ thường trú" name="address" rules={[required('Địa chỉ')]}>
              <Input
                readOnly={type === 'read-only'}
                placeholder="147/40D Tân Lập 2, Hiệp Phú, Quận 9, TPHCM"
              />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                required('Số điện thoại'),
                {
                  pattern: phoneRegex,
                  min: 9,
                  max: 12,
                  message: 'Số điện thoại phải bắt dầu bằng (0|84|+84) và theo sau 9 chữ số`',
                },
              ]}
            >
              <Input readOnly={type === 'read-only'} placeholder="0123456789" />
            </Form.Item>
          </fieldset>
        </Col>
      </Row>
      {actionButtons}
      {/*TODO:REWORK {readOnly ? null : (
        <div style={{ display: 'flex', justifyContent: 'flex-end', columnGap: 10 }}>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Cập nhật thông tin
          </Button>
        </div>
      )} */}
    </Form>
  );
};

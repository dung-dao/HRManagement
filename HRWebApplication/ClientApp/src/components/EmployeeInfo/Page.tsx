import { Col, DatePicker, Form, Input, Row, Select, Skeleton, Tag } from 'antd';
import { StandardFormProps } from 'components';
import { phoneRegex, required } from 'pages/Employee/EmployeeDetail/utils';
import React from 'react';
import { EmployeeDTO } from 'services/ApiClient';
import { dateToMoment, formItemLayout, mapWorkingStatusToTag, momentToDate } from 'utils';

type FormDataType = EmployeeDTO;
type Props = StandardFormProps<FormDataType>;

export const EmployeeInfo: React.FC<Props> = (props) => {
  const { data, dataReady, type, onSubmit, actionButtons, displayLegend, ...rest } = props;
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
      {...rest}
    >
      {type !== 'create' ? (
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
      ) : undefined}
      <Row gutter={40}>
        <Col span={12}>
          <fieldset>
            {displayLegend ? <legend>Thông tin cá nhân:</legend> : null}
            <Form.Item
              label="ID"
              hidden
              name="id"
              rules={type !== 'read-only' ? [required('Họ')] : undefined}
            >
              <Input readOnly={type === 'read-only'} />
            </Form.Item>
            <Form.Item
              label="Họ"
              name="firstName"
              rules={type !== 'read-only' ? [required('Họ')] : undefined}
            >
              <Input readOnly={type === 'read-only'} placeholder="Nguyễn" />
            </Form.Item>
            <Form.Item
              label="Tên"
              name="lastName"
              rules={type !== 'read-only' ? [required('Tên')] : undefined}
            >
              <Input readOnly={type === 'read-only'} placeholder="Văn A" />
            </Form.Item>
            <Form.Item
              label="Ngày sinh"
              name="dateOfBirth"
              rules={type !== 'read-only' ? [required('Ngày sinh')] : undefined}
            >
              <DatePicker
                format="DD/MM/YYYY"
                style={{ width: '100%' }}
                open={type === 'read-only' ? false : undefined}
                allowClear={type === 'read-only' ? false : undefined}
                inputReadOnly={type === 'read-only'}
              />
            </Form.Item>
            <Form.Item
              label="Giới tính"
              name="sex"
              rules={type !== 'read-only' ? [required('Giới tính')] : undefined}
            >
              <Select placeholder="Chọn giới tính" open={type === 'read-only' ? false : undefined}>
                <Select.Option value="Male">Nam</Select.Option>
                <Select.Option value="Female">Nữ</Select.Option>
                <Select.Option value="Other">Khác</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="CMND"
              name="nationalId"
              rules={
                type !== 'read-only'
                  ? [
                      required('CMND'),
                      {
                        validator: (_, value: string) =>
                          value === '' ||
                          value === undefined || // "required" rule is already handled by above rule, so we will ignore this case to avoid 2 annoying messages
                          (value &&
                            /^\d+$/.test(value) &&
                            (value.length === 9 || value.length === 12))
                            ? Promise.resolve()
                            : Promise.reject('CMND phải có 9 hoặc 12 chữ số'),
                        validateTrigger: 'onBlur',
                      },
                    ]
                  : undefined
              }
            >
              <Input readOnly={type === 'read-only'} placeholder="123456789" />
            </Form.Item>
          </fieldset>
        </Col>
        <Col span={12}>
          <fieldset>
            {displayLegend ? <legend>Thông tin liên lạc:</legend> : null}
            <Form.Item
              label="Email cá nhân"
              name="personalEmail"
              rules={
                type !== 'read-only'
                  ? [
                      required('Email cá nhân'),
                      { type: 'email', message: 'Địa chỉ email không đúng định dạng' },
                    ]
                  : undefined
              }
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
              rules={
                type !== 'read-only'
                  ? [
                      required('Email công việc'),
                      { type: 'email', message: 'Địa chỉ email không đúng định dạng' },
                    ]
                  : undefined
              }
            >
              <Input
                readOnly={type === 'read-only'}
                placeholder="nguyenvana@gmail.com"
                type="email"
              />
            </Form.Item>
            <Form.Item
              label="Địa chỉ hiện tại"
              name="currentAddress"
              rules={type !== 'read-only' ? [required('Địa chỉ')] : undefined}
            >
              <Input
                readOnly={type === 'read-only'}
                placeholder="147/40D Tân Lập 2, Hiệp Phú, Quận 9, TPHCM"
              />
            </Form.Item>
            <Form.Item
              label="Địa chỉ thường trú"
              name="address"
              rules={type !== 'read-only' ? [required('Địa chỉ')] : undefined}
            >
              <Input
                readOnly={type === 'read-only'}
                placeholder="147/40D Tân Lập 2, Hiệp Phú, Quận 9, TPHCM"
              />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={
                type !== 'read-only'
                  ? [
                      required('Số điện thoại'),
                      {
                        pattern: phoneRegex,
                        min: 9,
                        max: 12,
                        message: 'Số điện thoại phải bắt dầu bằng (0|84|+84) và theo sau 9 chữ số`',
                      },
                    ]
                  : undefined
              }
            >
              <Input readOnly={type === 'read-only'} placeholder="0123456789" />
            </Form.Item>
          </fieldset>
        </Col>
      </Row>
      {actionButtons}
    </Form>
  );
};

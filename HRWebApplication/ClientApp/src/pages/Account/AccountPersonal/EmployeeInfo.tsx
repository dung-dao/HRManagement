import { Button, Col, DatePicker, Form, Input, message, Row, Select, Skeleton, Tag } from 'antd';
import { phoneRegex, required } from 'pages/Employee/EmployeeDetail/utils';
import React from 'react';
import { EmployeeDTO } from 'services/ApiClient';
import { apiEmployees } from 'services/ApiClient.singleton';
import { dateToMoment, formItemLayout, mapWorkingStatusToTag } from 'utils';

type Props = {
  employee: EmployeeDTO | undefined;
  employeeReady: boolean;
  readOnly: boolean;
};

export const EmployeeInfo: React.FC<Props> = (props) => {
  const { employee, employeeReady, readOnly } = props;
  const [form] = Form.useForm<EmployeeDTO>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  if (employeeReady && !employee) return <h2>Không có dữ liệu về nhân viên</h2>;
  if (!employeeReady) return <Skeleton />;

  const onSubmitProfile = async () => {
    try {
      setIsSubmitting(true);
      const updatedEmployee = form.getFieldsValue();
      await apiEmployees.updateEmployeeById(employee?.id!, updatedEmployee);
      message.info('Cập nhật thành công');
    } catch {
      message.error('Cập nhật thất bại');
    } finally {
      setIsSubmitting(false);
    }
  };

  const initialValues = dateToMoment(employee!);

  return (
    <Form<EmployeeDTO>
      form={form}
      onFinish={onSubmitProfile}
      initialValues={initialValues}
      labelAlign="left"
    >
      <Row gutter={40}>
        <Col span={12}>
          <Form.Item {...formItemLayout} name="status">
            <Tag
              {...mapWorkingStatusToTag[employee?.status!]}
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
            <Form.Item {...formItemLayout} label="ID" hidden name="id" rules={[required('Họ')]}>
              <Input readOnly={readOnly} />
            </Form.Item>
            <Form.Item {...formItemLayout} label="Họ" name="firstName" rules={[required('Họ')]}>
              <Input readOnly={readOnly} placeholder="Nguyễn" />
            </Form.Item>
            <Form.Item {...formItemLayout} label="Tên" name="lastName" rules={[required('Tên')]}>
              <Input readOnly={readOnly} placeholder="Văn A" />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Ngày sinh"
              name="dateOfBirth"
              rules={[required('Ngày sinh')]}
            >
              <DatePicker
                format="DD/MM/YYYY"
                style={{ width: '100%' }}
                open={readOnly ? false : undefined}
                allowClear={readOnly ? false : undefined}
                inputReadOnly={readOnly}
              />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Giới tính"
              name="sex"
              rules={[required('Giới tính')]}
            >
              <Select placeholder="Chọn giới tính" open={readOnly ? false : undefined}>
                <Select.Option value="Male">Nam</Select.Option>
                <Select.Option value="Female">Nữ</Select.Option>
                <Select.Option value="Other">Khác</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              {...formItemLayout}
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
              <Input readOnly={readOnly} placeholder="123456789" />
            </Form.Item>
          </fieldset>
        </Col>
        <Col span={12}>
          <fieldset>
            <legend>Thông tin liên lạc:</legend>
            <Form.Item
              {...formItemLayout}
              label="Email cá nhân"
              name="personalEmail"
              rules={[
                required('Email cá nhân'),
                { type: 'email', message: 'Địa chỉ email không đúng định dạng' },
              ]}
            >
              <Input readOnly={readOnly} placeholder="nguyenvana@gmail.com" type="email" />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Email công việc"
              name="workEmail"
              rules={[
                required('Email công việc'),
                { type: 'email', message: 'Địa chỉ email không đúng định dạng' },
              ]}
            >
              <Input readOnly={readOnly} placeholder="nguyenvana@gmail.com" type="email" />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Địa chỉ hiện tại"
              name="currentAddress"
              rules={[required('Địa chỉ')]}
            >
              <Input readOnly={readOnly} placeholder="147/40D Tân Lập 2, Hiệp Phú, Quận 9, TPHCM" />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Địa chỉ thường trú"
              name="address"
              rules={[required('Địa chỉ')]}
            >
              <Input readOnly={readOnly} placeholder="147/40D Tân Lập 2, Hiệp Phú, Quận 9, TPHCM" />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
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
              <Input readOnly={readOnly} placeholder="0123456789" />
            </Form.Item>
          </fieldset>
        </Col>
      </Row>
      {readOnly ? null : (
        <div style={{ display: 'flex', justifyContent: 'flex-end', columnGap: 10 }}>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Cập nhật thông tin
          </Button>
        </div>
      )}
    </Form>
  );
};

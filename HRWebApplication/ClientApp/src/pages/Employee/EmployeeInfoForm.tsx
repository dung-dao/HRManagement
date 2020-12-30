import React from 'react';
import { Col, DatePicker, Form, Input, Row, Select, Tag } from 'antd';
import { formItemLayout, phoneRegex, required } from './EmployeeDetail/utils';
import { EmployeeInfoFormType } from 'pages/Employee/EmployeeInfoFormType';
import { EmployeeDTO } from 'services/ApiClient';
import { useTry } from '../../hooks';
import moment from 'moment';
import { mapStatusToTagProps } from './EmployeeList/Table/utils';

type EmployeeFormProps = {
  action: any;
  style?: object;
  onSubmit: (value: EmployeeDTO) => Promise<any>;
  value?: EmployeeDTO;
};

export function EmployeeInfoForm(props: EmployeeFormProps) {
  const { action: FormAction, style = { marginTop: 10 }, onSubmit, value } = props;
  const [form] = Form.useForm<EmployeeInfoFormType>();
  const onFormSubmit = async (data) => {
    const submitData = { ...data, dateOfBirth: data.dateOfBirth.toDate() };
    await onSubmit(submitData);
  };
  const { $try: trySubmitting, isPending } = useTry(onFormSubmit);
  const [, forceRender] = React.useReducer((x) => ++x, 0);

  const initialValues = React.useMemo(
    () => ({ ...value, dateOfBirth: value ? moment(value?.dateOfBirth) : undefined }),
    [value],
  );

  React.useEffect(() => {
    form.setFieldsValue(initialValues);
    forceRender();
  }, [form, initialValues]);

  return (
    <Form
      name="info"
      form={form}
      style={style}
      onFinish={trySubmitting}
      labelAlign="left"
      initialValues={initialValues}
    >
      {window.location.pathname.includes('new') ? (
        <Row gutter={40}>
          <Col span={12}>
            <fieldset>
              <legend>Thông tin tài khoản:</legend>
              <Form.Item
                {...formItemLayout}
                label="Tài khoản"
                name="userName"
                rules={[{ required: true, message: 'Tài khoản không được bỏ trống' }]}
              >
                <Input placeholder="user001" />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: true, message: 'Mật khẩu hiện tại không được bỏ trống' },
                  { min: 6, message: 'Mật khẩu phải dài ít nhất 6 ký tự' },
                ]}
              >
                <Input.Password placeholder="password" />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Nhập lại mật khẩu"
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Mật khẩu hiện tại không được bỏ trống' },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('Nhập lại mật khẩu không khớp');
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="password" />
              </Form.Item>
            </fieldset>
          </Col>
        </Row>
      ) : (
        <Row gutter={40}>
          <Col span={12}>
            <Form.Item {...formItemLayout} name="status">
              <Tag
                {...mapStatusToTagProps[form.getFieldValue('status')]}
                style={{ fontSize: 14, marginLeft: 10 }}
                onClick={() => {}}
              />
            </Form.Item>
          </Col>
        </Row>
      )}
      <Row gutter={40}>
        <Col span={12}>
          <fieldset>
            <legend>Thông tin cá nhân:</legend>
            <Form.Item {...formItemLayout} label="ID" hidden name="id">
              <Input />
            </Form.Item>
            <Form.Item {...formItemLayout} label="Họ" name="firstName" rules={[required('Họ')]}>
              <Input placeholder="Nguyễn" />
            </Form.Item>
            <Form.Item {...formItemLayout} label="Tên" name="lastName" rules={[required('Tên')]}>
              <Input placeholder="Văn A" />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Ngày sinh"
              name="dateOfBirth"
              rules={[required('Ngày sinh')]}
            >
              <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Giới tính"
              name="sex"
              rules={[required('Giới tính')]}
            >
              <Select placeholder="Chọn giới tính">
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
              <Input placeholder="123456789" />
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
              <Input placeholder="nguyenvana@gmail.com" type="email" />
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
              <Input placeholder="nguyenvana@gmail.com" type="email" />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Địa chỉ hiện tại"
              name="currentAddress"
              rules={[required('Địa chỉ')]}
            >
              <Input placeholder="147/40D Tân Lập 2, Hiệp Phú, Quận 9, TPHCM" />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Địa chỉ thường trú"
              name="address"
              rules={[required('Địa chỉ')]}
            >
              <Input placeholder="147/40D Tân Lập 2, Hiệp Phú, Quận 9, TPHCM" />
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
              <Input placeholder="0123456789" />
            </Form.Item>
          </fieldset>
        </Col>
      </Row>
      <FormAction form={form} loading={isPending} />
    </Form>
  );
}

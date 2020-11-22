import React from 'react';
import {Col, DatePicker, Form, Input, Row, Select} from "antd";
import {formItemLayout, phoneRegex, required} from "./EmployeeDetail/utils";
import {EmployeeInfoFormType} from "pages/Employee/EmployeeInfoFormType";
import {EmployeeDTO} from "services/ApiClient";
import {useTry} from "../../hooks";
import moment from 'moment';

type EmployeeFormProps = {
  action: any;
  style?: object;
  onSubmit: (value: EmployeeDTO) => Promise<any>
  value?: EmployeeDTO
}

export function EmployeeInfoForm(props: EmployeeFormProps) {
  const { action: FormAction, style = {}, onSubmit, value } = props
  const [form] = Form.useForm<EmployeeInfoFormType>();
  const initialValues = { ...value, dateOfBirth: moment(value?.dateOfBirth) }
  const onFormSubmit = async (data) => {
    const submitData = { ...data, dateOfBirth: data.dateOfBirth.toDate() }
    await onSubmit(submitData)
  }
  const { $try: trySubmitting, isPending } = useTry(onFormSubmit)

  React.useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [form, initialValues])

  return (
    <Form name='info' form={form} style={style} onFinish={trySubmitting} labelAlign="left" initialValues={initialValues}>
      <Row gutter={40}>
        <Col span={12}>
          <fieldset>
            <legend>Thông tin cá nhân:</legend>
            <Form.Item {...formItemLayout} label="ID" hidden name="id" rules={[required('Họ')]}>
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
  )
}

import React from 'react';
import { Form, Row, Col, Input, DatePicker, Select, message } from 'antd';
import { EmployeesClient, EmployeeDTO } from 'services/ApiClient';
import moment from 'moment';
import { formItemLayout, required, phoneRegex } from 'pages/Employee/EmployeeDetail/utils';
import { DetailPageType } from '../utils';
import { FooterButtons } from '../FooterButtons/FooterButtons';
import isEqual from 'lodash/isEqual';

type EmployeeFormType = Omit<EmployeeDTO, 'dateOfBirth'> & {
  dateOfBirth: moment.Moment;
};

export const InfoTab: React.FC<{
  detailPageType: DetailPageType;
  employeeId: number;
  apiEmployee: React.MutableRefObject<EmployeesClient>;
}> = ({ detailPageType, employeeId, apiEmployee }) => {
  const [form] = Form.useForm<EmployeeFormType>();
  const lastFormSnapshot = React.useRef(form.getFieldsValue());

  const onSnapshot = React.useCallback(() => {
    // called when the user clicks on "Hoàn thành",
    // to snapshot the last updated data,
    // if data has not changed, when later we don't
    // have to update them again
    lastFormSnapshot.current = form.getFieldsValue();
  }, [form]);

  React.useEffect(() => {
    // if currently in edit page, then get the initial data
    if (detailPageType === 'edit') {
      apiEmployee.current
        .getEmployeeById(employeeId)
        .then((data) => {
          form.setFieldsValue({
            ...data,
            dateOfBirth: moment(data.dateOfBirth),
          });
          onSnapshot();
        })
        .catch((err) => console.log(err));
    }
  }, [form, detailPageType, employeeId, apiEmployee, onSnapshot]);

  const onFormSubmit = React.useCallback(() => {
    if (detailPageType === 'add') {
      apiEmployee.current
        .createEmployee({
          ...form.getFieldsValue(),
          dateOfBirth: form.getFieldValue('dateOfBirth'),
        } as EmployeeDTO)
        .then(() => {
          message.info('Thêm mới nhân viên thành công');
          form.resetFields();
        })
        .catch((err) => {
          console.log(err);
          message.error('Không thể thêm mới nhân viên');
        });
    } else {
      console.log('dob', form.getFieldValue('dateOfBirth'));
      if (isEqual(lastFormSnapshot.current, form.getFieldsValue())) {
        message.info('Chưa có thay đổi gì mới');
        return;
      }

      apiEmployee.current
        .updateEmployeeById(employeeId, {
          id: employeeId,
          ...form.getFieldsValue(),
          dateOfBirth: form.getFieldValue('dateOfBirth'),
        } as EmployeeDTO)
        .then(() => {
          message.info('Cập nhật nhân viên thành công');
          onSnapshot();
        })
        .catch((err) => {
          console.log(err);
          message.error('Không thể cập nhật nhân viên');
        });
    }
  }, []);

  return (
    <Form form={form} onFinish={onFormSubmit} labelAlign="left">
      <Row gutter={40}>
        <Col span={12}>
          <fieldset>
            <legend>Thông tin cá nhân:</legend>
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
      <FooterButtons />
    </Form>
  );
};

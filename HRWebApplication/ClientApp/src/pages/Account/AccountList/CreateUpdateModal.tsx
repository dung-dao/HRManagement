import { Col, Form, Input, message, Modal, Row, Select } from 'antd';
import { useRerender } from 'hooks/useRerender';
import React from 'react';
import { EmployeeDTO, TimeOffTypeDTO } from 'services/ApiClient';
import { apiEmployees, apiTimeOffType } from 'services/ApiClient.singleton';
import { formItemLayout, required } from 'utils';
import { RecordType, usePage } from './PageProvider';

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
} as const;

const actionVietnamese = {
  create: 'Tạo',
  update: 'Chỉnh sửa',
} as const;

const noun = 'tài khoản' as const;

type FormType = RecordType;

export const CreateUpdateModal: React.FC<{}> = () => {
  const { modalVisibleType, setModalVisibleType, selectedRecord, onUpdate, onCreate } = usePage();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [form] = Form.useForm<FormType>();

  const VerbNoun = actionVietnamese[modalVisibleType] + ' ' + noun;

  const [employees, setEmployees] = React.useState<EmployeeDTO[]>([]);
  const [employeesReady, setEmployeesReady] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchTimeOffTypes = async () => {
      try {
        const data = await apiEmployees.employees_GetAll();
        setEmployees(data);
      } catch (err) {
        console.error(err);
        message.error('Không thể tải dữ liệu');
      } finally {
        setEmployeesReady(true);
      }
    };
    fetchTimeOffTypes();
  }, []);

  const formTypeToRecordType = (formValues: FormType): RecordType => {
    return formValues as RecordType;
  };

  const recordTypeToFormType = (record: RecordType): FormType => {
    return record;
  };

  const onSubmit = async (values: FormType) => {
    try {
      setIsSubmitting(true);
      const record = formTypeToRecordType(values);
      console.log('>  ~ file: CreateUpdateModal.tsx ~ record', record);
      if (modalVisibleType === 'update') {
        await onUpdate(record);
      } else if (modalVisibleType === 'create') {
        await onCreate(record);
      }
      setModalVisibleType('hidden');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const initialValues = React.useMemo(
    () => (modalVisibleType === 'update' ? recordTypeToFormType(selectedRecord!) : undefined),
    [modalVisibleType, selectedRecord],
  );

  // Form.initialValues doesn't work really well so we need this useEffect
  React.useEffect(() => {
    initialValues && form.setFieldsValue(initialValues);
  }, [modalVisibleType, initialValues, form]);

  return (
    <Modal
      title={VerbNoun}
      visible={modalVisibleType !== 'hidden'}
      centered
      okButtonProps={{
        htmlType: 'submit',
        form: 'create-update-form',
      }}
      onCancel={() => setModalVisibleType('hidden')}
      width={600}
      confirmLoading={isSubmitting}
    >
      <Form<FormType>
        form={form}
        initialValues={initialValues}
        labelAlign="left"
        name="account-form"
        id="account-form"
        // onFinish={(formData) => onSubmit?.({ ...data, ...formData } as RecordType)}
        {...formItemLayout}
      >
        <Row gutter={40}>
          <Col span={24}>
            <Form.Item label="Tài khoản" name="userName" rules={[required('Tài khoản')]}>
              <Input placeholder="user001" readOnly={modalVisibleType !== 'create'} />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email' },
                { type: 'email', message: 'Email không đúng định dạng' },
              ]}
            >
              <Input placeholder="Email" readOnly={modalVisibleType !== 'create'} />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                { required: true, message: 'Mật khẩu hiện tại không được bỏ trống' },
                { min: 6, message: 'Mật khẩu phải dài ít nhất 6 ký tự' },
              ]}
            >
              <Input.Password placeholder="password" />
            </Form.Item>
            {modalVisibleType === 'create' ? (
              <Form.Item
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
            ) : null}
            <Form.Item label="Quyền" name="role" rules={[required('Quyền')]}>
              <Select placeholder="Chọn quyền">
                <Select.Option value="Manager">Quản lý</Select.Option>
                <Select.Option value="User">Nhân viên</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Nhân viên" name="employee" hasFeedback={!employeesReady}>
              <Select placeholder="Chọn nhân viên">
                {employees.map((it) => (
                  <Select.Option value={it.id!.toString()} key={it.id}>
                    {it.firstName + ' ' + it.lastName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

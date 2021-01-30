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

type FormType = {
  role: RecordType['role'];
};

export const CreateUpdateModal: React.FC<{}> = () => {
  const { modalVisibleType, setModalVisibleType, selectedRecord, onUpdateRole } = usePage();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [form] = Form.useForm<FormType>();

  const VerbNoun = actionVietnamese[modalVisibleType] + ' ' + noun;

  const onSubmit = async (values: FormType) => {
    try {
      setIsSubmitting(true);
      if (modalVisibleType === 'role') {
        onUpdateRole(selectedRecord?.id!, form.getFieldValue('role'));
      }
      setModalVisibleType('hidden');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const initialValues = React.useMemo(
    () => (modalVisibleType === 'role' ? { role: selectedRecord?.role } : undefined),
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
        name="create-update-form"
        id="create-update-form"
        onFinish={onSubmit}
        {...formItemLayout}
      >
        <Row gutter={40}>
          <Col span={24}>
            <Form.Item label="Quyền" name="role" rules={[required('Quyền')]}>
              <Select placeholder="Chọn quyền">
                <Select.Option value="Manager">Quản lý</Select.Option>
                <Select.Option value="User">Nhân viên</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

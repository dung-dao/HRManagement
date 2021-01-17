import { Button, Col, Form, Input, Row, Skeleton } from 'antd';
import React from 'react';
import { UserDTO } from 'services/ApiClient';
import { ChangeMyPasswordModal } from './ChangeMyPasswordModal';
import { formItemLayout } from 'utils';
import { StandardFormProps } from 'components';

type FormDataType = UserDTO;
type Props = StandardFormProps<FormDataType>;

export const AccountForm: React.FC<Props> = (props) => {
  const { data, dataReady, type, onSubmit, actionButtons } = props;
  const [form] = Form.useForm<FormDataType>();
  const [passwordModalVisible, setPasswordModalVisible] = React.useState(false);

  if (type !== 'create' && dataReady && !data) return <h2>Không có dữ liệu</h2>;
  if (type !== 'create' && !dataReady) return <Skeleton />;

  const initialValues = type === 'create' ? undefined : data;

  return (
    <div>
      <Form<FormDataType>
        form={form}
        initialValues={initialValues}
        labelAlign="left"
        name="account-form"
        id="account-form"
        onFinish={(formData) => onSubmit?.({ ...data, ...formData } as FormDataType)}
        {...formItemLayout}
      >
        <Row gutter={40}>
          <Col span={12}>
            <fieldset>
              <legend>Thông tin tài khoản:</legend>
              <Form.Item label="Tài khoản" name="userName">
                <Input placeholder="admin" readOnly={type === 'read-only'} />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input placeholder="admin@company.com" readOnly={type === 'read-only'} />
              </Form.Item>
              <Form.Item label="Mật khẩu" name="password">
                <Button onClick={() => setPasswordModalVisible(true)}>Đổi mật khẩu</Button>
              </Form.Item>
            </fieldset>
          </Col>
        </Row>
        {actionButtons}
      </Form>
      <ChangeMyPasswordModal visible={passwordModalVisible} setVisible={setPasswordModalVisible} />
    </div>
  );
};

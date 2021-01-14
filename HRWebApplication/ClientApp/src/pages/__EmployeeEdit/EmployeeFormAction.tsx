import React from 'react';
import { FormInstance } from 'antd/lib/form';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { __DEV__ } from '../../const';
import { autofill } from '../Employee';
import { usePage } from './PageProvider';
import { BeautifyEmployeeStatus } from 'pages/Employee/EmployeeList/__utils';

type FormActionProps = {
  form: FormInstance;
  loading: boolean;
};

export function EmployeeFormAction(props: FormActionProps) {
  const { form, loading } = props;
  const { name } = form.__INTERNAL__;
  const history = useHistory();
  const fillForm = () => autofill(form);
  const { employee, setModalVisible } = usePage();

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', columnGap: 10 }}>
      {employee?.status === BeautifyEmployeeStatus.Working ? (
        <Button onClick={() => setModalVisible?.(true)} danger>
          Kết thúc hợp đồng
        </Button>
      ) : null}
      <Button onClick={() => history.push('/employees')}>Quay lại</Button>
      {employee?.status === BeautifyEmployeeStatus.Left ? null : (
        <Button type="primary" htmlType="submit" loading={loading}>
          {name === 'info' ? 'Lưu thay đổi' : 'Cập nhật công việc'}
        </Button>
      )}
      {__DEV__ && name === 'work' && (
        <Button type="primary" onClick={fillForm}>
          Autofill
        </Button>
      )}
    </div>
  );
}

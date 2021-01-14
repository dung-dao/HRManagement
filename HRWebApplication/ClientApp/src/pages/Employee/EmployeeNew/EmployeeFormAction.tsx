import { Button } from 'antd';
import { FormInstance } from 'antd/lib/form';
import React from 'react';
import { __DEV__ } from 'const';
import { autofill } from '../autofill';
import { usePage } from './PageProvider';

type FormActionProps = {
  form: FormInstance;
  loading: boolean;
};
export function EmployeeFormAction(props: FormActionProps) {
  const { form, loading } = props;
  const { prevPage, currentPage, steps, setPosition } = usePage();
  const previous = () => {
    setPosition(form.getFieldsValue());
    prevPage();
  };
  const fillForm = () => autofill(form);

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', columnGap: 10 }}>
      {currentPage > 0 && <Button onClick={previous}>Quay lại</Button>}
      {currentPage < steps.length - 1 && (
        <Button type="primary" htmlType="submit" loading={loading}>
          Kế tiếp
        </Button>
      )}
      {currentPage === steps.length - 1 && (
        <Button type="primary" htmlType="submit" loading={loading}>
          Thêm nhân viên
        </Button>
      )}
      {__DEV__ && (
        <Button type="primary" onClick={fillForm}>
          Autofill
        </Button>
      )}
    </div>
  );
}

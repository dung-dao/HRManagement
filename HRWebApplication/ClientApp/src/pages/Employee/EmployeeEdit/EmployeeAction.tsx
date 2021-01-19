import { Button } from 'antd';
import React from 'react';
import { EmployeeStatus } from 'services/ApiClient';
import { usePage } from './PageProvider';

type Props = {
  isSubmitting: boolean;
};

export const EmployeeAction: React.FC<Props> = (props) => {
  const { isSubmitting } = props;
  const { setModalVisible, employee } = usePage();

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', columnGap: 10 }}>
      {employee?.status === EmployeeStatus.Working ? (
        <Button onClick={() => setModalVisible(true)} danger>
          Kết thúc hợp đồng
        </Button>
      ) : null}
      <Button type="primary" htmlType="submit" loading={isSubmitting}>
        Cập nhật thông tin
      </Button>
    </div>
  );
};

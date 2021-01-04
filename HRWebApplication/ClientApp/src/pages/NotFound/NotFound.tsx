import { Button, Result } from 'antd';
import React from 'react';

export function NotFound({ history }) {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Không tìm thấy trang"
      extra={
        <Button type="primary" onClick={() => history.goBack()}>
          Quay lại
        </Button>
      }
    />
  );
}

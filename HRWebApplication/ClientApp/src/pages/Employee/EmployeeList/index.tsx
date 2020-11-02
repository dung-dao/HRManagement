import React from 'react';
import AppBody from 'components/Layouts/AppBody';
import { Space } from 'antd';
import Header from './Header';
import Table from './Table';

function Index() {
  return (
    <AppBody>
      <Space direction="vertical" className="flex">
        <Header />
        <Table />
      </Space>
    </AppBody>
  );
}

export default React.memo(Index);

import React, { useEffect } from 'react';
import AppBody from '../../../../components/Layouts/AppBody';
import * as Constant from '../../../../common/Constant';
import { Space } from 'antd';
import Header from './Header';
import Table from './Table';

function Index() {
  return (
    <AppBody selectedMenu={Constant.MENU.MERCHANTS_PAGE} title="Quản lý đối tác">
      <Space direction="vertical" className="flex">
        <Header />
        <Table />
      </Space>
    </AppBody>
  );
}

export default React.memo(Index);

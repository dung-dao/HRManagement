import { Tabs } from 'antd';
import React from 'react';

import { FormInfo } from '../FormInfo';
import { FormWork } from '../FormWork';
import { PageProvider } from '../PageProvider';

export function AccountPersonal(props) {
  return (
    <PageProvider>
      <Tabs>
        <Tabs.TabPane tab="Thông tin" key="1">
          <FormInfo />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Công việc" key="2">
          <FormWork />
        </Tabs.TabPane>
      </Tabs>
    </PageProvider>
  );
}

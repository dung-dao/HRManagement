import { Tabs } from 'antd';
import React from 'react';
import AppBody from 'components/Layouts/AppBody';
import { FormInfo } from './FormInfo';
import { FormWork } from './FormWork';
import { PageProvider } from './PageProvider';

export function ProfilePage(props) {
  return (
    <AppBody title="Tài khoản">
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
    </AppBody>
  );
}

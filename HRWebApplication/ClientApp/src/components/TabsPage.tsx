import React from 'react';
import { Tabs } from 'antd';

type Props = {
  tabs: TabUnit[];
};

type TabUnit = {
  key: string;
  label: string;
  Component: React.FC;
};

export const TabsPage: React.FC<Props> = (props) => {
  const { tabs } = props;

  return (
    <Tabs defaultActiveKey={tabs[0].key}>
      {tabs.map(({ key, label, Component }) => (
        <Tabs.TabPane tab={label} key={key}>
          <Component />
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
};

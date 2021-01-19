import { Skeleton } from 'antd';
import { AccountForm, EmployeeInfo, EmployeeWork, TabsPage } from 'components';
import React from 'react';
import { usePage, withPageProvider } from './PageProvider';

const AccountFormWrapped: React.FC = () => {
  const { user, userReady } = usePage();
  return <AccountForm data={user} dataReady={userReady} type="update" displayLegend />;
};

const EmployeeInfoWrapped: React.FC = () => {
  const { employee, employeeReady } = usePage();
  return <EmployeeInfo data={employee} dataReady={employeeReady} type="read-only" displayLegend />;
};

const EmployeeWorkWrapped: React.FC = () => {
  const { curPosition, curPositionReady, positions, positionsReady } = usePage();
  return (
    <EmployeeWork
      data={curPosition}
      dataReady={curPositionReady}
      positions={positions}
      positionsReady={positionsReady}
      type="read-only"
    />
  );
};

const accountTabs = [
  {
    key: 'AccountForm',
    label: 'Tài khoản',
    Component: AccountFormWrapped,
  },
];

const employeeTabs = [
  {
    key: 'EmployeeInfo',
    label: 'Thông tin',
    Component: EmployeeInfoWrapped,
  },
  {
    key: 'FormWork',
    label: 'Công việc',
    Component: EmployeeWorkWrapped,
  },
];

type Props = {};

export const AccountPersonal: React.FC<Props> = withPageProvider((props) => {
  const { user, userReady } = usePage();

  if (!userReady) return <Skeleton />;

  if (user?.employee) return <TabsPage tabs={[...accountTabs, ...employeeTabs]} />;

  return <TabsPage tabs={accountTabs} />;
});

import { TabsPage } from 'components';
import { EmployeeEditPage } from 'pages/__EmployeeEdit';
import React from 'react';
import { EmployeeInfo, AccountForm } from 'components';
import { usePage, withPageProvider } from './PageProvider';

const EmployeeInfoWrapped: React.FC = () => {
  const { employee, employeeReady } = usePage();
  return <EmployeeInfo data={employee} dataReady={employeeReady} type="read-only" />;
};

const AccountPageWrapped: React.FC = () => {
  const { user, userReady } = usePage();
  return <AccountForm user={user} userReady={userReady} />;
};

const tabs = [
  {
    key: 'AccountPage',
    label: 'Tài khoản',
    Component: AccountPageWrapped,
  },
  {
    key: 'EmployeeInfo',
    label: 'Thông tin',
    Component: EmployeeInfoWrapped,
  },
  {
    key: 'FormWork',
    label: 'Công việc',
    Component: EmployeeEditPage,
  },
];

type Props = {};

export const AccountPersonal: React.FC<Props> = withPageProvider((props) => {
  return <TabsPage tabs={tabs} />;
});

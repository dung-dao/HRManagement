import { Skeleton } from 'antd';
import { TabsPage } from 'components';
import React from 'react';
import { EmployeeInfoWrapped } from './EmployeeInfoWrapped';
import { EmployeeWorkWrapped } from './EmployeeWorkWrapped';
import { usePage, withPageProvider } from './PageProvider';

const tabs = [
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

export const EmployeeEdit: React.FC<Props> = withPageProvider((props) => {
  const { employee, employeeReady } = usePage();

  if (!employeeReady) return <Skeleton />;
  if (!employee) return <h2>Không tồn tại nhân viên</h2>;

  return <TabsPage tabs={tabs} />;
});

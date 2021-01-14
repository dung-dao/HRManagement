import { TabsPage } from 'components/TabsPage';
import React from 'react';
import { JobCategories } from './JobCategories';
import { JobTitles } from './JobTitles';
import { WorkTypes } from './WorkTypes';

const tabs = [
  {
    key: 'JobCategories',
    label: 'Loại hình nhân sự',
    Component: JobCategories,
  },
  {
    key: 'JobTitles',
    label: 'Chức vụ',
    Component: JobTitles,
  },
  {
    key: 'WorkTypes',
    label: 'Loại công việc',
    Component: WorkTypes,
  },
];

export const EmployeeSettings = () => <TabsPage tabs={tabs} />;

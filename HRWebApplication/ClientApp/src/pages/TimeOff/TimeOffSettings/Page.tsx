import { TabsPage } from 'components/TabsPage';
import React from 'react';
import { TimeOffTypes } from './TimeOffTypes';

const tabs = [
  {
    key: 'TimeOffTypes',
    label: 'Loại nghỉ phép',
    Component: TimeOffTypes,
  },
  {
    key: 'Holidays',
    label: 'Nghỉ lễ',
    Component: TimeOffTypes,
  },
];

export const TimeOffSettings = () => <TabsPage tabs={tabs} />;

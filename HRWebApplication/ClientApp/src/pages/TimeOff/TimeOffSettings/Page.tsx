import { TabsPage } from 'components/TabsPage';
import React from 'react';
import { TimeOffTypes } from './TimeOffTypes';
import { Holidays } from './Holidays';

const tabs = [
  {
    key: 'TimeOffTypes',
    label: 'Loại nghỉ phép',
    Component: TimeOffTypes,
  },
  {
    key: 'Holidays',
    label: 'Nghỉ lễ',
    Component: Holidays,
  },
];

export const TimeOffSettings = () => <TabsPage tabs={tabs} />;

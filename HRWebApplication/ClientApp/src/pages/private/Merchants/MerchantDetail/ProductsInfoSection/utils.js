import React from 'react';
import { WomanOutlined, ManOutlined, TeamOutlined } from '@ant-design/icons';

export const genderCodeToTagProps = {
  0: {
    children: 'Nữ',
    icon: <WomanOutlined />,
  },
  1: {
    children: 'Nam',
    icon: <ManOutlined />,
  },
  2: {
    children: 'Cả hai',
    icon: <TeamOutlined />,
  },
};

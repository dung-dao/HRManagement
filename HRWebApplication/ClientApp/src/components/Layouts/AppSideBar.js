import {
  SolutionOutlined,
  ApartmentOutlined,
  TeamOutlined,
  IdcardOutlined,
  GoldOutlined,
  ReconciliationOutlined,
  ExceptionOutlined,
  BuildOutlined,
  CarryOutOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Logo = styled.div`
  height: 64px;
  margin-right: 5px;
  background: rgb(2, 34, 62);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LogoHead = styled.h1`
  color: white;
  padding-top: 10px;
  padding-left: 5px;
`;

const menuItems = [
  {
    key: 'organization',
    url: '/organization',
    icon: <ApartmentOutlined />,
    label: 'Tổ chức',
  },
  {
    key: 'employee',
    url: '/employees',
    icon: <TeamOutlined />,
    label: 'Nhân viên',
  },
  {
    key: 'job-title',
    url: '/job-title',
    icon: <IdcardOutlined />,
    label: 'Chức vụ công việc',
  },
  {
    key: 'job-category',
    url: '/job-category',
    icon: <GoldOutlined />,
    label: 'Loại hình nhân sự',
  },
  {
    key: 'work-type',
    url: '/work-type',
    icon: <ReconciliationOutlined />,
    label: 'Loại công việc',
  },
  {
    key: 'leave-type',
    url: '/leave-type',
    icon: <ExceptionOutlined />,
    label: 'Loại nghỉ việc',
  },
  {
    key: 'leave2-type',
    url: '/leave2-type',
    icon: <BuildOutlined />,
    label: 'Loại nghỉ phép',
  },
  {
    key: 'leave2-list',
    url: '/leave2-list',
    icon: <CarryOutOutlined />,
    label: 'Danh sách nghỉ phép',
  },
];

export default function AppSidebar() {
  const getSelectedKey = () => {
    for (const { key } of menuItems) {
      if (window.location.pathname.includes(key)) return key;
    }
  };

  return (
    <Layout.Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        top: 0,
        left: 0,
      }}
    >
      <Logo>
        <Button type="primary" icon={<SolutionOutlined style={{ fontSize: 24 }} />} size="large" />
        <LogoHead>HR Management</LogoHead>
      </Logo>
      <Menu theme="dark" mode="inline" selectedKeys={[getSelectedKey()]} style={{ marginTop: 20 }}>
        {menuItems.map(({ key, url, icon, label }) => (
          <Menu.Item key={key}>
            {icon} <Link to={url}>{label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Layout.Sider>
  );
}

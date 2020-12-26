import {
  ApartmentOutlined,
  TeamOutlined,
  IdcardOutlined,
  GoldOutlined,
  ReconciliationOutlined,
  ExceptionOutlined,
  BuildOutlined,
  CarryOutOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, Tooltip } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from 'context/AuthContext';
import authService from 'services/AuthService';

const LogoHead = styled.h1`
  color: white;
  display: grid;
  place-content: center;
  padding: 1.25em 1.5em 1.25em 0;
  background: rgb(2, 34, 62);
`;

const LogoutButton = styled.div`
  margin-top: auto;
  text-align: center;
  padding: 1.25em;
  background: rgb(2, 34, 62);

  > button {
    background: transparent !important;
    color: white;
    border: none;
  }
`;

const SiderContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
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
  const { userRole, userProfile } = useAuth();

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
      <SiderContainer>
        <LogoHead>
          <Tooltip title={'Role: ' + userRole}>
            <UserOutlined style={{ marginRight: 10, fontSize: 22 }} />
            {userProfile?.username}
          </Tooltip>
        </LogoHead>
        <Menu theme="dark" mode="inline" selectedKeys={[getSelectedKey() || '']}>
          {menuItems.map(({ key, url, icon, label }) => (
            <Menu.Item key={key}>
              {icon} <Link to={url}>{label}</Link>
            </Menu.Item>
          ))}
        </Menu>
        <LogoutButton>
          <Tooltip title="Log out">
            <Button
              icon={<LogoutOutlined style={{ fontSize: 24 }} />}
              size="large"
              onClick={authService.signOut}
            />
          </Tooltip>
        </LogoutButton>
      </SiderContainer>
    </Layout.Sider>
  );
}

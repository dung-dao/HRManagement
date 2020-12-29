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
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from 'context/AuthContext';
import authService from 'services/AuthService';
import { isRoleValid } from 'services/AuthService.util';

const LogoHead = styled.h1`
  color: white;
  display: grid;
  place-content: center;
  padding: 1.25em 1.5em 1.25em 0;
  background: rgb(2, 34, 62);

  .profile-button {
    cursor: pointer;
  }
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
    key: 'me',
    url: '/me',
    icon: <UserOutlined />,
    label: 'Tài khoản',
    requireRole: { type: '>=', role: 'User' },
  },
  {
    key: 'organization',
    url: '/organization',
    icon: <ApartmentOutlined />,
    label: 'Tổ chức',
    requireRole: { type: '>=', role: 'Manager' },
  },
  {
    key: 'employee',
    url: '/employees',
    icon: <TeamOutlined />,
    label: 'Nhân viên',
    requireRole: { type: '>=', role: 'Manager' },
  },
  {
    key: 'job-title',
    url: '/job-title',
    icon: <IdcardOutlined />,
    label: 'Chức vụ công việc',
    requireRole: { type: '>=', role: 'Manager' },
  },
  {
    key: 'job-category',
    url: '/job-category',
    icon: <GoldOutlined />,
    label: 'Loại hình nhân sự',
    requireRole: { type: '>=', role: 'Manager' },
  },
  {
    key: 'work-type',
    url: '/work-type',
    icon: <ReconciliationOutlined />,
    label: 'Loại công việc',
    requireRole: { type: '>=', role: 'Manager' },
  },
  {
    key: 'leave-type',
    url: '/leave-type',
    icon: <ExceptionOutlined />,
    label: 'Loại nghỉ phép',
    requireRole: { type: '>=', role: 'Manager' },
  },
  {
    key: 'leave2-list',
    url: '/leave2-list',
    icon: <CarryOutOutlined />,
    label: 'Danh sách nghỉ phép',
    requireRole: { type: '>=', role: 'Manager' },
  },
] as const;

export default function AppSidebar() {
  const getSelectedKey = () => {
    for (const { key } of menuItems) {
      if (window.location.pathname.includes(key)) return key;
    }
  };
  const { userRole, userProfile } = useAuth();
  const history = useHistory();

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
            <div className="profile-button" onClick={() => history.push('/me')}>
              <UserOutlined style={{ marginRight: 10, fontSize: 22 }} />
              {userProfile?.username}
            </div>
          </Tooltip>
        </LogoHead>
        <Menu theme="dark" mode="inline" selectedKeys={[getSelectedKey() || '']}>
          {menuItems.map(({ key, url, icon, label, requireRole }) =>
            isRoleValid(requireRole, userRole) ? (
              <Menu.Item key={key}>
                {icon} <Link to={url}>{label}</Link>
              </Menu.Item>
            ) : null,
          )}
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

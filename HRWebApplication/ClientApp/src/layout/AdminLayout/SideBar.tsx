import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, Tooltip } from 'antd';
import { useAuth } from 'context/AuthContext';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getSelectedMenuItemKey, RouteItem, ROUTES, routes } from 'routes';
import authService from 'services/AuthService';
import { isRoleValid } from 'services/AuthService.util';
import styled from 'styled-components';

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

const MenuContainer = styled.div`
  overflow-y: auto;
  height: 100%;
  position: sticky;
  top: 0;
  left: 0;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const LayoutSider = styled(Layout.Sider)`
  --width: 240px;
  flex: 0 0 var(--width) !important;
  max-width: var(--width) !important;
  width: var(--width) !important;
  height: 100vh;
  position: sticky;
  top: 0;
  left: 0;
`;

export function Sidebar() {
  const { userRole, userProfile } = useAuth();
  const history = useHistory();

  return (
    <LayoutSider>
      <SiderContainer>
        <LogoHead>
          <Tooltip title={'Role: ' + userRole}>
            <div className="profile-button" onClick={() => history.push(ROUTES.accountPersonal)}>
              <UserOutlined style={{ marginRight: 10, fontSize: 22 }} />
              {userProfile?.username}
            </div>
          </Tooltip>
        </LogoHead>
        <MenuContainer>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[getSelectedMenuItemKey()]}
            defaultOpenKeys={routes.map((it) => it.path)}
          >
            {routes.map((routeItem) => {
              const renderMenuItem = ({ path, requireRole, menuItem }: RouteItem) => {
                if (!menuItem || !isRoleValid(requireRole, userRole)) return null;

                return (
                  <Menu.Item key={path} icon={menuItem.icon} title={menuItem.label}>
                    <Link to={path}>{menuItem.label}</Link>
                  </Menu.Item>
                );
              };

              if (routeItem.menuItem?.children && isRoleValid(routeItem.requireRole, userRole)) {
                return (
                  <Menu.SubMenu
                    key={routeItem.path}
                    icon={routeItem.menuItem.icon}
                    title={routeItem.menuItem.label}
                  >
                    {routeItem.menuItem.children.map((routeItem) => renderMenuItem(routeItem))}
                  </Menu.SubMenu>
                );
              }

              return renderMenuItem(routeItem);
            })}
          </Menu>
        </MenuContainer>
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
    </LayoutSider>
  );
}

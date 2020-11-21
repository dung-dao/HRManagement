import React, { Component } from 'react';
import { Layout, Menu, Button } from 'antd';
import { HomeOutlined, DashboardOutlined, ShopOutlined, ShopFilled } from '@ant-design/icons';
import * as Constant from '../../common/Constant';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
const { Sider } = Layout;

class AppSidebar extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    const { selectedMenu, openMenu } = this.props;
    return (
      <Sider
        collapsible
        onCollapse={this.onCollapse}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'sticky',
          top: 0,
          left: 0,
        }}
      >
        <Logo>
          <Button type="primary" icon={<ShopOutlined style={{ fontSize: 28 }} />} size="large" />
          {!collapsed && <LogoHead>ADMIN CENTER</LogoHead>}
        </Logo>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={selectedMenu}
          defaultOpenKeys={[openMenu]}
        >
          <Menu.Item key={'/organization'}>
            <DashboardOutlined />
            <Link to={'/organization'}>Tổ chức</Link>
          </Menu.Item>
          <Menu.Item key={'/employees'}>
            <DashboardOutlined />
            <Link to={'/employees'}>Nhân viên</Link>
          </Menu.Item>
          <Menu.Item key={'/work-type'}>
            <DashboardOutlined />
            <Link to={'/work-type'}>Loại công việc</Link>
          </Menu.Item>
          <Menu.Item key={'/job-category'}>
            <DashboardOutlined />
            <Link to={'/job-category'}>Loại hình nhân sự</Link>
          </Menu.Item>
          {/* <Menu.Item key={Constant.MENU.MERCHANTS_PAGE}>
            <ShopFilled />
            <span>Đối tác</span>
            <Link to={Constant.ROUTER_URL.MERCHANTS_PAGE}></Link>
          </Menu.Item>
          <Menu.Item key="statistics">
            <HomeOutlined />
            <span>Thống kê</span>
          </Menu.Item>
          <Menu.SubMenu key={Constant.MENU.PARENT_CATEGORY_MENU} title={<span>Danh mục</span>}>
            <Menu.Item key={Constant.MENU.ATTRIBUTE_MENU}>
              <span>Quản lý thuộc tính</span>
              <Link to={Constant.ROUTER_URL.ATTRIBUTE_PAGE} />
            </Menu.Item>
            <Menu.Item key={Constant.MENU.GROUP_SET_ATTR_MENU}>
              <span>Nhóm thuộc tính </span>
              <Link to={Constant.ROUTER_URL.GROUP_SET_ATTRIBUTE_PAGE} />
            </Menu.Item>
            <Menu.Item key={Constant.MENU.CATEGORY_MENU}>
              <span>Quản lý danh mục</span>
              <Link to={Constant.ROUTER_URL.CATEGORY_PAGE} />
            </Menu.Item>
          </Menu.SubMenu> */}
        </Menu>
      </Sider>
    );
  }
}

export default AppSidebar;

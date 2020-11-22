import {
  SolutionOutlined,
  ApartmentOutlined,
  TeamOutlined,
  IdcardOutlined,
  GoldOutlined,
  ReconciliationOutlined,
  ExceptionOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
const { Sider } = Layout;

export default function AppSidebar() {
  const { pathname } = useLocation();
  const getSelectedKey = () => {
    if (pathname.includes('organization')) return 'organization';
    if (pathname.includes('employee')) return 'employee';
    if (pathname.includes('job-title')) return 'job-title';
    if (pathname.includes('job-category')) return 'job-category';
    if (pathname.includes('work-type')) return 'work-type';
    if (pathname.includes('leave-type')) return 'leave-type';
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
        <Menu.Item key={'organization'} active>
          <ApartmentOutlined /> <Link to={'/organization'}>Tổ chức</Link>
        </Menu.Item>
        <Menu.Item key={'employee'}>
          <TeamOutlined /> <Link to={'/employees'}>Nhân viên</Link>
        </Menu.Item>
        <Menu.Item key={'job-title'}>
          <IdcardOutlined /> <Link to={'/job-title'}>Chức vụ công việc</Link>
        </Menu.Item>
        <Menu.Item key={'job-category'}>
          <GoldOutlined /> <Link to={'/job-category'}>Loại hình nhân sự</Link>
        </Menu.Item>
        <Menu.Item key={'work-type'}>
          <ReconciliationOutlined /> <Link to={'/work-type'}>Loại công việc</Link>
        </Menu.Item>
        <Menu.Item key={'leave-type'}>
          <ExceptionOutlined /> <Link to={'/leave-type'}>Loại nghỉ việc</Link>
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
    </Layout.Sider>
  );
}

import React, { Component } from 'react';
import { Layout, Breadcrumb, Typography } from 'antd';
import AppSidebar from './AppSideBar';
import AppHeader from './AppHeader';

const { Title } = Typography;

const breadCrumbs = {
  admin: 'Trang chủ',
  'confirm-products': 'Quản lý sản phẩm',
  staff: 'Nhân viên',
  merchants: 'Quản lý đối tác',
  'merchant-add': 'Thêm mới đối tác',
  'merchant-detail': 'Chi tiết đối tác',
  'employee': 'Nhân viên',
  'employees': 'Nhân viên',
  'organization': 'Tổ chức',
  'job-category': 'Loại hình nhân sự',
  'job-title': 'Chức vụ công việc',
  'work-type': 'Loại công việc',
  'add': 'Thêm',
  'new': 'Thêm mới',
  'edit': 'Chỉnh sửa',
  'leave-type': 'Loại nghỉ việc',
};

const breadcrumbStyle = {
  padding: '8px 10px',
  backgroundColor: 'white',
  margin: '8px 0',
};

class AppBody extends Component {
  loadBreadCrumbs = () => {
    const paths = window.location.pathname.split('/');
    let breadCrumbArr = [];
    for (var i = 1; i < paths.length; i++) {
      if (breadCrumbs[paths[i]]) {
        breadCrumbArr.push(breadCrumbs[paths[i]]);
      } else {
        breadCrumbArr.push(paths[i]);
      }
    }
    return breadCrumbArr;
  };

  render() {
    const { title } = this.props;
    const breadCrumbArr = this.loadBreadCrumbs().map((i) => (
      <Breadcrumb.Item key={i}>
        <Title style={{ margin: 0, display: 'contents' }} level={5}>
          {i}
        </Title>
      </Breadcrumb.Item>
    ));
    return (
      <Layout style={{ minHeight: '100vh' }} id="parent-layout">
        <AppSidebar />
        <Layout>
          <AppHeader title={title} />
          <Layout.Content style={{ margin: '0 8px', overflow: 'initial' }}>
            <Breadcrumb style={breadcrumbStyle}>{breadCrumbArr}</Breadcrumb>
            <div style={{ padding: 16, background: '#fff' }}>{this.props.children}</div>
          </Layout.Content>
          <Layout.Footer style={{ textAlign: 'center' }}>© 2020 HR Management</Layout.Footer>
        </Layout>
      </Layout>
    );
  }
}

export default AppBody;

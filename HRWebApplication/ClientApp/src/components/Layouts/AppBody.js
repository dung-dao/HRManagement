import React, { Component } from 'react';
import AppSidebar from './AppSideBar';
import AppHeader from './AppHeader';
import { Layout, Breadcrumb } from 'antd';

const breadCrumbs = {
  admin: 'Trang chủ',
  'confirm-products': 'Quản lý sản phẩm',
  staff: 'Nhân viên',
  merchants: 'Quản lý đối tác',
  'merchant-add': 'Thêm mới đối tác',
  'merchant-detail': 'Chi tiết đối tác',
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
    const { selectedMenu, title, openMenu } = this.props;
    const breadCrumbArr = this.loadBreadCrumbs().map((i) => (
      <Breadcrumb.Item key={i}>{i}</Breadcrumb.Item>
    ));
    return (
      <Layout style={{ minHeight: '100vh' }} id="parent-layout">
        <AppSidebar selectedMenu={selectedMenu} openMenu={openMenu} />
        <Layout>
          <AppHeader title={title} />
          <Layout.Content style={{ margin: '0 8px', overflow: 'initial' }}>
            <Breadcrumb style={{ margin: '8px 0' }}>{breadCrumbArr}</Breadcrumb>
            <div style={{ padding: 16, background: '#fff' }}>{this.props.children}</div>
          </Layout.Content>
          <Layout.Footer style={{ textAlign: 'center' }}>
            © 2020 WeWear. All rights reserved
          </Layout.Footer>
        </Layout>
      </Layout>
    );
  }
}

export default AppBody;

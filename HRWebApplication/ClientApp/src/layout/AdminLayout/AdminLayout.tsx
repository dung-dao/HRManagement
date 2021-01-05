import { Layout } from 'antd';
import { LayoutProps } from 'layout';
import React from 'react';
import { Breadcrumb } from './Breadcrumb';
import { Sidebar } from './SideBar';

export const AdminLayout: React.FC<LayoutProps> = (props) => {
  const { children } = props;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout style={{ height: '100%' }}>
        <Layout.Content style={{ margin: '0 8px', overflow: 'initial' }}>
          <Breadcrumb />
          <div style={{ padding: 16, background: '#fff' }}>{children}</div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

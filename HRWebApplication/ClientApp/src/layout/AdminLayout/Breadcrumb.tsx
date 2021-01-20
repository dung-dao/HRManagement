import { Breadcrumb as AntdBreadCrumb, Typography } from 'antd';
import React from 'react';
import { ROUTES } from 'routes';
import styled from 'styled-components';

const extractBreadcrumb = {
  report: 'Thống kê',
  account: 'Tài khoản',
  employee: 'Nhân viên',
  'time-off': 'Nghỉ phép',
  attendance: 'Chấm công',
  payroll: 'Bảng tính lương',
  settings: 'Cài đặt',
  personal: 'Của tôi',
  team: 'Của nhóm',
  list: 'Danh sách',
  organization: 'Cơ cấu tổ chức',
  new: 'Thêm mới',
  edit: 'Chỉnh sửa',
} as const;

const StyledAntdBreadcrumb = styled(AntdBreadCrumb)`
  padding: 8px 10px;
  background-color: white;
  margin: 8px 0;
`;

export function Breadcrumb() {
  const loadBreadCrumbs = () => {
    return window.location.pathname
      .replace(process.env.PUBLIC_URL + ROUTES.app, '')
      .split('/')
      .filter((it) => it)
      .map((slug) => extractBreadcrumb[slug] || slug);
  };

  return (
    <StyledAntdBreadcrumb>
      {loadBreadCrumbs().map((it) => (
        <AntdBreadCrumb.Item key={it}>
          <Typography.Title style={{ margin: 0, display: 'contents' }} level={5}>
            {it}
          </Typography.Title>
        </AntdBreadCrumb.Item>
      ))}
    </StyledAntdBreadcrumb>
  );
}

import {
  ApartmentOutlined,
  CarryOutOutlined,
  FundOutlined,
  ProfileOutlined,
  SettingOutlined,
  TableOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { AdminLayout, LayoutProps } from 'layout';
import {
  AccountList,
  AccountPersonal,
  AttendanceList,
  AttendancePersonal,
  AttendanceSettings,
  AttendanceTeam,
  EmployeeEdit,
  EmployeeList,
  EmployeeNew,
  EmployeeOrganization,
  EmployeeSettings,
  LoginPage,
  ReportPage,
  TimeOffList,
  TimeOffPersonal,
  TimeOffSettings,
  TimeOffTeam,
} from 'pages';
import React from 'react';
import { RouteProps } from 'react-router-dom';
import { RoleRequired } from 'services/AuthService.util';

export const ROUTES = {
  login: '/login',
  app: '/app',

  report: '/app/report',

  account: '/app/account',
  accountPersonal: '/app/account/personal',
  accountList: '/app/account/list',

  employee: '/app/employee',
  employeeSettings: '/app/employee/settings',
  employeeOrganization: '/app/employee/organization',
  employeeList: '/app/employee/list',
  employeeNew: '/app/employee/new',
  employeeEdit: '/app/employee/:employeeId',

  timeOff: '/app/time-off',
  timeOffSettings: '/app/time-off/settings',
  timeOffPersonal: '/app/time-off/personal',
  timeOffTeam: '/app/time-off/team',
  timeOffList: '/app/time-off/list',

  attendance: '/app/attendance',
  attendanceSettings: '/app/attendance/settings',
  attendancePersonal: '/app/attendance/personal',
  attendanceTeam: '/app/attendance/team',
  attendanceList: '/app/attendance/list',
} as const;

type RouterPath = typeof ROUTES[keyof typeof ROUTES];

export type RouteItem = {
  path: RouterPath;
  requireRole: RoleRequired;

  // data being used in App.tsx
  component?: Exclude<RouteProps['component'], undefined>;

  // data being used in layout/AdminLayout/Sidebar.tsx
  menuItem?: {
    label: string;
    icon: JSX.Element;
    children?: RouteItem[];
  };
};

export type RouteData = {
  path: string;
  layout?: React.FC<LayoutProps>;
  routes: RouteItem[];
}[];

type RouteInRouter = Pick<RouteItem, 'path' | 'requireRole'> & {
  component: NonNullable<RouteItem['component']>;
};

export const routes: RouteData = [
  {
    path: ROUTES.login,
    routes: [
      {
        path: ROUTES.login,
        requireRole: { type: '==', role: 'Unauthorized' },
        component: LoginPage,
      },
    ],
  },
  {
    path: ROUTES.app,
    layout: AdminLayout,
    routes: [
      {
        path: ROUTES.report,
        requireRole: { type: '>=', role: 'Manager' },
        component: ReportPage,
        menuItem: {
          label: 'Thống kê',
          icon: <FundOutlined />,
        },
      },
      {
        path: ROUTES.account,
        requireRole: { type: '>=', role: 'User' },
        menuItem: {
          label: 'Tài khoản',
          icon: <UserOutlined />,
          children: [
            {
              path: ROUTES.accountPersonal,
              requireRole: { type: '>=', role: 'User' },
              component: AccountPersonal,
              menuItem: {
                label: 'Tài khoản của tôi',
                icon: <UserOutlined />,
              },
            },
            {
              path: ROUTES.accountList,
              requireRole: { type: '>=', role: 'Admin' },
              component: AccountList,
              menuItem: {
                label: 'Quản lý tài khoản',
                icon: <TeamOutlined />,
              },
            },
          ],
        },
      },
      {
        path: ROUTES.employee,
        requireRole: { type: '>=', role: 'Manager' },
        menuItem: {
          label: 'Nhân viên',
          icon: <ProfileOutlined />,
          children: [
            {
              path: ROUTES.employeeSettings,
              requireRole: { type: '>=', role: 'Manager' },
              component: EmployeeSettings,
              menuItem: {
                label: 'Cài đặt',
                icon: <SettingOutlined />,
              },
            },
            {
              path: ROUTES.employeeOrganization,
              requireRole: { type: '>=', role: 'Manager' },
              component: EmployeeOrganization,
              menuItem: {
                label: 'Cơ cấu tổ chức',
                icon: <ApartmentOutlined />,
              },
            },
            {
              path: ROUTES.employeeList,
              requireRole: { type: '>=', role: 'Manager' },
              component: EmployeeList,
              menuItem: {
                label: 'Danh sách nhân viên',
                icon: <UsergroupAddOutlined />,
              },
            },
            {
              path: ROUTES.employeeNew,
              requireRole: { type: '>=', role: 'Manager' },
              component: EmployeeNew,
            },
            {
              path: ROUTES.employeeEdit,
              requireRole: { type: '>=', role: 'Manager' },
              component: EmployeeEdit,
            },
          ],
        },
      },
      {
        path: ROUTES.timeOff,
        requireRole: { type: '>=', role: 'User' },
        menuItem: {
          label: 'Nghỉ phép',
          icon: <CarryOutOutlined />,
          children: [
            {
              path: ROUTES.timeOffSettings,
              requireRole: { type: '>=', role: 'Manager' },
              component: TimeOffSettings,
              menuItem: {
                label: 'Cài đặt',
                icon: <SettingOutlined />,
              },
            },
            {
              path: ROUTES.timeOffPersonal,
              requireRole: { type: '>=', role: 'User' },
              component: TimeOffPersonal,
              menuItem: {
                label: 'Nghỉ phép của tôi',
                icon: <UserOutlined />,
              },
            },
            {
              path: ROUTES.timeOffTeam,
              requireRole: { type: '>=', role: 'User' },
              component: TimeOffTeam,
              menuItem: {
                label: 'Nghỉ phép của nhóm',
                icon: <TeamOutlined />,
              },
            },
            {
              path: ROUTES.timeOffList,
              requireRole: { type: '>=', role: 'Manager' },
              component: TimeOffList,
              menuItem: {
                label: 'Danh sách nghỉ phép',
                icon: <UsergroupAddOutlined />,
              },
            },
          ],
        },
      },
      {
        path: ROUTES.attendance,
        requireRole: { type: '>=', role: 'User' },
        menuItem: {
          label: 'Chấm công',
          icon: <TableOutlined />,
          children: [
            {
              path: ROUTES.attendanceSettings,
              requireRole: { type: '>=', role: 'Manager' },
              component: AttendanceSettings,
              menuItem: {
                label: 'Cài đặt',
                icon: <SettingOutlined />,
              },
            },
            {
              path: ROUTES.attendancePersonal,
              requireRole: { type: '>=', role: 'User' },
              component: AttendancePersonal,
              menuItem: {
                label: 'Chấm công của tôi',
                icon: <UserOutlined />,
              },
            },
            {
              path: ROUTES.attendanceTeam,
              requireRole: { type: '>=', role: 'User' },
              component: AttendanceTeam,
              menuItem: {
                label: 'Chấm công của nhóm',
                icon: <TeamOutlined />,
              },
            },
            {
              path: ROUTES.attendanceList,
              requireRole: { type: '>=', role: 'Manager' },
              component: AttendanceList,
              menuItem: {
                label: 'Danh sách chấm công',
                icon: <UsergroupAddOutlined />,
              },
            },
          ],
        },
      },
    ],
  },
];

const flattenRoutesInRouter = (routeList: RouteItem[]): RouteInRouter[] => {
  return routeList.flatMap((routeItem) => {
    const acc: RouteInRouter[] = [];
    if (routeItem.menuItem?.children) {
      acc.push(...flattenRoutesInRouter(routeItem.menuItem.children));
    }
    if (routeItem.component) {
      acc.push({
        path: routeItem.path,
        requireRole: routeItem.requireRole,
        component: routeItem.component,
      });
    }
    return acc;
  });
};

export const routesInRouter = routes.map((it) => ({
  ...it,
  routes: flattenRoutesInRouter(it.routes),
}));

export const getRouteByPath = (path: RouterPath) => routes.find((it) => it.path === path);

export const getMenuItems = (path: RouterPath) => {
  return getRouteByPath(path)?.routes.flatMap((routeItem) =>
    routeItem.menuItem ? [routeItem, ...(routeItem.menuItem?.children || [])] : [],
  );
};

export const getSelectedMenuItemKey = (path: RouterPath) => {
  const menuItems = getMenuItems(path);
  if (!menuItems) return '';

  for (const { path, menuItem } of menuItems) {
    if (!menuItem?.children && window.location.pathname.includes(path)) return path;
  }

  return '';
};

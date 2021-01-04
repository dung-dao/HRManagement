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

  report: '/report',

  account: '/account',
  accountPersonal: '/account/personal',
  accountList: '/account/list',

  employee: '/employee',
  employeeSettings: '/employee/settings',
  employeeOrganization: '/employee/organization',
  employeeList: '/employee/list',
  employeeNew: '/employee/new',
  employeeEdit: '/employee/:employeeId',

  timeOff: '/time-off',
  timeOffSettings: '/time-off/settings',
  timeOffPersonal: '/time-off/personal',
  timeOffTeam: '/time-off/team',
  timeOffList: '/time-off/list',

  attendance: '/attendance',
  attendanceSettings: '/attendance/settings',
  attendancePersonal: '/attendance/personal',
  attendanceTeam: '/attendance/team',
  attendanceList: '/attendance/list',
} as const;

export type RouteItem = {
  path: typeof ROUTES[keyof typeof ROUTES];
  requireRole: RoleRequired;

  // data being used in App.tsx
  router?: {
    component: Exclude<RouteProps['component'], undefined>;
    layout?: React.FC<LayoutProps>;
  };

  // data being used in layout/AdminLayout/Sidebar.tsx
  menuItem?: {
    label: string;
    icon: JSX.Element;
    children?: RouteItem[];
  };
};

type RouteInRouter = Pick<RouteItem, 'path' | 'requireRole'> &
  {
    [key in keyof NonNullable<RouteItem['router']>]: NonNullable<RouteItem['router']>[key];
  };

type RouteInMenuItem = Pick<RouteItem, 'path' | 'requireRole'> &
  {
    [key in keyof NonNullable<RouteItem['menuItem']>]: NonNullable<RouteItem['menuItem']>[key];
  };

type RouteList = RouteItem[];

export const routes: RouteList = [
  {
    path: ROUTES.login,
    requireRole: { type: '==', role: 'Unauthorized' },
    router: {
      component: LoginPage,
    },
  },
  {
    path: ROUTES.report,
    requireRole: { type: '>=', role: 'Manager' },
    router: {
      component: ReportPage,
      layout: AdminLayout,
    },
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
          router: {
            component: AccountPersonal,
            layout: AdminLayout,
          },
          menuItem: {
            label: 'Tài khoản của tôi',
            icon: <UserOutlined />,
          },
        },
        {
          path: ROUTES.accountList,
          requireRole: { type: '>=', role: 'Manager' },
          router: {
            component: AccountList,
            layout: AdminLayout,
          },
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
          router: {
            component: EmployeeSettings,
            layout: AdminLayout,
          },
          menuItem: {
            label: 'Cài đặt',
            icon: <SettingOutlined />,
          },
        },
        {
          path: ROUTES.employeeOrganization,
          requireRole: { type: '>=', role: 'Manager' },
          router: {
            component: EmployeeOrganization,
            layout: AdminLayout,
          },
          menuItem: {
            label: 'Cơ cấu tổ chức',
            icon: <ApartmentOutlined />,
          },
        },
        {
          path: ROUTES.employeeList,
          requireRole: { type: '>=', role: 'Manager' },
          router: {
            component: EmployeeList,
            layout: AdminLayout,
          },
          menuItem: {
            label: 'Danh sách nhân viên',
            icon: <UsergroupAddOutlined />,
          },
        },
        {
          path: ROUTES.employeeNew,
          requireRole: { type: '>=', role: 'Manager' },
          router: {
            component: EmployeeNew,
            layout: AdminLayout,
          },
        },
        {
          path: ROUTES.employeeEdit,
          requireRole: { type: '>=', role: 'Manager' },
          router: {
            component: EmployeeEdit,
            layout: AdminLayout,
          },
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
          router: {
            component: TimeOffSettings,
            layout: AdminLayout,
          },
          menuItem: {
            label: 'Cài đặt',
            icon: <SettingOutlined />,
          },
        },
        {
          path: ROUTES.timeOffPersonal,
          requireRole: { type: '>=', role: 'User' },
          router: {
            component: TimeOffPersonal,
            layout: AdminLayout,
          },
          menuItem: {
            label: 'Nghỉ phép của tôi',
            icon: <UserOutlined />,
          },
        },
        {
          path: ROUTES.timeOffTeam,
          requireRole: { type: '>=', role: 'User' },
          router: {
            component: TimeOffTeam,
            layout: AdminLayout,
          },
          menuItem: {
            label: 'Nghỉ phép của nhóm',
            icon: <TeamOutlined />,
          },
        },
        {
          path: ROUTES.timeOffList,
          requireRole: { type: '>=', role: 'Manager' },
          router: {
            component: TimeOffList,
            layout: AdminLayout,
          },
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
          router: {
            component: AttendanceSettings,
            layout: AdminLayout,
          },
          menuItem: {
            label: 'Cài đặt',
            icon: <SettingOutlined />,
          },
        },
        {
          path: ROUTES.attendancePersonal,
          requireRole: { type: '>=', role: 'User' },
          router: {
            component: AttendancePersonal,
            layout: AdminLayout,
          },
          menuItem: {
            label: 'Chấm công của tôi',
            icon: <UserOutlined />,
          },
        },
        {
          path: ROUTES.attendanceTeam,
          requireRole: { type: '>=', role: 'User' },
          router: {
            component: AttendanceTeam,
            layout: AdminLayout,
          },
          menuItem: {
            label: 'Chấm công của nhóm',
            icon: <TeamOutlined />,
          },
        },
        {
          path: ROUTES.attendanceList,
          requireRole: { type: '>=', role: 'Manager' },
          router: {
            component: AttendanceList,
            layout: AdminLayout,
          },
          menuItem: {
            label: 'Danh sách chấm công',
            icon: <UsergroupAddOutlined />,
          },
        },
      ],
    },
  },
];

const getRoutesInRouter = (routeList: RouteItem[]): RouteInRouter[] => {
  return routeList.flatMap((routeItem): RouteInRouter[] => {
    const acc: RouteInRouter[] = [];
    if (routeItem.menuItem?.children) {
      acc.push(...getRoutesInRouter(routeItem.menuItem.children));
    }
    if (routeItem.router) {
      acc.push({
        path: routeItem.path,
        requireRole: routeItem.requireRole,
        component: routeItem.router.component,
        layout: routeItem.router.layout,
      });
    }
    return acc;
  });
};

export const routesInRouter = getRoutesInRouter(routes);

const allMenuItems = routes.flatMap((routeItem) =>
  routeItem.menuItem ? [routeItem, ...(routeItem.menuItem?.children || [])] : [],
);
export const getSelectedMenuItemKey = () => {
  for (const { path, menuItem } of allMenuItems) {
    if (!menuItem?.children && window.location.pathname.includes(path)) return path;
  }

  return '';
};

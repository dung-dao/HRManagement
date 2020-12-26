import React from 'react';
import { Switch, Route, BrowserRouter, RouteProps, Redirect } from 'react-router-dom';
import LoginPage from './pages/Login';
import NotFoundPage from './pages/NotFound/NotFound';
import OrganizationStructure from './pages/OrganizationStructure/OrganizationStructure';
import EmployeeList from './pages/Employee/EmployeeList';
import EmployeeDetail from './pages/Employee/EmployeeDetail/EmployeeDetail';
import ErrorBoundary from './components/ErrorBoundary';
import { WorkTypePage } from './pages/WorkType';
import { JobCategoryPage } from './pages/JobCategory';
import { JobTitlePage } from './pages/JobTitle';
import { EmployeeAddPage } from './pages/EmployeeAdd';
import { LeaveTypePage } from './pages/LeaveType';
import { Leave2TypePage } from './pages/Leave2Type';
import { Leave2ListPage } from './pages/Leave2List';
import { EmployeeEditPage } from './pages/EmployeeEdit';
import { ProfilePage } from './pages/Profile';
import { useAuth } from 'context/AuthContext';
import { Roles } from 'services/AuthService';

type RoleNames = Exclude<Roles, undefined> | 'Unauthorized';

export const roleLevel: Record<RoleNames, number> = {
  Unauthorized: 0,
  User: 1,
  Manager: 2,
  Admin: 3,
} as const;

export const returnRoute: Record<RoleNames, string> = {
  Unauthorized: '/login',
  User: '/me',
  Manager: '/employees',
  Admin: '/employees',
} as const;

type AuthRouteProps = RouteProps & {
  component: Exclude<RouteProps['component'], undefined>;
  requireRole: {
    type: '>=' | '<=' | '==';
    role: RoleNames;
  };
};

function AuthRoute(routeProps: AuthRouteProps) {
  const { component: Component, requireRole, ...rest } = routeProps;
  const role = useAuth().userRole || 'Unauthorized';

  return (
    <Route
      {...rest}
      render={(props) => {
        const accessValid =
          (requireRole.type === '>=' && roleLevel[role] >= roleLevel[requireRole.role]) ||
          (requireRole.type === '<=' && roleLevel[role] <= roleLevel[requireRole.role]) ||
          (requireRole.type === '==' && roleLevel[role] === roleLevel[requireRole.role]);

        if (!accessValid) return <Redirect to={returnRoute[role]} />;

        return <Component {...props} />;
      }}
    />
  );
}

export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ErrorBoundary>
        <Switch>
          <AuthRoute
            exact
            path={['/', '/login']}
            component={LoginPage}
            requireRole={{ type: '==', role: 'Unauthorized' }}
          />
          <AuthRoute
            exact
            path={'/me'}
            component={ProfilePage}
            requireRole={{ type: '>=', role: 'User' }}
          />
          <AuthRoute
            exact
            path={'/organization'}
            component={OrganizationStructure}
            requireRole={{ type: '>=', role: 'Manager' }}
          />
          <AuthRoute
            exact
            path={'/work-type'}
            component={WorkTypePage}
            requireRole={{ type: '>=', role: 'Manager' }}
          />
          <AuthRoute
            exact
            path={'/leave-type'}
            component={LeaveTypePage}
            requireRole={{ type: '>=', role: 'Manager' }}
          />
          <AuthRoute
            exact
            path={'/leave2-type'}
            component={Leave2TypePage}
            requireRole={{ type: '>=', role: 'Manager' }}
          />
          <AuthRoute
            exact
            path={'/leave2-list'}
            component={Leave2ListPage}
            requireRole={{ type: '>=', role: 'Manager' }}
          />
          <AuthRoute
            exact
            path={'/job-category'}
            component={JobCategoryPage}
            requireRole={{ type: '>=', role: 'Manager' }}
          />
          <AuthRoute
            exact
            path={'/job-title'}
            component={JobTitlePage}
            requireRole={{ type: '>=', role: 'Manager' }}
          />
          <AuthRoute
            exact
            path={'/employees'}
            component={EmployeeList}
            requireRole={{ type: '>=', role: 'Manager' }}
          />
          <AuthRoute
            exact
            path={'/employee/new'}
            component={EmployeeAddPage}
            requireRole={{ type: '>=', role: 'Manager' }}
          />
          <AuthRoute
            exact
            path={'/employee/:id'}
            component={EmployeeEditPage}
            requireRole={{ type: '>=', role: 'Manager' }}
          />
          <AuthRoute
            exact
            path={'/employee/add-old'}
            component={EmployeeDetail}
            requireRole={{ type: '>=', role: 'Manager' }}
          />
          <AuthRoute
            exact
            path={'/employee-edit/:employeeId/info'}
            component={EmployeeDetail}
            requireRole={{ type: '>=', role: 'Manager' }}
          />
          <AuthRoute
            exact
            path={'/employee-edit/:employeeId/work'}
            component={EmployeeDetail}
            requireRole={{ type: '>=', role: 'Manager' }}
          />
          <Route exact path={'*'} component={NotFoundPage} />
        </Switch>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

import { useAuth } from 'context/AuthContext';
import React from 'react';
import { BrowserRouter, Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import { isRoleValid, returnRoute, RoleRequired } from 'services/AuthService.util';
import ErrorBoundary from './components/ErrorBoundary';
import EmployeeDetail from './pages/Employee/EmployeeDetail/EmployeeDetail';
import EmployeeList from './pages/Employee/EmployeeList';
import { EmployeeAddPage } from './pages/EmployeeAdd';
import { EmployeeEditPage } from './pages/EmployeeEdit';
import { JobCategoryPage } from './pages/JobCategory';
import { JobTitlePage } from './pages/JobTitle';
import { Leave2ListPage } from './pages/Leave2List';
import { LeaveTypePage } from './pages/LeaveType';
import LoginPage from './pages/Login';
import NotFoundPage from './pages/NotFound/NotFound';
import OrganizationStructure from './pages/OrganizationStructure/OrganizationStructure';
import { ProfilePage } from './pages/Profile';
import { WorkTypePage } from './pages/WorkType';
import { DashboardPage } from './pages/Dashboard';

type AuthRouteProps = RouteProps & {
  component: Exclude<RouteProps['component'], undefined>;
  requireRole: RoleRequired;
};

function AuthRoute(routeProps: AuthRouteProps) {
  const { component: Component, requireRole, ...rest } = routeProps;
  const role = useAuth().userRole || 'Unauthorized';

  return (
    <Route
      {...rest}
      render={(props) => {
        return isRoleValid(requireRole, role) ? (
          <Component {...props} />
        ) : (
          <Redirect to={returnRoute[role]} />
        );
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
            path={'/dashboard'}
            component={DashboardPage}
            requireRole={{ type: '>=', role: 'Manager' }}
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

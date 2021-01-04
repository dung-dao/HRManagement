import { LayoutProps } from 'antd/lib/layout';
import { useAuth } from 'context/AuthContext';
import { NotFound } from 'pages';
import React from 'react';
import { BrowserRouter, Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import { ROUTES, routesInRouter } from 'routes';
import { isRoleValid, returnRoute, RoleRequired } from 'services/AuthService.util';
import ErrorBoundary from './components/ErrorBoundary';

type AuthRouteProps = RouteProps & {
  component: Exclude<RouteProps['component'], undefined>;
  layout?: React.FC<LayoutProps>;
  requireRole: RoleRequired;
};

function AuthRoute(routeProps: AuthRouteProps) {
  const { component: Component, layout: Layout, requireRole, ...rest } = routeProps;
  const role = useAuth().userRole || 'Unauthorized';

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isRoleValid(requireRole, role)) return <Redirect to={returnRoute[role]} />;

        if (Layout)
          return (
            <Layout>
              <Component {...props} />
            </Layout>
          );

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
          <Redirect from="/" exact to={ROUTES.login} />
          {routesInRouter.map((routeProps) => (
            <AuthRoute exact {...routeProps} />
          ))}
          <Route exact path={'*'} component={NotFound} />
        </Switch>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

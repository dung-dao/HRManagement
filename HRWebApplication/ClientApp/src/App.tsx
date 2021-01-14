import { useAuth } from 'context/AuthContext';
import { NotFound } from 'pages';
import React from 'react';
import { BrowserRouter, Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import { RouteInRouter, ROUTES, routesInRouter } from 'routes';
import { isRoleValid, returnRoute, RoleRequired } from 'services/AuthService.util';
import ErrorBoundary from './components/ErrorBoundary';

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
        if (!isRoleValid(requireRole, role)) return <Redirect to={returnRoute[role]} />;

        return <Component {...props} />;
      }}
    />
  );
}

// How to make Navbar persist against routing: https://github.com/NearHuscarl/EShopClientFE/tree/master/src/routes
// The answer: only render the <Layout /> once instead of each for per page
const renderRoutes = () => {
  return routesInRouter.map((route) => {
    const Layout = route.layout || React.Fragment;

    const NestedRoutes = () => (
      <Switch>
        <Layout>
          {route.routes.map((routeProps: RouteInRouter) => (
            <AuthRoute exact {...routeProps} key={routeProps.path} />
          ))}
        </Layout>
      </Switch>
    );

    return <Route key={route.path} path={route.path} component={NestedRoutes} />;
  });
};

export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ErrorBoundary>
        <Switch>
          <Redirect from="/" exact to={ROUTES.login} />
          {renderRoutes()}
          <Route component={NotFound} />
        </Switch>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

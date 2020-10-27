import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as Constant from './common/Constant';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated ? (
        <Component {...rest} {...props} />
      ) : (
        <Redirect
          to={{
            pathname: Constant.ROUTER_URL.LOGIN_PAGE,
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;

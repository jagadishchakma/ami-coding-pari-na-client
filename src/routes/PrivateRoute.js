import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
    const auth = JSON.parse(localStorage.getItem('site_fdkj_hjfdhfj'));
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth && auth.token ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
};

export default PrivateRoute;
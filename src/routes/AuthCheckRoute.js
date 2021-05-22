import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const AuthCheckRoute = ({ children, ...rest }) => {
    const auth = JSON.parse(localStorage.getItem('site_fdkj_hjfdhfj'));
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth && auth.token ? (
            <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
          ) : (
            children
          )
        }
      />
    );
};

export default AuthCheckRoute;
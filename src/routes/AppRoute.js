import React from 'react';
import { Route, Switch } from 'react-router-dom';
import API from '../pages/API';
import Home from '../pages/Home';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import AuthCheckRoute from './AuthCheckRoute';
import PrivateRoute from './PrivateRoute';

const AppRoute = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Home/>
            </Route>
            <AuthCheckRoute exact path="/signup">
                <Signup/>
            </AuthCheckRoute>
            <AuthCheckRoute exact path="/signin">
                <Signin/>
            </AuthCheckRoute>
            <PrivateRoute exact path="/api">
                <API/>
            </PrivateRoute>
        </Switch>
    );
};

export default AppRoute;
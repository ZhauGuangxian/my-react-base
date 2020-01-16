import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import { getToken } from '@/utils/auth.js';
import GuardComponent from './auth.jsx';
//import { home } from './conf.js';
const renderRoutes = (routes, extraProps = {}, switchProps = {}) => {
    return routes instanceof Array && routes.length > 0 ? (
        <Switch {...switchProps}>
            {routes.map((route, i) => (
                <Route
                    exact={route.exact}
                    key={route.key || i}
                    path={route.path}
                    render={(props) => {
                        return <GuardComponent {...props} {...extraProps} route={route} />;
                    }}
                    strict={route.strict}
                />
            ))}
        </Switch>
    ) : null;
};

export default renderRoutes;

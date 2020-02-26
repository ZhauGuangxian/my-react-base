import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import { getToken } from '@/utils/auth.js';
import withAuth from './Auth.tsx';
//import { home } from './conf.js';
const renderRoutes = (routes, extraProps = {}, switchProps = {}) => {
    return routes instanceof Array && routes.length > 0 ? (
        <Switch {...switchProps}>
            {routes.map((route, i) => {
                 const RouteComponent = route.component;
                 const routeProp = {
                    path: route.path,
                    title: route.title,
                    name: route.name || '',
                    parent: route.parent || '',
                    showBack: route.showBack || false,
                    backTo: route.backTo || ''
                 }
                return (
                    <Route
                        exact={route.exact}
                        key={route.key || i}
                        path={route.path}
                        render={(props) => {
                            return  withAuth(<RouteComponent {...props}
                                {...routeProp}
                                {...extraProps}
                                             />) //<GuardComponent {...props} {...extraProps} route={route} />;
                        }}
                        strict={route.strict}
                    />
                )
            })}
        </Switch>
    ) : null;
};

export default renderRoutes;

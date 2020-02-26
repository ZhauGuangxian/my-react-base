import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import { getToken } from '@/utils/auth.js';
import withAuth from './Auth.tsx';
//import { home } from './conf.js';
// const renderRoutes = (routes, extraProps = {}, switchProps = {}) => {

//     return routes instanceof Array && routes.length > 0 ? (
//         <Switch {...switchProps}>
//             {routes.map((route, i) => {
//                  const RouteComponent = route.component;
//                  const FinalComponent =  withAuth(RouteComponent,route);
//                 return (
//                     <Route
//                         component={FinalComponent}
//                         exact={route.exact}
//                         key={route.key || i}
//                         path={route.path}
//                         strict={route.strict}
//                     />
//                 )
//             })}
//         </Switch>
//     ) : null;
// };

// export default renderRoutes;

const NestedRoute = ({route}) => {

    const AuthedComponent = withAuth(route.component);
    return (
        <Route exact={route.exact}
            path={route.path}
        /* 渲染路由对应的视图组件，将路由组件的props传递给视图组件 */
            render={(props) => <AuthedComponent {...props}
                route={route}
                               />}
        />
    )
}

const RenderRoutes = (props) => (
    <div className="space">
      {
        props.router.map((route, i) =>
          <NestedRoute key={i}
              route={route}
          />
        )
      }
    </div>
  );

  export default RenderRoutes;
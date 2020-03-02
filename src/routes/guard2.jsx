import React from 'react';
import { Route, Switch } from 'react-router-dom';

import withAuth from './Auth.tsx';


// const NestedRoute = ({route}) => {

//     const AuthedComponent = withAuth(route.component);
//     return (
//         <Route exact={route.exact}
//             path={route.path}

//             render={(props) => <AuthedComponent {...props}
//                 route={route}
//                                />}
//         />
//     )
// }

const RenderRoutes = (props) => (
    <Switch>

        {
            props.router.map((route, i) =>{
                const AuthedComponent = withAuth(route.component);
                return (

                    <Route exact={route.exact}
                        key={route.name}
                        path={route.path}
                        render={(props) => <AuthedComponent {...props}
                            route={route}
                                           />}
                    />
                )
            }
            )
        }

    </Switch>
  );

  export default RenderRoutes;
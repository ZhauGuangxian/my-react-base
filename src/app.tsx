import React, {Component } from 'react';

// import { renderRoutes } from 'react-router-config';
import renderRoutes from '@/routes/guard.jsx';

import Layout from '@/views/layout/index.tsx';
// if (!route.requiresAuth || authed || route.path === authPath) {}

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            route: props.route.routes
        }
    }
   
    public render(){
        return(
            <div>
                <Layout>
                    {renderRoutes(this.state.route)}
                </Layout>
            </div>
        )
    }
}
export default App;
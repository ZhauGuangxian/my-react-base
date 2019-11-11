import React, {Component } from 'react';

// import { renderRoutes } from 'react-router-config';
import renderRoutes from '@/routes/guard.jsx';
import Layout from '@/views/layout/layout.jsx';
import { getToken } from '@/utils/auth.js';
// if (!route.requiresAuth || authed || route.path === authPath) {}

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            route: props.route.routes
        }
    }
    componentDidMount(){
        console.log(this.props.history.location);
        if(getToken() && this.props.history.pathname === '/') {
             this.props.history.go('/home')
        }
    }
    render(){
        return(
            <Layout>
                {renderRoutes(this.state.route)}
            </Layout>
        )
    }
}
export default App;
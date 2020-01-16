import React, {Component } from 'react';

// import { renderRoutes } from 'react-router-config';
import renderRoutes from '@/routes/guard.jsx';


// if (!route.requiresAuth || authed || route.path === authPath) {}

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            route: props.route.routes
        }
    }
   
    render(){
        return(
            <div>
                {renderRoutes(this.state.route)}
            </div>
        )
    }
}
export default App;
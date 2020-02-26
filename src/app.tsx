import React, {Component } from 'react';

// import { renderRoutes } from 'react-router-config';
import RenderRoutes from '@/routes/guard2.jsx';
import {cloneDeep} from 'lodash';
import Layout from '@/views/layout/index.tsx';
// if (!route.requiresAuth || authed || route.path === authPath) {}

class App extends Component{
    constructor(props){
        super(props);   
        this.state = {
            childs: []
        }
    }
    
    public componentDidMount() {
        
    }

    public render(){
        const { route } = this.props || {};
        return(
            
                <Layout>
                    {/* {renderRoutes(this.props.childs)} */}
                    <RenderRoutes router={route.routes}/>
                </Layout>
            
        )
    }
}
export default App;
import React, {Component } from 'react';
import { Link ,Route } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            route: props.route.routes
        }
    }
    componentWillMount(){

    }
    render(){
        
        return(
            <div className="app-container">
                <div>
                    <p>appIndex</p>
                    <Link to="/home">首页</Link>
                    <Link to="/playingPage">播放页</Link>
                </div>
                
                    {renderRoutes(this.state.route)}
                
            </div>
        )
    }
}
export default App;
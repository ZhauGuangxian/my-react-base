/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { withRouter } from 'react-router-dom';
// import renderRoutes from './guard';
class AuthComponent extends Component {
    constructor() {
        super();
    }
    componentDidMount() {
        // const authed = getToken(); 做登录判断
        const authed = true;
        if (!authed) {
            this.props.history.replace('/login');
        }
    }
    render() {
     
        const RouteComponent = this.props.route.component;
        const props = this.props;
       
        const redirectTo = this.props.route.redirect;
        return (
            <div>
                <RouteComponent {...props} />
                {redirectTo && <Route path={this.props.route.path} exact component={redirectTo} />}
            </div>
        );
    }
}

const GuardComponent = withRouter(AuthComponent);

export default GuardComponent;

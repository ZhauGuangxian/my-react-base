import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

class AuthComponent extends Component {
    constructor() {
        super();
    }
    componentDidMount() {
        const authed = true

        if (!authed) {
            this.props.history.replace('/login');
        }
        let browserPath = this.props.location.pathname;
        let metaPath = this.props.route.path;
        let canSetMeta = false;
        if (metaPath.includes(':')) {
            let u1 = browserPath.split('/');
            u1.pop();
            let u2 = metaPath.split('/');
            u2.pop();
            if (u1.join('/') === u2.join('/')) {
                canSetMeta = true;
            }
        } else {
            if (browserPath === metaPath) {
                canSetMeta = true;
            }
        }
        if (canSetMeta === true) {
            let routeMeta = {
                path: this.props.route.path,
                title: this.props.route.title,
                name: this.props.route.name || '',
                parent: this.props.route.parent || '',
                showBack: this.props.route.showBack || false,
                backTo: this.props.route.backTo || ''
            };
            this.props.SetRouteMeta(routeMeta);
        }
    }
    render() {
        const RouteComponent = this.props.route.component;
        const props = this.props;

        const redirectTo = this.props.route.redirect;
        return (
            <div>
                <RouteComponent {...props} />
                {redirectTo && <Route component={redirectTo}
                    exact
                    path={this.props.route.path}
                               />}
            </div>
        );
    }
}

/**
 * @param state
 */
function mapStateToProps(state) {
    return {
        store: state.system
    };
}

/**
 * @param dispatch
 */
function mapDispatchToProps(dispatch) {
    return {
        SetRouteMeta: (payload) => dispatch({ type: 'SetRouteMeta', payload })
    };
}

const GuardComponent = withRouter(AuthComponent);

export default connect(mapStateToProps, mapDispatchToProps)(GuardComponent);

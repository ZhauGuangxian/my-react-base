import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
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

function withAuth(WrapperComponent) {
    debugger;
    class InnerComponent extends Component {
        constructor(props) {
            super(props);
        }

        public componentDidMount () {
            // 判断是否登录
            const logined = true;
            if(!logined) {
                this.props.history.replace('/login')
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

        public render(){
            const props = this.props;
            const redirectTo = this.props.route.redirect;
            return (
                <div>
                    <WrapperComponent {...props} />
                    {redirectTo && <Route component={redirectTo}
                        exact
                        path={this.props.route.path}
                                />}
                </div>
            );
        }
    }


    return connect(mapStateToProps, mapDispatchToProps)(withRouter(InnerComponent));
}

export default withAuth;
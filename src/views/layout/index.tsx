import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
import { cleanConf } from '../../routes/conf.ts';
import TopNav from './topNav';
import { NavLink, Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';


const generateLeftNav = (childs = [], collapsed, opens, key) => {

    return childs.map((e, i) => {
        if (e.hide !== true) {
            if (e.routes instanceof Array && e.routes.length > 0) {
                if (key.includes(e.path)) {
                    opens.push(e.path);
                }
                return (
                    <SubMenu
                        key={e.path}
                        popupClassName="ds-menu"
                        className={e.top ? 'top ds-menu' : 'ds-menu'}
                        title={
                            collapsed === true ? (
                                <span className="firstWordButton">{e.title.substr(0, 1)}</span>
                            ) : (
                                <a>{e.title}</a>
                            )
                        }
                    >
                        {generateLeftNav(e.routes, false, opens, key)}
                    </SubMenu>
                );
            } else {
                return (
                    <Menu.Item key={e.path} className={e.top ? 'top ds-menu' : 'ds-menu'} title={e.title}>
                        <NavLink to={e.path} activeClassName="actived">
                            {collapsed === true ? (
                                <span className="firstWordButton">{e.title.substr(0, 1)}</span>
                            ) : (
                                <span className="popFFF">{e.title}</span>
                            )}
                        </NavLink>
                    </Menu.Item>
                );
            }
        }
    });
};

/**
 * @param key
 * @param list
 */
function deepFind(key:String = '', list:Array<any> = []): object {
    let target = null;
    if (list instanceof Array) {
        for (let i = 0; i < list.length; i++) {
            if (key === list[i].name) {
                target = list[i];
            }
        }
        if (!target) {
            /**
             * target = deepFind(key, list[i].routes);
             */
            for (let i = 0; i < list.length; i++) {
                if (list[i].routes instanceof Array) {
                    target = deepFind(key, list[i].routes);
                }
            }
        }
    }
    return target;
}

/**
 * @param current
 * @param list
 */
function generatesBreadList(current, list = []) {
    if (!current) {
        return;
    }
    let result = [];

    let temp = {
        path: current.path,
        name: current.name,
        title: current.title
    };
    result.push(temp);

    while (current.parent) {
        {
            current = deepFind(current.parent, list);
            let temp = {
                path: current.path,
                name: current.name,
                title: current.title
            };
            result.unshift(temp);
        }
    }
    return result;
}

class LayOutMain extends React.Component {
    constructor(props) {
        super(props);
       
        this.state = {
            collapsed: false
        };
    }

    onCollapse(collapsed) {
        this.setState({ collapsed });
    }

    render() {
        
        const opens = [];
        let breadItems = generatesBreadList(this.props.store.routeMeta, cleanConf);
        const currentNavKey = this.props.location.pathname;
        
        const Menus = generateLeftNav(cleanConf, this.state.collapsed, opens, currentNavKey);
        return (
            <div className="layout-main">
                <TopNav></TopNav>
                <Layout style={{ minHeight: '100vh', paddingTop: '60px' }}>
                    <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse.bind(this)}
                        theme="light"
                        trigger={
                            this.state.collapsed === true ? <Icon type="menu-fold" /> : <Icon type="menu-unfold" />
                        }
                    >
                        <div className="logo" />
                        <Menu defaultSelectedKeys={[ currentNavKey]} defaultOpenKeys={opens} mode="inline">
                            {Menus}
                        </Menu>
                    </Sider>
                    <Layout>
                        <Content style={{ margin: '0 16px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                {breadItems.map((item) => {
                                    return (
                                        <Breadcrumb.Item key={'{item.name}-bread-nav'}>
                                            <Link
                                                to={{
                                                    path: item.path
                                                }}
                                            >
                                                {item.title}
                                            </Link>
                                        </Breadcrumb.Item>
                                    );
                                })}
                            </Breadcrumb>
                            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{this.props.children}</div>
                        </Content>
                    </Layout>
                </Layout>
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
        SetCurrentRoute: (payload) => dispatch({ type: 'SetCurrentRoute', payload })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LayOutMain));

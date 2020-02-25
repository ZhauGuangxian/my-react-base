import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
import { cleanConf } from '../../routes/conf.ts';
import TopNav from './topNav';
import { NavLink, Link } from 'react-router-dom';

import { connect } from 'react-redux';

/**
 * @param list
 */
function generateMenu(list: Array<any> = []): Array<any> {
    let menus = null;
    if (list instanceof Array) {
        menus = list.map((item) => {
            if (item.routes instanceof Array) {
                return (
                    <SubMenu title={item.title} key={'menu-' + item.name}>
                        {generateMenu(item.routes)}
                    </SubMenu>
                );
            } else {
                return (
                    <Menu.Item key={'menu-' + item.name}>
                        <NavLink
                            to={{
                                pathname: item.path
                            }}
                        >
                            {item.title}
                        </NavLink>
                    </Menu.Item>
                );
            }
        });
    }
    return menus;
}

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
        const Menus = generateMenu(cleanConf);
        let breadItems = generatesBreadList(this.props.store.routeMeta, cleanConf);

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
                        <Menu selectedKeys={['menu-' + this.props.store.routeMeta.name]} mode="inline">
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

export default connect(mapStateToProps, mapDispatchToProps)(LayOutMain);

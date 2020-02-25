import React, { useState } from 'react';
import { Dropdown, Icon, Menu, Button } from 'antd';
import style from './topnav.module.less';
import { Link } from 'react-router-dom';
/**
 * @param props
 */
function LayoutTopNav(props) {
    /**
     *
     */
    function handleLogOut() {}
    const menu = (
        <Menu>
            <Menu.Item key="1">
                <Link
                    to={{
                        pathname: '/person_center',
                        state: { backFlag: true }
                    }}
                >
                    <Button type="link">个人中心</Button>
                </Link>
            </Menu.Item>
            <Menu.Item key="0">
                <Button type="link" onClick={handleLogOut}>
                    退出登陆
                </Button>
            </Menu.Item>
        </Menu>
    );
    return (
        <div className={style['top-nav']}>
            <div className={style['left-cont']}>
                <span className="logo">
                    <img alt="" src="" />
                </span>
                <span className={style['sysTitle']}>系统标题</span>
            </div>

            <div className="user-info">
                <Dropdown overlay={menu} trigger={['click']}>
                    <a className="ant-dropdown-link" href="#">
                        欢迎您&nbsp;&nbsp;&nbsp;老弟
                        <Icon type="down" />
                    </a>
                </Dropdown>
                <img alt="" src="" className="ml_10" />

                <Link
                    to={{
                        pathname: '/news_center',
                        state: { backFlag: true }
                    }}
                    className={style['el-badge']}
                    style={{ color: '#fff' }}
                >
                    <sup className="el-badge__content ">2</sup>
                    <img alt="" src="" className="ml_10" />
                </Link>
            </div>
        </div>
    );
}

export default LayoutTopNav;

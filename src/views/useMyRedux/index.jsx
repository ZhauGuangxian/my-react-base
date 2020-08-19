import React, { Component } from 'react';
import { createStore } from '@/myRedux/index';
import Reducer from './myReducer';
import './style.less';
const store = createStore(Reducer);
import { Button } from 'antd';

class UseMyReduxCom extends Component {
    constructor(props) {
        super(props);
        const { user, game } = store.getState();
        this.state = {
            userCount: user.userCount,
            gameCount: game.gameCount
        };
    }
    handleChangeState() {
        const { user, game } = store.getState();
        this.setState({
            userCount: user.userCount,
            gameCount: game.gameCount
        });
    }
    componentDidMount() {
        const state = store.getState();
        console.log('初始化state是', state);
        store.subscribe(this.handleChangeState.bind(this));
    }
    render() {
        return (
            <>
                <div className="useMyRedux-container mt-20">
                    <div>userCount: {this.state.userCount}</div>
                    <Button
                        type="primary"
                        className="mr-20"
                        onClick={() => {
                            store.dispatch({
                                type: 'USERINCREMENT'
                            });
                        }}
                    >
                        add
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => {
                            store.dispatch({
                                type: 'USERDECREMENT'
                            });
                        }}
                    >
                        NoAdd
                    </Button>
                </div>
                <div className="useMyRedux-container mt-20">
                    <div>gameCount: {this.state.gameCount}</div>
                    <Button
                        type="primary"
                        className="mr-20"
                        onClick={() => {
                            store.dispatch({
                                type: 'GAMEINCREMENT'
                            });
                        }}
                    >
                        add
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => {
                            store.dispatch({
                                type: 'GAMEDECREMENT'
                            });
                        }}
                    >
                        NoAdd
                    </Button>
                </div>
            </>
        );
    }
}

export default UseMyReduxCom;

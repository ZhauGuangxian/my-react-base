import React, { Component } from 'react';
import { Button, List, Spin } from 'antd';
import MyModal from '@/components/myModal/index';
import { observer, inject } from 'mobx-react';
@inject('appState')
@observer
class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myModalVisible: false
        };
    }

    componentDidMount() {
        //getDataList();
        const { actionGetPornList } = this.props.appState;
        actionGetPornList();
    }

    render() {
        const { pornList, pornListFetching, actionGetUserList, userList, userListFetching } = this.props.appState;
        return (
            <div>
                <div>首页</div>
                <div>
                    <Button
                        onClick={() => {
                            this.setState({
                                myModalVisible: true
                            });
                        }}
                    >
                        试试modal1
                    </Button>
                </div>
                <Spin spinning={pornListFetching}>
                    <List
                        size="small"
                        header={<div>Header</div>}
                        footer={<div>Footer</div>}
                        bordered
                        dataSource={pornList}
                        renderItem={(item) => <List.Item>{item.name}</List.Item>}
                    />
                </Spin>
                <MyModal
                    visible={this.state.myModalVisible}
                    onCancel={() => {
                        this.setState({
                            myModalVisible: false
                        });
                    }}
                    title="reactCreatePortal"
                    width="720"
                >
                    test reactDom creat potral
                    <Button
                        onClick={() => {
                            actionGetUserList();
                        }}
                    >
                        获取lsp列表
                    </Button>
                    <Spin spinning={userListFetching}>
                        <List
                            size="small"
                            header={<div>Header</div>}
                            footer={<div>Footer</div>}
                            bordered
                            dataSource={userList}
                            renderItem={(item) => <List.Item>{item.name}</List.Item>}
                        />
                    </Spin>
                </MyModal>
            </div>
        );
    }
}

export default HomePage;

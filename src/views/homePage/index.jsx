import React, { Component } from 'react';
import { Button, List, Spin } from 'antd';
import MyModal from '@/components/myModal/index';
import { connect } from 'react-redux';
// import { getDataList } from '@/store/modules/learn-thunk/actionCreator';

import { sagaActionSetPornList, sagaActionSetUserList } from '@/store/actions';
class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myModalVisible: false
        };
    }

    componentDidMount() {
        console.log('dd');
        this.props.sagaActionSetPornList();
        //getDataList();
    }

    render() {
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
                <Spin spinning={this.props.porn.pornListFetching}>
                    <List
                        size="small"
                        header={<div>Header</div>}
                        footer={<div>Footer</div>}
                        bordered
                        dataSource={this.props.porn.pornList}
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
                            this.props.sagaActionSetUserList();
                        }}
                    >
                        获取lsp列表
                    </Button>
                    <Spin spinning={this.props.user.userListFetching}>
                        <List
                            size="small"
                            header={<div>Header</div>}
                            footer={<div>Footer</div>}
                            bordered
                            dataSource={this.props.user.userList}
                            renderItem={(item) => <List.Item>{item.name}</List.Item>}
                        />
                    </Spin>
                </MyModal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        porn: state.porn,
        user: state.user
    };
};

export default connect(mapStateToProps, { sagaActionSetPornList, sagaActionSetUserList })(HomePage);

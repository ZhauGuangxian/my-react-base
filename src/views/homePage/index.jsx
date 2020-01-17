import React, { Component } from 'react';
import { Button } from 'antd';
import MyModal from '@/components/myModal/index';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myModalVisible: false
        };
    }
    
    render(){
        return(
            <div>
                <div>
                    首页
                </div>
                <div>
                    <Button onClick={()=>{
                        this.setState({
                            myModalVisible: true
                        })
                    }}>试试modal</Button>
                </div>
                <MyModal visible={this.state.myModalVisible} onCancel={()=>{
                    this.setState({
                        myModalVisible: false
                    })
                }} title="reactCreatePortal" width="720">

                    test reactDom creat potral
                </MyModal>
            </div>
        )
    }
}

export default HomePage;
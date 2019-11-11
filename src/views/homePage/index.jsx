import React, { Component } from 'react';
import './style.less';
import { connect } from 'react-redux';


import { Input, Icon } from 'antd';


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    
    reudner(){
        return(
            <div>首页</div>
        )
    }
}

/**
 * @param state
 */
function mapStateToProps(state) {
    return {
        dsFore: state.dsFore
    };
}
export default connect(mapStateToProps)(HomePage);

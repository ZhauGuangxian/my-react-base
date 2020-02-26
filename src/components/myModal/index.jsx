import React from 'react';
import ReactDOM from 'react-dom';
import style from './modal.module.less';
import { Button, Icon } from 'antd';
function Portal(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            if(!this.node) {
                this.node = document.createElement('div');
                document.body.append(this.node);
            }
        }
        componentWillUnmount() {
            if(this.node) {
                this.node.remove();
                this.node = null;
            }
        }
        renderContext() {

            return (
                <div className={style['wrapper-container']}>
                    <div className={style['wrapper-bg']}
                        onClick={()=>{
                        this.props.onCancel()
                    }}
                    ></div>
                    <WrappedComponent {...this.props}></WrappedComponent>
                </div>
            )
        }
        render() {
            if(this.props.visible === true) {
                return ReactDOM.createPortal(this.renderContext(), this.node)
            } else {
                return null;
            }
        }
    }
}

class Modal extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        let customfooter = false;
        if(this.props.footer !== null && typeof this.props.footer !== 'undefined') {
            customfooter = true;
        }
        let newStyle =  Object.assign(this.props.style || {}, {

        })
        if(!isNaN(parseInt(this.props.width))) {
            newStyle['width'] = parseInt(this.props.width) + 'px'

        }
        let newClassName = style['modal-container'];
        if(this.props.className) {
            newClassName = newClassName + ' ' + this.props.className
        }
        return (
            <div className={newClassName}
                style={newStyle}
            >
                <div className={style['modal-head']}>
                    <span className={style['modal-head-title']}>{this.props.title || '标题'}</span>
                    <Icon onClick={this.props.onCancel}
                        type="close"
                    />
                </div>
                <div className={style['modal-body']}>
                    {this.props.children}
                </div>
                {this.props.footer !== null && <div className={style['modal-footer']}>
                    {
                        customfooter === true ? this.props.footer : (<div>
                            <Button onClick={this.props.onOk}
                                style={{marginRight: '10px'}}
                                type="primary"
                            >{this.props.okText || '确定'}</Button>
                            <Button onClick={this.props.onCancel}
                                type="primary"
                            >{this.props.okText || '取消'}</Button>
                        </div>)
                    }
                </div>}
            </div>
        )
    }
}

export default Portal(Modal)
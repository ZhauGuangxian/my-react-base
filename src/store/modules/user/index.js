/*
 * @Author: your name
 * @Date: 2019-12-06 11:34:14
 * @LastEditTime : 2020-01-16 18:17:33
 * @LastEditors  : wanglinghui
 * @Description: In User Settings Edit
 * @FilePath: \tax-data-service-ui\src\store\modules\user\index.js
 */


import { cloneDeep } from 'lodash';
const State = {
    user: '',
   
};

export default (state = State, action) => {
    const copyState = cloneDeep(state);
    switch (action.type) {
        case 'SetName':
            copyState.user = action.payload;
            break;
        default:
            break;
    }
    return copyState;
};

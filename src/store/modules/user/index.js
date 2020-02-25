


import { cloneDeep } from 'lodash';
const State = {
    user: ''

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

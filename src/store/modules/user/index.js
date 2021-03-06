import * as ActionNames from '../../actionNames';
const State = {
    userList: [],
    userListFetching: false
};

export default function(state = State, action) {
    const copyState = { ...state };
    switch (action.type) {
        case ActionNames.SET_USER_LIST:
            copyState.userList = action.payload || [];
            break;
        case ActionNames.SET_USER_LIST_FETCHING:
            copyState.userListFetching = action.payload || false;
            break;
        default:
            break;
    }
    return copyState;
}

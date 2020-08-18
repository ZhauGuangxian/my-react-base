import * as ActionNames from '../../actionNames';
const State = {
    pornList: [],
    pornListFetching: false
};

export default function(state = State, action) {
    const copyState = { ...state };
    switch (action.type) {
        case ActionNames.SET_PORN_LIST:
            copyState.pornList = action.payload || [];
            break;
        case ActionNames.SET_PORN_LIST_FETCHING:
            copyState.pornListFetching = action.payload;
            break;
        default:
            break;
    }
    return copyState;
}

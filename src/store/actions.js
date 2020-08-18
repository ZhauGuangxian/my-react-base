import * as ActionNames from './actionNames';
export function sagaActionSetUserList(payload) {
    return {
        type: ActionNames.SET_USER_LIST_SUCCESS
    };
}

export function sagaActionSetPornList(payload) {
    return {
        type: ActionNames.SET_PORN_LIST_SUCCESS
    };
}

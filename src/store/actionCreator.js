import * as ActionNames from './actionNames';
export function actionSetUserList(payload) {
    return {
        type: ActionNames.SET_USER_LIST,
        payload
    };
}

export function actionSetPornList(payload) {
    return {
        type: ActionNames.SET_PORN_LIST,
        payload
    };
}

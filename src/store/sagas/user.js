import { takeEvery, takeLatest, call, put } from 'redux-saga/effects';
import { getUserList } from '@/api/userPorn';
import { actionSetUserList } from '../actionCreator';
import * as ActionNames from '../actionNames';
function* fetchUserList() {
    yield put({
        type: ActionNames.SET_USER_LIST_FETCHING,
        payload: true
    });
    const res = yield call(getUserList);
    const action = actionSetUserList(res.data);
    yield put({
        type: ActionNames.SET_USER_LIST_FETCHING,
        payload: false
    });
    yield put(action);
}

export default function* userSaga() {
    yield takeLatest(ActionNames.SET_USER_LIST_SUCCESS, fetchUserList);
}

// import { takeEvery, takeLatest, call, put } from 'redux-saga/effects';
// import { getPornList } from '@/api/userPorn';
// import { actionSetPornList } from './actionCreator';
// import * as ActionNames from './actionNames';
// function* fetchPornList() {
//     yield put({
//         type: ActionNames.SET_PORN_LIST_FETCHING,
//         payload: true
//     });
//     const res = yield call(getPornList);
//     const action = actionSetPornList(res);
//     yield put({
//         type: ActionNames.SET_PORN_LIST_FETCHING,
//         payload: false
//     });
//     yield put(action);
// }

// export default function* mySagas() {
//     yield takeLatest(ActionNames.SET_PORN_LIST_SUCCESS, fetchPornList);
// }
import { all } from 'redux-saga/effects';
import porns from './sagas/porn';
import users from './sagas/user';
export default function* mySagas() {
    yield all([users(), porns()]);
}

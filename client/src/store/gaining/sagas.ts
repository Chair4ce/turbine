import {all, call, fork, put, takeEvery} from 'redux-saga/effects';
import {GainingActionTypes} from './types';
import {gainingFetchError, gainingFetchSuccess, gainingPostError} from './actions';
import {callApi} from '../../util/api';
import {gainingPostSuccess} from "../importChanges";


function* handleFetch() {
    try {
        // To call async functions, use redux-saga's `call()`.
        const res = yield call(callApi, 'get', 'api/gaining');

        if (res.error) {
            yield put(gainingFetchError(res.error));
        } else {
            yield put(gainingFetchSuccess(res));
        }
    } catch (err) {
        if (err instanceof Error && err.stack) {
            yield put(gainingFetchError(err.stack));
        } else {
            yield put(gainingFetchError('An unknown error occured.'));
        }
    }
}

export function* saveGainingsFromCsv(gaining: any) {
    try {
        // To call async functions, use redux-saga's `call()`.
        const res = yield call(callApi,'POST', 'api/gaining/save', gaining);
        if (res.error) {
            yield put(gainingPostError(res.error));
        } else {
            yield put(gainingPostSuccess(res));
        }
    } catch (err) {
        if (err instanceof Error && err.stack) {
            yield put(gainingPostError(err.stack));
        } else {
            yield put(gainingPostError('An unknown error occured.'));
        }
    }
}

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
function* watchFetchRequest() {
    yield takeEvery(GainingActionTypes.FETCH_REQUEST, handleFetch);
}


// We can also use `fork()` here to split our saga into multiple watchers.
function* gainingSaga() {
    yield all([fork(watchFetchRequest)]);
}

export default gainingSaga;

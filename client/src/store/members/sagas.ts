import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { MemberActionTypes } from './types';
import { membersFetchError, membersFetchSuccess } from './actions';
import { callApi } from '../../utils/api';

const API_ENDPOINT = 'http://localhost:8080';

function *handleFetch() {
    try {
        // To call async functions, use redux-saga's `call()`.
        const res = yield call(callApi, 'get', API_ENDPOINT, 'api/members');

        if (res.error) {
            yield put(membersFetchError(res.error));
        } else {
            yield put(membersFetchSuccess(res));
        }
    } catch (err) {
        if (err instanceof Error && err.stack) {
            yield put(membersFetchError(err.stack));
        } else {
            yield put(membersFetchError('An unknown error occured.'));
        }
    }
}

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
function *watchFetchRequest() {
    yield takeEvery(MemberActionTypes.FETCH_REQUEST, handleFetch);
}

// We can also use `fork()` here to split our saga into multiple watchers.
function *membersSaga() {
    yield all([fork(watchFetchRequest)]);
}

export default membersSaga;

import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { AETActionTypes } from './types';
import { AETsFetchError, AETsFetchSuccess } from './actions';
import { callApi } from '../../utils/api';

const API_ENDPOINT = 'http://localhost:8080';

function *handleFetch() {
    try {
        // To call async functions, use redux-saga's `call()`.
        const res = yield call(callApi, 'get', API_ENDPOINT, 'api/AETs');

        if (res.error) {
            yield put(AETsFetchError(res.error));
        } else {
            yield put(AETsFetchSuccess(res));
        }
    } catch (err) {
        if (err instanceof Error && err.stack) {
            yield put(AETsFetchError(err.stack));
        } else {
            yield put(AETsFetchError('An unknown error occured.'));
        }
    }
}

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
function *watchFetchRequest() {
    yield takeEvery(AETActionTypes.FETCH_REQUEST, handleFetch);
}

// We can also use `fork()` here to split our saga into multiple watchers.
function *AETSaga() {
    yield all([fork(watchFetchRequest)]);
}

export default AETSaga;
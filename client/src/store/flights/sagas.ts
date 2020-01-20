import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { FlightActionTypes } from './types';
import { flightsFetchError, flightsFetchSuccess } from './actions';
import { callApi } from '../../utils/api';


function *handleFetch() {
    try {
        // To call async functions, use redux-saga's `call()`.
        const res = yield call(callApi, 'get', 'api/flights');

        if (res.error) {
            yield put(flightsFetchError(res.error));
        } else {
            yield put(flightsFetchSuccess(res));
        }
    } catch (err) {
        if (err instanceof Error && err.stack) {
            yield put(flightsFetchError(err.stack));
        } else {
            yield put(flightsFetchError('An unknown error occured.'));
        }
    }
}

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
function *watchFetchRequest() {
    yield takeEvery(FlightActionTypes.FETCH_REQUEST, handleFetch);
}

// We can also use `fork()` here to split our saga into multiple watchers.
function *flightSaga() {
    yield all([fork(watchFetchRequest)]);
}

export default flightSaga;
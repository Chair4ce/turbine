import {all, call, fork, put, takeEvery} from 'redux-saga/effects';
import {SquadronActionTypes} from './types';
import {squadronPostSuccess, squadronsFetchError, squadronsFetchRequest, squadronsFetchSuccess} from './actions';
import {callApi} from '../../util/api';
import SquadronModel from "./SquadronModel";


function *handleFetch() {
    try {
        // To call async functions, use redux-saga's `call()`.
        console.log("fetching new Squadrons");
        const res = yield call(callApi, 'get', 'api/squadrons');

        if (res.error) {
            yield put(squadronsFetchError(res.error));
        } else {
            yield put(squadronsFetchSuccess(res));
        }
    } catch (err) {
        if (err instanceof Error && err.stack) {
            yield put(squadronsFetchError(err.stack));
        } else {
            yield put(squadronsFetchError('An unknown error occured.'));
        }
    }
}

export async function postNewSquadron(data: SquadronModel) {
        // To call async functions, use redux-saga's `call()`.
        const res = await callApi('post', 'api/squadrons/add', data);
    if (await res.json) {
        console.log('fired');
        squadronsFetchRequest();
    }
}

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
function *watchFetchRequest() {
    yield takeEvery(SquadronActionTypes.FETCH_REQUEST, handleFetch);
}

// We can also use `fork()` here to split our saga into multiple watchers.
function *squadronSaga() {
    yield all([fork(watchFetchRequest)]);
}

export default squadronSaga;
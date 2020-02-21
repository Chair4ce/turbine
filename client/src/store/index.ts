import {combineReducers} from 'redux';
import {all, fork} from 'redux-saga/effects';
import {connectRouter, RouterState} from 'connected-react-router';
import {History} from 'history';
import {layoutReducer, LayoutState} from './layout';
import membersSaga from './members/sagas';
import {membersReducer} from './members/reducer';
import {MembersState} from './members';
import {SquadronsState} from "./squadrons";
import {squadronsReducer} from "./squadrons/reducer";
import squadronSaga from "./squadrons/sagas";
import {FlightsState} from "./flights";
import {AETsState} from "./AETs/types";
import {flightsReducer} from "./flights/index";
import {AETsReducer} from "./AETs/reducer";
import flightSaga from "./flights/sagas";
import AETSaga from "./AETs/sagas";
import {ShowModalState} from "./modals/types";
import {showModalReducer} from "./modals/reducer";
import {gainingReducer, GainingState} from "./gaining";
import gainingSaga from "./gaining/sagas";

// The top-level state object
export interface ApplicationState {
    layout: LayoutState;
    members: MembersState;
    gaining: GainingState;
    squadrons: SquadronsState;
    showModal: ShowModalState;
    flights: FlightsState;
    AETs: AETsState;
    router: RouterState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const createRootReducer = (history: History) =>
    combineReducers({
        layout: layoutReducer,
        squadrons: squadronsReducer,
        showModal: showModalReducer,
        flights: flightsReducer,
        AETs: AETsReducer,
        members: membersReducer,
        gaining: gainingReducer,
        router: connectRouter(history),
    });

// Here we use `redux-saga` to trigger actions asynchronously. `redux-saga` uses something called a
// "generator function", which you can read about here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
export function* rootSaga() {
    yield all([fork(membersSaga),fork(squadronSaga),fork(flightSaga),fork(AETSaga), fork(gainingSaga)]);
}

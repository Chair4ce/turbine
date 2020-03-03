import {combineReducers} from 'redux';
import {connectRouter, RouterState} from 'connected-react-router';
import {History} from 'history';
import {layoutReducer, LayoutState} from './layout';
import {membersReducer} from './members/reducer';
import {MembersState} from './members';
import {SquadronsState} from "./squadrons";
import {squadronsReducer} from "./squadrons/reducer";

import {ShowModalState} from "./modals/types";
import {showModalReducer} from "./modals/reducer";
import {gainingReducer, GainingState} from "./gaining";
import {importChangesReducer, ImportChangesState} from "./importChanges";

// The top-level state object
export interface ApplicationState {
    layout: LayoutState;
    members: MembersState;
    gaining: GainingState;
    squadrons: SquadronsState;
    showModal: ShowModalState;
    importChanges: ImportChangesState;
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
        members: membersReducer,
        gaining: gainingReducer,
        importChanges: importChangesReducer,
        router: connectRouter(history),
    });

// Here we use `redux-saga` to trigger actions asynchronously. `redux-saga` uses something called a
// "generator function", which you can read about here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*

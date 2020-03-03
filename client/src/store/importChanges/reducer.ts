import {Reducer} from 'redux';
import ImportChangeModel from "./ImportChangeModel";
import {ImportChangesActionTypes, ImportChangesState} from "./types";
import {ImportChangesDeserializer} from "../../util/ImportChangesDeserializer";
import {MemberActionTypes} from "../members";


// Type-safe initialState!
export const initialState: ImportChangesState = {
    gainingImportChanges: [] as ImportChangeModel[],
    gainingLoading: false,
    memberImportChanges: [] as ImportChangeModel[],
    membersLoading: false,
    membersError: "",
    gainingError: "",
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<ImportChangesState> = (state = initialState, action) => {
    switch (action.type) {

        case ImportChangesActionTypes.POST_GAINING_SUCCESS: {
            return { ...state, gainingLoading: false, gainingImportChanges: ImportChangesDeserializer.deserialize(action.payload) };
        }
        case ImportChangesActionTypes.POST_MEMBERS_SUCCESS: {
            return { ...state, membersLoading: false, memberImportChanges: ImportChangesDeserializer.deserialize(action.payload) };
        }
        case ImportChangesActionTypes.POST_MEMBERS_REQUEST: {
            return {
                ...state,
                membersLoading: true
            };
        }
        case ImportChangesActionTypes.POST_GAINING_REQUEST: {
            return {
                ...state,
                gainingLoading: true
            };
        }
        case ImportChangesActionTypes.POST_MEMBERS_ERROR: {
            return { ...state, membersLoading: false, membersError: action.payload };
        }
        case ImportChangesActionTypes.POST_GAINING_ERROR: {
            return { ...state, loading: false, gainingError: action.payload };
        }
        default: {
            return state;
        }
    }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as importChangesReducer };
export { initialState as ImportChangeInitState }
import {Reducer} from 'redux';
import ImportChangeModel from "./MemberImportChangeModel";
import {ImportChangesActionTypes, ImportChangesState} from "./types";
import {ImportChangesDeserializer} from "../../util/ImportChangesDeserializer";
import MemberImportChangeModel from "./MemberImportChangeModel";
import BilletImportChangeModel from "./BilletImportChangeModel";
import GainingImportChangeModel from "./GainingImportChangeModel";


// Type-safe initialState!
export const initialState: ImportChangesState = {
    gainingImportChanges: [] as GainingImportChangeModel[],
    memberImportChanges: [] as MemberImportChangeModel[],
    billetImportChanges: [] as BilletImportChangeModel[],
    loading: false,
    success: undefined,
    errors: "",
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<ImportChangesState> = (state = initialState, action) => {
    switch (action.type) {
        case ImportChangesActionTypes.POST_GAINING_SUCCESS: {
            return { ...state, success: true, loading: false, gainingImportChanges: ImportChangesDeserializer.deserialize(action.payload) };
        }
        case ImportChangesActionTypes.POST_MEMBERS_SUCCESS: {
            return { ...state, success: true, loading: false, memberImportChanges: ImportChangesDeserializer.deserialize(action.payload) };
        }
        case ImportChangesActionTypes.IMPORT_LOADING: {
            return {
                ...state,
                loading: true
            };
        }
        case ImportChangesActionTypes.SET_IMPORT_LOADING: {
            return {
                ...state,
                success: undefined,
                loading: action.payload
            };
        }
        case ImportChangesActionTypes.RESET_IMPORT_ERROR: {
            return {
                ...state,
                errors: ""
            };
        }
        case ImportChangesActionTypes.IMPORT_ERROR: {
            return {
                ...state,
                loading: false,
                success: false,
                errors: action.payload
            };
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
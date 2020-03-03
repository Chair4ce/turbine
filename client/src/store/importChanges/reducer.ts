import {Reducer} from 'redux';
import ImportChangeModel from "./ImportChangeModel";
import {ImportChangesActionTypes, ImportChangesState} from "./types";
import {ImportChangesDeserializer} from "../../util/ImportChangesDeserializer";


// Type-safe initialState!
export const initialState: ImportChangesState = {
    gainingImportChanges: [] as ImportChangeModel[],
    memberImportChanges: [] as ImportChangeModel[],
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<ImportChangesState> = (state = initialState, action) => {
    switch (action.type) {

        case ImportChangesActionTypes.POST_GAINING_SUCCESS: {
            return { ...state, gainingImportChanges: ImportChangesDeserializer.deserialize(action.payload) };
        }
        case ImportChangesActionTypes.POST_MEMBER_SUCCESS: {
            return { ...state, memberImportChanges: ImportChangesDeserializer.deserialize(action.payload) };
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
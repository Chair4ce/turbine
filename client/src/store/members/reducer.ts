import { Reducer } from 'redux';
import { MembersState, MemberActionTypes } from './types';
import MemberModel from "./MemberModel";
import {MemberDeserializer} from "../../util/MemberDeserializer";
import GenericGroupCollectionModel from "./GenericGroupCollectionModel";

// Type-safe initialState!
export const initialState: MembersState = {
    data: [] as MemberModel[],
    loading: false,
    genericAFSCList: [] as GenericGroupCollectionModel[],
    workcenterList: [] as GenericGroupCollectionModel[],
    errors: undefined,
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<MembersState> = (state = initialState, action) => {
    switch (action.type) {
        case MemberActionTypes.FETCH_REQUEST: {
            return {
                ...state,
                loading: true
            };
        }
        case MemberActionTypes.FETCH_SUCCESS: {
            return { ...state, loading: false, data: action.payload};
        }
        case MemberActionTypes.GENERATE_AFSCLIST: {
            return { ...state, loading: false, data: action.payload};
        }
        case MemberActionTypes.GENERATE_WORKCENTERLIST: {
            return { ...state, loading: false, data: action.payload};
        }
        case MemberActionTypes.FETCH_ERROR: {
            return { ...state, loading: false, errors: action.payload };
        }
        case MemberActionTypes.POST_REQUEST: {
            return {
                ...state,
                loading: true
            };
        }
        default: {
            return state;
        }
    }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as membersReducer };
export { initialState as MemberInitState };

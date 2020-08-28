import {Reducer} from 'redux';
import {MemberActionTypes, MembersState} from './types';
import MemberModel from "./models/MemberModel";
import GainingMemberModel from "./models/GainingMemberModel";
import GenericGroupCollectionModel from "./models/GenericGroupCollectionModel";
import GenericGainingGroupCollectionModel from "./models/GenericGainingGroupCollectionModel";
import UploadMemberModel from "./models/UploadMemberModel";

// Type-safe initialState!
export const initialState: MembersState = {
    data: [] as MemberModel[],
    upload: [] as UploadMemberModel[],
    gainingData: [] as GainingMemberModel[],
    loading: false,
    staging: false,
    gainingLoading: false,
    genericAFSCList: [] as GenericGroupCollectionModel[],
    genericGainingAFSCList: [] as GenericGainingGroupCollectionModel[],
    officeCollection: [] as GenericGroupCollectionModel[],
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
        case MemberActionTypes.STAGE_UPLOAD_DATA: {
            return {
                ...state,
                upload: action.payload
            };
        }
        case MemberActionTypes.STAGING_UPLOAD: {
            return {
                ...state,
                staging: action.payload
            };
        }
        case MemberActionTypes.FETCH_GAINING_REQUEST: {
            return {
                ...state,
                gainingLoading: true
            };
        }
        case MemberActionTypes.FETCH_SUCCESS: {
            return { ...state, loading: false, data: action.payload};
        }
        case MemberActionTypes.GAINING_FETCH_SUCCESS: {
            return { ...state, gainingLoading: false, gainingData: action.payload};
        }
        case MemberActionTypes.UNIQUE_AFSC_COLLECTION_FETCH_SUCCESS: {
            return { ...state, loading: false, genericAFSCList: action.payload};
        }
        case MemberActionTypes.UNIQUE_AFSC_GAINING_COLLECTION_FETCH_SUCCESS: {
            return { ...state, loading: false, genericGainingAFSCList: action.payload};
        }
        case MemberActionTypes.UNIQUE_AFSC_GAINING_COLLECTION_FETCH_ERROR: {
            return { ...state, loading: false, errors: action.payload};
        }
        case MemberActionTypes.UNIQUE_AFSC_COLLECTION_FETCH_ERROR: {
            return { ...state, loading: false, errors: action.payload};
        }
        case MemberActionTypes.OFFICE_COLLECTION_FETCH_SUCCESS: {
            return { ...state, loading: false, officeCollection: action.payload};
        }
        case MemberActionTypes.OFFICE_COLLECTION_FETCH_ERROR: {
            return { ...state, loading: false, errors: action.payload};
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

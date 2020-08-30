// This file holds our state type, as well as any other types related to this Redux store.

// Response object for GET /members

import MemberModel from "./models/MemberModel";
import GainingMemberModel from "./models/GainingMemberModel";
import GenericGroupCollectionModel from "./models/GenericGroupCollectionModel";
import GenericGainingGroupCollectionModel from "./models/GenericGainingGroupCollectionModel";
import UploadMemberModel from "./models/UploadMemberModel";
import StagingUploadMemberModel from "./models/StagingUploadMemberModel";
import StagingUploadGainingModel from "./models/StagingUploadGainingModel";


// This type is basically shorthand for `{ [key: string]: any }`. Feel free to replace `any` with
// the expected return type of your API response.
export type ApiResponse = Record<string, any>;

// Use `enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export enum MemberActionTypes {
    FETCH_REQUEST = '@@members/FETCH_REQUEST',
    RESET_MEMBER_SUCCESS = '@@members/RESET_MEMBER_SUCCESS',
    RESET_GAINING_SUCCESS = '@@members/RESET_GAINING_SUCCESS',
    FETCH_GAINING_REQUEST = '@@members/FETCH_GAINING_REQUEST',
    FETCH_SUCCESS = '@@members/FETCH_SUCCESS',
    GAINING_FETCH_SUCCESS = '@@members/GAINING_FETCH_SUCCESS',
    GAINING_FETCH_ERROR = '@@members/GAINING_FETCH_ERROR',
    UNIQUE_AFSC_COLLECTION_FETCH_SUCCESS = '@@members/UNIQUE_AFSC_COLLECTION_FETCH_SUCCESS',
    UNIQUE_AFSC_GAINING_COLLECTION_FETCH_SUCCESS = '@@members/UNIQUE_AFSC_GAINING_COLLECTION_FETCH_SUCCESS',
    UNIQUE_AFSC_COLLECTION_FETCH_ERROR = '@@members/UNIQUE_AFSC_COLLECTION_FETCH_ERROR',
    UNIQUE_AFSC_GAINING_COLLECTION_FETCH_ERROR = '@@members/UNIQUE_AFSC_GAINING_COLLECTION_FETCH_ERROR',
    OFFICE_COLLECTION_FETCH_SUCCESS = '@@members/OFFICE_COLLECTION_FETCH_SUCCESS',
    OFFICE_COLLECTION_FETCH_ERROR = '@@members/OFFICE_COLLECTION_FETCH_ERROR',
    FETCH_ERROR = '@@members/FETCH_ERROR',
    POST_ERROR = '@@members/POST_ERROR',
    POST_REQUEST = '@@members/POST_REQUEST',
    STAGING_UPLOAD = '@@members/STAGING_UPLOAD',
    STAGE_UPLOAD_GAINING_DATA = '@@members/STAGE_UPLOAD_GAINING_DATA',
    STAGE_UPLOAD_DATA = '@@members/STAGE_UPLOAD_DATA',
    POST_SUCCESS = '@@members/POST_SUCCESS',
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface MembersState {
    readonly loading: boolean;
    readonly successAlpha: boolean;
    readonly successGaining: boolean;
    readonly staging: boolean;
    readonly gainingLoading: boolean;
    readonly data: MemberModel[];
    readonly uploadStagingMember: StagingUploadMemberModel[];
    readonly uploadStagingGaining: StagingUploadGainingModel[];
    readonly gainingData: GainingMemberModel[];
    readonly genericAFSCList: GenericGroupCollectionModel[];
    readonly genericGainingAFSCList: GenericGainingGroupCollectionModel[];
    readonly officeCollection: GenericGroupCollectionModel[];
    readonly errors?: string;
}

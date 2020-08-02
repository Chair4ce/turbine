import {action} from 'typesafe-actions';
import {MemberActionTypes} from './types';
import MemberModel from "./models/MemberModel";
import GenericGroupCollectionModel from "./models/GenericGroupCollectionModel";
import GainingMemberModel from "./models/GainingMemberModel";
import GenericGainingGroupCollectionModel from "./models/GenericGainingGroupCollectionModel";

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions
export const membersFetchRequest = () => action(MemberActionTypes.FETCH_REQUEST);
export const membersPostError = (message: string) => action(MemberActionTypes.POST_ERROR, message);
export const gainingMembersFetchError = (message: string) => action(MemberActionTypes.GAINING_FETCH_ERROR, message);
// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.
export const membersFetchSuccess = (payload: MemberModel[]) => action(
    MemberActionTypes.FETCH_SUCCESS, payload);
export const gainingMembersFetchSuccess = (payload: GainingMemberModel[]) => action(
    MemberActionTypes.GAINING_FETCH_SUCCESS, payload);
export const uniqueAFSCCollectionFetchSuccess = (payload: GenericGroupCollectionModel[]) => action(
    MemberActionTypes.UNIQUE_AFSC_COLLECTION_FETCH_SUCCESS, payload);
export const uniqueGainingAFSCCollectionFetchSuccess = (payload: GenericGainingGroupCollectionModel[]) => action(
    MemberActionTypes.UNIQUE_AFSC_GAINING_COLLECTION_FETCH_SUCCESS, payload);
export const uniqueAFSCCollectionFetchError = (message: string) => action(MemberActionTypes.UNIQUE_AFSC_COLLECTION_FETCH_ERROR, message);
export const officeCollectionFetchSuccess = (payload: GenericGroupCollectionModel[]) => action(
    MemberActionTypes.OFFICE_COLLECTION_FETCH_SUCCESS, payload);
export const officeCollectionFetchError = (message: string) => action(MemberActionTypes.OFFICE_COLLECTION_FETCH_SUCCESS, message);
// export const saveWorkCenterList = (payload: GenericGroupCollectionModel[]) => action(
//     MemberActionTypes.GENERATE_WORKCENTERLIST, payload);
export const membersFetchError = (message: string) => action(MemberActionTypes.FETCH_ERROR, message);






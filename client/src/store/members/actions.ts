import {action} from 'typesafe-actions';
import {MemberActionTypes} from './types';
import MemberModel from "./MemberModel";

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions
export const membersFetchRequest = () => action(MemberActionTypes.FETCH_REQUEST);
export const membersPostSuccess = () => action(MemberActionTypes.POST_SUCCESS);
export const membersPostError = (message: string) => action(MemberActionTypes.POST_ERROR, message);
// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.
export const membersFetchSuccess = (payload: MemberModel[]) => action(
    MemberActionTypes.FETCH_SUCCESS, payload);
export const membersFetchError = (message: string) => action(MemberActionTypes.FETCH_ERROR, message);




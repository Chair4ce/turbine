import {action} from 'typesafe-actions';
import ImportChangeModel from "./ImportChangeModel";
import {ImportChangesActionTypes} from "./types";
import {MemberActionTypes} from "../members";

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions

// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.

export const gainingPostSuccess = (payload: ImportChangeModel[]) => action(ImportChangesActionTypes.POST_GAINING_SUCCESS, payload);
export const membersPostSuccess = (payload: ImportChangeModel[]) => action(ImportChangesActionTypes.POST_MEMBERS_SUCCESS, payload);
export const membersPostRequest = () => action(ImportChangesActionTypes.POST_MEMBERS_REQUEST);
export const gainingPostRequest = () => action(ImportChangesActionTypes.POST_GAINING_REQUEST);
export const gainingPostError = (message: string) => action(ImportChangesActionTypes.POST_GAINING_ERROR, message);
export const membersPostError = (message: string) => action(ImportChangesActionTypes.POST_MEMBERS_ERROR, message);
import {action} from 'typesafe-actions';
import MemberImportChangeModel from "./MemberImportChangeModel";
import {ImportChangesActionTypes} from "./types";
import BilletImportChangeModel from "./BilletImportChangeModel";
import GainingImportChangeModel from "./GainingImportChangeModel";

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions

// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.

export const gainingPostSuccess = (payload: GainingImportChangeModel[]) => action(ImportChangesActionTypes.POST_GAINING_SUCCESS, payload);
export const membersPostSuccess = (payload: MemberImportChangeModel[]) => action(ImportChangesActionTypes.POST_MEMBERS_SUCCESS, payload);
export const billetPostSuccess = (payload: BilletImportChangeModel[]) => action(ImportChangesActionTypes.POST_BILLET_SUCCESS, payload);
export const importRequest = () => action(ImportChangesActionTypes.IMPORT_LOADING);
export const importError = (payload: string) => action(ImportChangesActionTypes.IMPORT_ERROR, payload);
export const setImportLoading = (payload: boolean) => action(ImportChangesActionTypes.SET_IMPORT_LOADING, payload);
export const resetImportError = (payload: string) => action(ImportChangesActionTypes.RESET_IMPORT_ERROR, payload);


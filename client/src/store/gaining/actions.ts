import { action } from 'typesafe-actions';
import { GainingActionTypes} from './types';
import GainingModel from "./GainingModel";

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions
export const gainingFetchRequest = () => action(GainingActionTypes.FETCH_REQUEST);
export const gainingPostRequest = () => action(GainingActionTypes.POST_REQUEST);

// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.
export const gainingFetchSuccess = (payload: GainingModel[]) => action(
    GainingActionTypes.FETCH_SUCCESS, payload);
export const gainingFetchError = (message: string) => action(GainingActionTypes.FETCH_ERROR, message);

export const gainingPostSuccess = () => action(GainingActionTypes.POST_SUCCESS);
export const gainingPostError = (message: string) => action(GainingActionTypes.POST_ERROR, message);



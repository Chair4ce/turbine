import { action } from 'typesafe-actions';
import { AETActionTypes} from './types';
import AETModel from "./AETModel";

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions
export const AETsFetchRequest = () => action(AETActionTypes.FETCH_REQUEST);

// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.
export const AETsFetchSuccess = (payload: AETModel[]) => action(AETActionTypes.FETCH_SUCCESS, payload);
export const AETsFetchError = (message: string) => action(AETActionTypes.FETCH_ERROR, message);

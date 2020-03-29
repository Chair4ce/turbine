

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions
import {action} from "typesafe-actions";
import {BilletActionTypes} from "./types";
import BilletModel from "./BilletModel";

export const billetFetchRequest = () => action(BilletActionTypes.FETCH_REQUEST);

// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.
export const billetFetchSuccess = (payload: BilletModel[]) => action(
    BilletActionTypes.FETCH_SUCCESS, payload);
export const billetFetchError = (message: string) => action(BilletActionTypes.FETCH_ERROR, message);




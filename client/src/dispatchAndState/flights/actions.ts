import { action } from 'typesafe-actions';
import { FlightActionTypes} from './types';
import FlightModel from "./FlightModel";

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions
export const flightsFetchRequest = () => action(FlightActionTypes.FETCH_REQUEST);

// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.
export const flightsFetchSuccess = (payload: FlightModel[]) => action(FlightActionTypes.FETCH_SUCCESS, payload);
export const flightsFetchError = (message: string) => action(FlightActionTypes.FETCH_ERROR, message);

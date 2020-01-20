import { action } from 'typesafe-actions';
import { SquadronActionTypes} from './types';
import SquadronModel from "./SquadronModel";

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions

// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.
export const squadronsFetchRequest = () => action(SquadronActionTypes.FETCH_REQUEST);
export const squadronsFetchSuccess = (payload: SquadronModel[]) => action(SquadronActionTypes.FETCH_SUCCESS, payload);
export const squadronsFetchError = (message: string) => action(SquadronActionTypes.FETCH_ERROR, message);

export const squadronPostRequest = (data: SquadronModel) => action(SquadronActionTypes.POST_REQUEST, data);
export const squadronPostSuccess = () => action(SquadronActionTypes.POST_SUCCESS);
export const squadronPostError = (message: string) => action(SquadronActionTypes.POST_ERROR, message);

export const showSquadronInput = () => action(SquadronActionTypes.SHOW_INPUT);
export const updateSquadronInputState = (data: SquadronModel) => action(SquadronActionTypes.UPDATE_INPUT, data);

import {action} from 'typesafe-actions';
import SquadronTask from "./SquadronTaskModel";
import {SquadronTaskActionTypes} from "./types";

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions

// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.


export const squadronTaskPostSuccess = (payload: SquadronTask[]) => action(SquadronTaskActionTypes.POST_SQUADRON_TASK_SUCCESS, payload);
export const squadronTaskPostRequest = () => action(SquadronTaskActionTypes.POST_SQUADRON_TASK_SUCCESS);
export const squadronTaskPostError = (payload: String) => action(SquadronTaskActionTypes.POST_SQUADRON_TASK_SUCCESS, payload);
export const squadronTaskDetailSuccess = (payload: String) => action(SquadronTaskActionTypes.POST_SQUADRON_TASK_DETAILS_SUCCESS, payload);
export const squadronTaskDetailError = (payload: String) => action(SquadronTaskActionTypes.POST_SQUADRON_TASK_DETAILS_SUCCESS, payload);


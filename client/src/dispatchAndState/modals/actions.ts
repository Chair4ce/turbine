import {ShowModalActionTypes} from "./types";
import {action} from "typesafe-actions";


export const setCSVModalDisplay = (payload: boolean) => action(ShowModalActionTypes.SHOW_CSV_INPUT, payload);
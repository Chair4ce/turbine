import {ShowModalActionTypes} from "./types";
import {action} from "typesafe-actions";


export const toggleUploadModal = (payload: boolean) => action(ShowModalActionTypes.TOGGLE_CSV_INPUT, payload);
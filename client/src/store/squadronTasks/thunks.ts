
import {callApi} from "../../util/api";
import {squadronTaskPostError, squadronTaskPostSuccess} from "./actions";
import SquadronTask from "./SquadronTaskModel";
import {squadronPostRequest} from "../squadrons";

export const createNewSquadronTask = (squadronTask: SquadronTask) => {
    return (dispatch: any) => {
        dispatch(squadronPostRequest);
        callApi('POST', 'api/sqTask/save', squadronTask)
            .then(res => dispatch(squadronTaskPostSuccess(res)))
            .catch(err => dispatch(squadronTaskPostError(err.toString())))
    }
};

export const deleteNewSquadronTask = (squadronTaskId: number) => {
    return (dispatch: any) => {
        dispatch(squadronPostRequest);
        callApi('POST', 'api/sqTask/delete', squadronTaskId)
            .then(res => dispatch(squadronTaskPostSuccess(res)))
            .catch(err => dispatch(squadronTaskPostError(err.toString())))
    }
};

export const getSquadronTask = () => {
    return (dispatch: any) => {
        dispatch(squadronPostRequest);
        callApi('GET', 'api/sqTask/get')
            .then(res => dispatch(squadronTaskPostSuccess(res)))
            .catch(err => dispatch(squadronTaskPostError(err.toString())))
    }
};

export const updateNewSquadronTask = (gaining: SquadronTask) => {
    return(dispatch: any) => {
        dispatch(squadronPostRequest);
        return  callApi('POST', 'api/gaining/update', gaining)
            .then(res => dispatch(squadronTaskPostSuccess(res)))
            .catch((err => dispatch(squadronTaskPostError(err.toString()))));
    }
};
import {callApi} from "../../util/api";
import {
    squadronTaskDetailError, squadronTaskDetailSuccess,
    squadronTaskPostError,
    squadronTaskPostSuccess
} from "./actions";
import SquadronTask from "./SquadronTaskModel";
import {squadronPostRequest} from "../squadrons";
import NewSquadronTask from "./NewSquadronTask";

export const createNewSquadronTask = (newSquadronTask: NewSquadronTask) => {
    return (dispatch: any) => {
        dispatch(squadronPostRequest);
       return callApi('POST', 'api/sqTask/save', newSquadronTask)
            .then(res => dispatch(squadronTaskPostSuccess(res)))
            .catch(err => dispatch(squadronTaskPostError(err.toString())))
    }
};

export const deleteSquadronTask = (squadronTaskId: number) => {
    return (dispatch: any) => {
        dispatch(squadronPostRequest);
       return callApi('POST', 'api/sqTask/delete', squadronTaskId)
            .then(res => dispatch(squadronTaskPostSuccess(res)))
            .catch(err => dispatch(squadronTaskPostError(err.toString())))
    }
};

export const getSquadronTasks = () => {
    return (dispatch: any) => {
        dispatch(squadronPostRequest);
       return callApi('GET', 'api/sqTask')
            .then(res => dispatch(squadronTaskPostSuccess(res)))
            .catch(err => dispatch(squadronTaskPostError(err.toString())))
    }
};

export const getSquadronTaskDetails = () => {
    return (dispatch: any) => {
        dispatch(squadronPostRequest);
       return callApi('GET', 'api/sqTask/details')
            .then(res => dispatch(squadronTaskDetailSuccess(res)))
            .catch(err => dispatch(squadronTaskDetailError(err.toString())))
    }
};

export const updateNewSquadronTask = (newTask: SquadronTask) => {
    return(dispatch: any) => {
        dispatch(squadronPostRequest);
        return  callApi('POST', 'api/sqTask/update', newTask)
            .then(res => dispatch(squadronTaskPostSuccess(res)))
            .catch((err => dispatch(squadronTaskPostError(err.toString()))));
    }
};
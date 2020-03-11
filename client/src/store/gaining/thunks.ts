import {gainingFetchError, gainingFetchRequest, gainingFetchSuccess} from './actions';
import {callApi} from '../../util/api';
import FeedbackModel from "../members/FeedbackModel";
import {membersFetchError} from "../members";
import GainingModel from "./GainingModel";


export const getGainingMembers = () => {
    return(dispatch: any) => {
        dispatch(gainingFetchRequest());
        return callApi( 'get', 'api/gaining')
            .then(res => dispatch(gainingFetchSuccess(res)))
            .catch((err => dispatch(gainingFetchError(err))));
    }
};

export const deleteGaining = (id: number) => {
    return (dispatch: any) => {
        console.log("Deleting: " + id);
        return callApi('POST', 'api/gaining/delete', id)
            .then(res => gainingFetchSuccess(res))
            .catch((err => {
            dispatch(gainingFetchError(err));
        }));
    };
};

export const updateGaining = (gaining: GainingModel) => {
    return (dispatch: any) => {
        console.log("Deleting: " + gaining);
        return callApi('POST', 'api/gaining/update', gaining)
            .then(res => gainingFetchSuccess(res))
            .catch((err => {
                dispatch(gainingFetchError(err));
            }));
    };
};

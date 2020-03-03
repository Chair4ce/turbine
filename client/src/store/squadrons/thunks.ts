
import {
    squadronPostError,
    squadronPostRequest,
    squadronPostSuccess,
    squadronsFetchError,
    squadronsFetchRequest,
    squadronsFetchSuccess
} from './actions';
import {callApi} from '../../util/api';
import SquadronModel from "./SquadronModel";


export const getSquadrons = () => {
    return(dispatch: any) => {
        dispatch(squadronsFetchRequest());
        return callApi( 'get', 'api/squadrons')
            .then(res => dispatch(squadronsFetchSuccess(res)))
                .catch((err => dispatch(squadronsFetchError(err))));
    }
};

export const postNewSquadron = (data: SquadronModel) => {
        return(dispatch: any) => {
            dispatch(squadronPostRequest());
            return  callApi('post', 'api/squadrons/add', data)
                .then(res => dispatch(squadronPostSuccess(res)))
                .catch((err => dispatch(squadronPostError(err))));
        }
};


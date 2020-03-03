import {
    gainingFetchError,
    gainingFetchRequest,
    gainingFetchSuccess,
    gainingPostError,
    gainingPostRequest
} from './actions';
import {callApi} from '../../util/api';
import {gainingPostSuccess} from "../importChanges";
import UploadGainingModel from "./UploadGainingModel";


export const getGainingMembers = () => {
    return(dispatch: any) => {
        dispatch(gainingFetchRequest());
        return callApi( 'get', 'api/gaining')
            .then(res => dispatch(gainingFetchSuccess(res)))
            .catch((err => dispatch(gainingFetchError(err))));
    }
};

export const saveGainingsFromCsv = (gaining: UploadGainingModel[]) => {
    return(dispatch: any) => {
        dispatch(gainingPostRequest());
        return  callApi('post', 'api/gaining/save', gaining)
            .then(res => dispatch(gainingPostSuccess(res)))
            .catch((err => dispatch(gainingPostError(err))));
    }
};

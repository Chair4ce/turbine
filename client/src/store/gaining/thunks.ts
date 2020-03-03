import {gainingFetchError, gainingFetchRequest, gainingFetchSuccess} from './actions';
import {callApi} from '../../util/api';


export const getGainingMembers = () => {
    return(dispatch: any) => {
        dispatch(gainingFetchRequest());
        return callApi( 'get', 'api/gaining')
            .then(res => dispatch(gainingFetchSuccess(res)))
            .catch((err => dispatch(gainingFetchError(err))));
    }
};



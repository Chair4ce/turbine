
import {callApi} from '../../util/api';
import {billetFetchError, billetFetchRequest, billetFetchSuccess} from "./actions";
import BilletModel from "./BilletModel";



export const getBilletMembers = () => {
    return (dispatch: any) => {
        dispatch(billetFetchRequest());
        callApi( 'get', 'api/billet')
            .then(res => dispatch(billetFetchSuccess(res)))
            .catch((err => dispatch(billetFetchError(err))));
    }
};

export const deleteBillet = (id: number) => {
    return (dispatch: any) => {
       dispatch(billetFetchRequest);
       callApi('POST', 'api/billet/delete', id)
            .then(res => billetFetchSuccess(res))
            .catch((err => {
            dispatch(billetFetchError(err));
        }));
    };
};

export const updateBillet = (billet: BilletModel) => {
    return (dispatch: any) => {
        callApi('POST', 'api/billet/update', billet)
            .then(res => billetFetchSuccess(res))
            .catch((err => {
                dispatch(billetFetchError(err));
            }));
    };
};

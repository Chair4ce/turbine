import {membersFetchError, membersFetchRequest, membersFetchSuccess} from './actions';
import {callApi} from '../../util/api';
import FeedbackModel from "./FeedbackModel";


export const getMembers = () => {
    return (dispatch: any) => {
        dispatch(membersFetchRequest());
        callApi('get', 'api/members')
            .then(res => dispatch(membersFetchSuccess(res)))
            .catch((err => dispatch(membersFetchError(err))
            ));
    }
};

export const postFeedback = (feedback: FeedbackModel) => {
    return (dispatch: any) => {
        callApi('POST', 'api/feedback/submit', feedback).catch((err => {
            dispatch(membersFetchError(err));
        }));
    };
};



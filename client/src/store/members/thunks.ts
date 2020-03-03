import {membersFetchError, membersFetchRequest, membersFetchSuccess, membersPostError} from './actions';
import {callApi} from '../../util/api';
import FeedbackModel from "./FeedbackModel";
import {membersPostSuccess} from "../importChanges";
import UploadMemberModel from "./UploadMemberModel";


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

export const saveMembersFromCsv = (members: UploadMemberModel[]) => {
return (dispatch: any) => {
        callApi('POST', 'api/members/save', members)
            .then(res => dispatch(membersPostSuccess(res)))
            .catch(e => dispatch(membersPostError(e)))
    }
};

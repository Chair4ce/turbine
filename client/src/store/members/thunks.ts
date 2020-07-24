import {
    membersFetchError,
    membersFetchRequest,
    membersFetchSuccess,
    membersPostError,
    membersPostSuccess
} from './actions';
import {callApi} from '../../util/api';
import FeedbackModel from "./FeedbackModel";
import UploadMemberModel from "./UploadMemberModel";
import {MemberDeserializer} from "../../util/MemberDeserializer";
import {CurrentMemberSerializer} from "../../util/MemberSerializer";


export const getMembers = () => {
    return (dispatch: any) => {
        dispatch(membersFetchRequest());
        callApi('get', 'api/members')
            .then(res => dispatch(membersFetchSuccess(CurrentMemberSerializer.SerializeFromBackend(res))))
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

export const saveCurrentRoster = (members: UploadMemberModel[]) => {
    return (dispatch: any) => {
        dispatch(membersFetchRequest());
        callApi('POST', 'api/members/save', CurrentMemberSerializer.serializeToBackend(members))
            .then(res => dispatch(membersFetchSuccess(CurrentMemberSerializer.SerializeFromBackend(res))))
            .catch(e => dispatch(membersPostError(e)))
    }
};



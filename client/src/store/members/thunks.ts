import {
    membersFetchError,
    membersFetchRequest,
    membersFetchSuccess,
    membersPostError,
    saveGenericAFSCList, saveWorkCenterList
} from './actions';
import {callApi} from '../../util/api';
import UploadMemberModel from "./UploadMemberModel";
import {CurrentMemberSerializer} from "../../util/MemberSerializer";
import MemberModel from "./MemberModel";
import GenericGroupCollection from "./GenericGroupCollectionModel";


export const getMembers = () => {
    return (dispatch: any) => {
        dispatch(membersFetchRequest());
        callApi('get', 'api/members')
            .then(res => dispatch(membersFetchSuccess(CurrentMemberSerializer.SerializeFromBackend(res)))
            ).catch(err => dispatch(membersFetchError(err))
            );
    }
};

export const saveCurrentRoster = (members: UploadMemberModel[]) => {
    return (dispatch: any) => {
        dispatch(membersFetchRequest());
        callApi('POST', 'api/members/save', CurrentMemberSerializer.serializeToBackend(members))
            .then(res => dispatch(membersFetchSuccess(CurrentMemberSerializer.SerializeFromBackend(res))))
            .catch(e => dispatch(membersPostError(e)))
    }
};



import {
    gainingFetchRequest,
    gainingMembersFetchError,
    gainingMembersFetchSuccess,
    membersFetchError,
    membersFetchRequest,
    membersFetchSuccess,
    membersPostError,
    officeCollectionFetchError,
    officeCollectionFetchSuccess,
    uniqueAFSCCollectionFetchError,
    uniqueAFSCCollectionFetchSuccess, uniqueGainingAFSCCollectionFetchSuccess
} from './actions';
import {callApi} from '../../util/api';
import UploadMemberModel from "./models/UploadMemberModel";
import {MemberSerializer} from "../../util/MemberSerializer";
import UploadGainingMemberModel from "./models/UploadGainingMemberModel";
import MemberModel from "./models/MemberModel";


export const getMembers = () => {
    return (dispatch: any) => {
        dispatch(membersFetchRequest());
        callApi('get', 'api/members')
            .then(res => dispatch(membersFetchSuccess(MemberSerializer.serializeFromBackend(res)))
            ).catch(err => dispatch(membersFetchError(err))
            );
    }
};

export const getGainingMembers = () => {
    return (dispatch: any) => {
        dispatch(gainingFetchRequest());
        callApi('get', 'api/members/gaining')
            .then(res => dispatch(gainingMembersFetchSuccess(MemberSerializer.serializeGainingMembersFromBackend(res)))
            ).catch(err => dispatch(gainingMembersFetchError(err))
        );
    }
};

export const getUniqueAFSCCollection = () => {
    return (dispatch: any) => {
        dispatch(membersFetchRequest());
        callApi('get', 'api/members/DAFSCCollection')
            .then(res => dispatch(uniqueAFSCCollectionFetchSuccess(MemberSerializer.serializeUniqueCollectionFromBackend(res)))
            ).catch(err => dispatch(uniqueAFSCCollectionFetchError(err))
        );
    }
};

export const getOfficeCollection = () => {
    return (dispatch: any) => {
        dispatch(membersFetchRequest());
        callApi('get', 'api/members/officeCollection')
            .then(res => dispatch(officeCollectionFetchSuccess(MemberSerializer.serializeUniqueCollectionFromBackend(res)))
            ).catch(err => dispatch(officeCollectionFetchError(err))
        );
    }
};

export const getDistinctGainingAFSCCollection = () => {
    return (dispatch: any) => {
        dispatch(gainingFetchRequest());
        callApi('get', 'api/members/gaining/DAFSCCollection')
            .then(res => dispatch(uniqueGainingAFSCCollectionFetchSuccess(MemberSerializer.serializeGainingCollectionFromBackend(res)))
            ).catch(err => dispatch(uniqueAFSCCollectionFetchError(err))
        );
    }
};

export const saveCurrentRoster = (members: UploadMemberModel[]) => {
    return (dispatch: any) => {
        dispatch(membersFetchRequest());
        callApi('POST', 'api/members/save', MemberSerializer.serializeToBackend(MemberModel.filterEnlistedUploadOnly(members)))
            .then(res => dispatch(membersFetchSuccess(MemberSerializer.serializeFromBackend(res))))
            .catch(e => dispatch(membersPostError(e)))
    }
};

export const saveGainingMembers = (members: UploadGainingMemberModel[]) => {
    return (dispatch: any) => {
        dispatch(gainingFetchRequest());
        callApi('POST', 'api/members/gaining/save', MemberSerializer.serializeGainingMembersToBackend(members))
            .then(res => dispatch(gainingMembersFetchSuccess(MemberSerializer.serializeGainingMembersFromBackend(res))))
            .catch(err => dispatch(gainingMembersFetchError(err)))
    }
};



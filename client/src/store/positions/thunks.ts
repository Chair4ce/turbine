import {callApi} from "../../util/api";
import {
    doubleBilletedFetchRequest,
    doubleBilletedPostError,
    doubleBilletedPostSuccess,
    positionsFetchError,
    positionsFetchRequest,
    positionsFetchSuccess,
    unassignedMembersFetchError,
    unassignedMembersFetchRequest,
    unassignedMembersFetchSuccess,
    unFundedMembersFetchError,
    unFundedMembersFetchRequest,
    unFundedMembersFetchSuccess
} from "./actions";
import {PositionSerializer} from "../../util/PositionSerializer";
import {MemberSerializer} from "../../util/MemberSerializer";
import UploadPositionModel from "./models/UploadPositionModel";

export const getPositions = () => {
    return (dispatch: any) => {
        dispatch(positionsFetchRequest());
        callApi('get', 'positions')
            .then(res => dispatch(positionsFetchSuccess(PositionSerializer.serializeFromBackend(res)))
            ).catch(err => dispatch(positionsFetchError(err))
        );
    }
};

export const savePositions = (positions: UploadPositionModel[]) => {
    return (dispatch: any) => {
        dispatch(positionsFetchRequest());
        callApi('POST', 'positions/save',PositionSerializer.serializeToBackend(positions))
            .then(res => dispatch(positionsFetchSuccess(PositionSerializer.serializeFromBackend(res)))
            ).catch(err => dispatch(positionsFetchError(err))
        );
    }
};

export const getUnfundedMembers = () => {
    return (dispatch: any) => {
        dispatch(unFundedMembersFetchRequest());
        callApi('get', 'positions/unassigned')
            .then(res => dispatch(unFundedMembersFetchSuccess(MemberSerializer.serializeFromBackend(res)))
            ).catch(err => dispatch(unFundedMembersFetchError(err))
        );
    }
};

export const getUnassignedMembers = () => {
    return (dispatch: any) => {
        dispatch(unassignedMembersFetchRequest());
        callApi('get', 'positions/unassigned')
            .then(res => dispatch(unassignedMembersFetchSuccess(MemberSerializer.serializeFromBackend(res)))
            ).catch(err => dispatch(unassignedMembersFetchError(err))
        );
    }
};

export const getDoubleBilletedMembers = () => {
    return (dispatch: any) => {
        dispatch(doubleBilletedFetchRequest());
        callApi('get', 'positions/double')
            .then(res => dispatch(doubleBilletedPostSuccess(MemberSerializer.serializeFromBackend(res)))
            ).catch(err => dispatch(doubleBilletedPostError(err))
        );
    }
};
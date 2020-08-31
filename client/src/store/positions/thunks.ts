import {callApi} from "../../util/api";
import {
    chartDataFetchSuccess,
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
       return callApi('get', 'positions')
            .then(res => dispatch(positionsFetchSuccess(PositionSerializer.serializeFromBackend(res)))
            ).catch(err => dispatch(positionsFetchError(err))
        );
    }
};

export const getChartData = () => {
    return (dispatch: any) => {
        dispatch(positionsFetchRequest());
       return callApi('get','positions/manning_chart')
            .then(res => dispatch(chartDataFetchSuccess(PositionSerializer.serializeManningChartDataFromBackend(res)))
            ).catch(err => dispatch(positionsFetchError(err))
        );
    }
};

export const generateChartData = () => {
    return (dispatch: any) => {
        return callApi('get','positions/manning_chart/generate')
            .catch(err => dispatch(positionsFetchError(err)));
    }
};

export const savePositions = (positions: any[]) => {
    return (dispatch: any) => {
        dispatch(positionsFetchRequest());
       return callApi('POST', 'positions/save',PositionSerializer.serializeToBackend(positions))
            .then((res) => {
                console.log(res);
                dispatch(positionsFetchSuccess(PositionSerializer.serializeFromBackend(res)))
            }
            ).catch(err => dispatch(positionsFetchError(err))
        );
    }
};

export const getUnfundedMembers = () => {
    return (dispatch: any) => {
        dispatch(unFundedMembersFetchRequest());
       return callApi('get','positions/unassigned')
            .then(res => dispatch(unFundedMembersFetchSuccess(MemberSerializer.serializeFromBackend(res))))
           .catch(err => dispatch(unFundedMembersFetchError(err))
        );
    }
};

export const getUnassignedMembers = () => {
    return (dispatch: any) => {
        dispatch(unassignedMembersFetchRequest());
       return callApi('get' ,'positions/unassigned')
            .then(res => dispatch(unassignedMembersFetchSuccess(MemberSerializer.serializeFromBackend(res)))
            ).catch(err => dispatch(unassignedMembersFetchError(err))
        );
    }
};

export const getDoubleBilletedMembers = () => {
    return (dispatch: any) => {
        dispatch(doubleBilletedFetchRequest());
       return callApi('get','positions/double')
            .then(res => dispatch(doubleBilletedPostSuccess(MemberSerializer.serializeFromBackend(res)))
            ).catch(err => dispatch(doubleBilletedPostError(err))
        );
    }
};
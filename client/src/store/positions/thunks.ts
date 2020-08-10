import {callApi} from "../../util/api";
import {positionsFetchError, positionsFetchRequest, positionsFetchSuccess} from "./actions";
import {PositionSerializer} from "../../util/PositionSerializer";


export const getPositions = () => {
    return (dispatch: any) => {
        dispatch(positionsFetchRequest());
        callApi('get', 'positions')
            .then(res => dispatch(positionsFetchSuccess(PositionSerializer.serializeFromBackend(res)))
            ).catch(err => dispatch(positionsFetchError(err))
        );
    }
};

export const getUnassignedMembers = () => {
    return (dispatch: any) => {
        dispatch(positionsFetchRequest());
        callApi('get', 'positions/unassigned')
            .then(res => dispatch(positionsFetchSuccess(PositionSerializer.serializeFromBackend(res)))
            ).catch(err => dispatch(positionsFetchError(err))
        );
    }
};
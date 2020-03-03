import UploadMemberModel from "../members/UploadMemberModel";
import {callApi} from "../../util/api";
import {
    gainingPostError, gainingPostRequest,
    gainingPostSuccess,
    membersPostError,
    membersPostRequest,
    membersPostSuccess
} from "./actions";
import UploadGainingModel from "../gaining/UploadGainingModel";


export const saveMembersFromCsv = (members: UploadMemberModel[]) => {
    return (dispatch: any) => {
        dispatch(membersPostRequest());
        callApi('POST', 'api/members/save', members)
            .then(res => dispatch(membersPostSuccess(res)))
            .catch(e => dispatch(membersPostError(e.toString())))
    }
};


export const saveGainingsFromCsv = (gaining: UploadGainingModel[]) => {
    return(dispatch: any) => {
        dispatch(gainingPostRequest());
        return  callApi('post', 'api/gaining/save', gaining)
            .then(res => dispatch(gainingPostSuccess(res)))
            .catch((err => dispatch(gainingPostError(err.toString()))));
    }
};
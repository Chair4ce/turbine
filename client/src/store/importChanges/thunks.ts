import UploadMemberModel from "../members/UploadMemberModel";
import {callApi} from "../../util/api";
import {
    billetPostSuccess,
    gainingPostSuccess, importError, importRequest,
    membersPostSuccess
} from "./actions";
import UploadGainingModel from "../gaining/UploadGainingModel";
import UploadBilletModel from "../billet/UploadBilletModel";

export const saveMembersFromCsv = (members: UploadMemberModel[]) => {
    return (dispatch: any) => {
        dispatch(importError(""));
        dispatch(importRequest());
        callApi('POST', 'api/members/save', members)
            .then(res => dispatch(membersPostSuccess(res)))
            .catch(err => dispatch(importError(err.toString())))
    }
};

export const saveGainingsFromCsv = (gaining: UploadGainingModel[]) => {
    return(dispatch: any) => {
        dispatch(importError(""));
        dispatch(importRequest());
        return  callApi('post', 'api/gaining/save', gaining)
            .then(res => dispatch(gainingPostSuccess(res)))
            .catch(err => dispatch(importError(err.toString())));
    }
};

export const saveBilletsFromCsv = (gaining: UploadBilletModel[]) => {
    return(dispatch: any) => {
        dispatch(importError(""));
        dispatch(importRequest());
        return  callApi('post', 'api/billets/save', gaining)
            .then(res => dispatch(billetPostSuccess(res)))
            .catch(err => dispatch(importError(err.toString())));
    }
};
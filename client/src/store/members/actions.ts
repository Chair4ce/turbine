import {action} from 'typesafe-actions';
import {MemberActionTypes} from './types';
import MemberModel from "./MemberModel";
import GenericGroupCollectionModel from "./GenericGroupCollectionModel";
import {CurrentMemberSerializer} from "../../util/MemberSerializer";
import GenericGroupCollection from "./GenericGroupCollectionModel";

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions
export const membersFetchRequest = () => action(MemberActionTypes.FETCH_REQUEST);
export const membersPostSuccess = () => action(MemberActionTypes.POST_SUCCESS);
export const membersPostError = (message: string) => action(MemberActionTypes.POST_ERROR, message);
// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.
export const membersFetchSuccess = (payload: MemberModel[]) => action(
    MemberActionTypes.FETCH_SUCCESS, payload);
export const saveGenericAFSCList = (payload: GenericGroupCollectionModel[]) => action(
    MemberActionTypes.GENERATE_AFSCLIST, payload);
export const saveWorkCenterList = (payload: GenericGroupCollectionModel[]) => action(
    MemberActionTypes.GENERATE_WORKCENTERLIST, payload);
export const membersFetchError = (message: string) => action(MemberActionTypes.FETCH_ERROR, message);

function generateAFSCCOllection(members: MemberModel[]) {
    let afscList = [...new Set(members.map(item => item.dafsc ? item.dafsc.substring(0, 3) + "X" + item.dafsc.substring(4) : ""))];
    return afscList.filter((m) => m.length > 0).map((afsc) => {
        return new GenericGroupCollection(afsc, MemberModel.membersMatchingGafsc(afsc, members))
    })
}

function generateWorkCenterCollection(members: MemberModel[]){
    let workCenterList = [...new Set(members.map(item => item.officeSymbol ? item.officeSymbol : ""))];
    return workCenterList.filter((m) => m.length > 0).map((afsc) => {
        return new GenericGroupCollection(afsc, MemberModel.membersMatchingGafsc(afsc, members))
    })
}





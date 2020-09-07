
import MemberModel from "../../members/models/MemberModel";
import GainingMemberModel from "../../members/models/GainingMemberModel";
import AssignedPositionModel from "./AssignedPositionModel";

export default class PositionModel {

    constructor(
        public id: number,
    public pasCode: string,
    public orgStructureId: string | null,
    public afscAuth: string | null,
    public grdAuth: string | null,
    public currQtr: string | null,
    public projQtr1: string | null,
    public projQtr2: string | null,
    public projQtr3: string | null,
    public projQtr4: string | null,
    public posNr: string | null,
    public gradeAssigned: string | null,
    public dafscAssigned: string | null,
    public nameAssigned: string | null,
    public mbrIdAssigned: string | null,
    public lastUpdated: Date | null,
    ) {
    }

    public static sortPosDescending = (pos: AssignedPositionModel[]) => {
        return pos.sort(function (a, b) {
           try {
               if(a.assigned.deros != null && b.assigned.deros != null) {
                   return (new Date(a.assigned.deros) > new Date(b.assigned.deros)) ? 1 : -1
               } else {
                   return -1
               }
           } catch (e) {
               return -1
           }
        });
    }



}
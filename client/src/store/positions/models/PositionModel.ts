
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

    public static sortPosNrAscending = (pos: AssignedPositionModel[]) => {
        return pos.sort(function (a, b) {
            return (parseInt(a.position.posNr.slice(0, -1))! - parseInt(b.position.posNr.slice(0, -1))!) || (parseInt(b.position.currQtr!) - parseInt(a.position.currQtr!)) ;
        });
    }



}

import MemberModel from "../../members/models/MemberModel";

export default class PositionModel {

    constructor(
        public id: number,
    public pasCode: string,
    public orgStructureId: string | null,
    public afscAuth: string | null,
    public grdAuth: string | null,
    public currQtr: boolean | null,
    public projQtr1: boolean | null,
    public projQtr2: boolean | null,
    public projQtr3: boolean | null,
    public projQtr4: boolean | null,
    public posNr: string | null,
    public gradeAssigned: string | null,
    public dafscAssigned: string | null,
    public nameAssigned: string | null,
    public mbrIdAssigned: string | null,
    public lastUpdated: Date | null,
    ) {
    }



}
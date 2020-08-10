
import MemberModel from "../../members/models/MemberModel";

export default class PositionModel {
    public id: number;
    public pasCode: string;
    public orgStructureId: string | undefined;
    public afscAuth: string;
    public grdAuth: string;
    public currQtr: boolean;
    public projQtr1: boolean;
    public projQtr2: boolean;
    public projQtr3: boolean;
    public projQtr4: boolean;
    public posNr: string;
    public assignedMbrId: string | undefined;
    public doubleBillet: MemberModel[];
    public unfunded: MemberModel[];
    public lastUpdated: Date | undefined;


    constructor(id: number, pasCode: string, orgStructureId: string | undefined, afscAuth: string, grdAuth: string, currQtr: boolean, projQtr1: boolean, projQtr2: boolean, projQtr3: boolean, projQtr4: boolean, posNr: string, assignedMbrId: string | undefined, doubleBillet: MemberModel[], unfunded: MemberModel[], lastUpdated: Date | undefined) {
        this.id = id;
        this.pasCode = pasCode;
        this.orgStructureId = orgStructureId;
        this.afscAuth = afscAuth;
        this.grdAuth = grdAuth;
        this.currQtr = currQtr;
        this.projQtr1 = projQtr1;
        this.projQtr2 = projQtr2;
        this.projQtr3 = projQtr3;
        this.projQtr4 = projQtr4;
        this.posNr = posNr;
        this.assignedMbrId = assignedMbrId;
        this.doubleBillet = doubleBillet;
        this.unfunded = unfunded;
        this.lastUpdated = lastUpdated;
    }
}
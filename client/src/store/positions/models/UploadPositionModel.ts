export default class UploadPositionModel {
    public pasCode: string;
    public orgStructureId: string | null;
    public afscAuth: string;
    public grdAuth: string;
    public currQtr: boolean;
    public projQtr1: boolean;
    public projQtr2: boolean;
    public projQtr3: boolean;
    public projQtr4: boolean;
    public posNr: string;
    public assignedMbrId: string | null;
    public lastUpdated: Date | null;


    constructor(pasCode: string, orgStructureId: string | null, afscAuth: string, grdAuth: string, currQtr: boolean, projQtr1: boolean, projQtr2: boolean, projQtr3: boolean, projQtr4: boolean, posNr: string, assignedMbrId: string | null, lastUpdated: Date | null) {
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
        this.lastUpdated = lastUpdated;
    }
}
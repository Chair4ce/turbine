export default class UploadPositionModel {
    public pos_id: string;
    public pasCode: string;
    public orgStructureId: string | null;
    public afscAuth: string | null;
    public grdAuth: string | null;
    public currQtr: string | null;
    public projQtr1: string | null;
    public projQtr2: string | null;
    public projQtr3: string | null;
    public projQtr4: string | null;
    public posNr: string | null;
    public gradeAssigned: string | null;
    public dafscAssigned: string | null;
    public nameAssigned: string | null;
    public mbrIdAssigned: string | null;
    public lastUpdated: Date | null;


    constructor(pasCode: string, orgStructureId: string | null, afscAuth: string | null, grdAuth: string | null, currQtr: string | null, projQtr1: string | null, projQtr2: string | null, projQtr3: string | null, projQtr4: string | null, posNr: string | null, gradeAssigned: string | null, dafscAssigned: string | null, nameAssigned: string | null, mbrIdAssigned: string | null, lastUpdated: Date | null) {
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
        this.gradeAssigned = gradeAssigned;
        this.dafscAssigned = dafscAssigned;
        this.nameAssigned = nameAssigned;
        this.mbrIdAssigned = mbrIdAssigned;
        this.lastUpdated = lastUpdated;
    }
}
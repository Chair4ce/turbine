export default class UploadBilletModel {
    public pasCode: string;
    public orgnStructId: string;
    public posNr: string;
    public afscAuth: string;
    public grdAuth: string;
    public currQtr: string;
    public projQtr1: string;
    public projQtr2: string;
    public projQtr3: string;
    public projQtr4: string;
    public mbrAssigned: string;


    constructor(pasCode: string, orgnStructId: string, posNr: string, afscAuth: string, grdAuth: string, currQtr: string, projQtr1: string, projQtr2: string, projQtr3: string, projQtr4: string, mbrAssigned: string) {
        this.pasCode = pasCode;
        this.orgnStructId = orgnStructId;
        this.posNr = posNr;
        this.afscAuth = afscAuth;
        this.grdAuth = grdAuth;
        this.currQtr = currQtr;
        this.projQtr1 = projQtr1;
        this.projQtr2 = projQtr2;
        this.projQtr3 = projQtr3;
        this.projQtr4 = projQtr4;
        this.mbrAssigned = mbrAssigned;
    }
}
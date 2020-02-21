

export default class UploadMemberModel {
    public sqid: string;
    public fullName: string;
    public tafmsd: string | null;
    public grade: string;
    public assignedPas: string;
    public dafsc: string;
    public officeSymbol: string | null;
    public dutyTitle: string | null;
    public dutyStartDate: string | null;
    public dutyPhone: string | null;
    public supvName: string | null;
    public supvBeginDate: string | null;
    public dateArrivedStation: string | null;
    public dor: string | null;


    constructor(sqid: string, fullName: string, tafmsd: string | null, grade: string, assignedPas: string, dafsc: string, officeSymbol: string | null, dutyTitle: string | null, dutyStartDate: string | null, dutyPhone: string | null, supvName: string | null, supvBeginDate: string | null, dateArrivedStation: string | null, dor: string | null) {
        this.sqid = sqid;
        this.fullName = fullName;
        this.tafmsd = tafmsd;
        this.grade = grade;
        this.assignedPas = assignedPas;
        this.dafsc = dafsc;
        this.officeSymbol = officeSymbol;
        this.dutyTitle = dutyTitle;
        this.dutyStartDate = dutyStartDate;
        this.dutyPhone = dutyPhone;
        this.supvName = supvName;
        this.supvBeginDate = supvBeginDate;
        this.dateArrivedStation = dateArrivedStation;
        this.dor = dor;
    }
}
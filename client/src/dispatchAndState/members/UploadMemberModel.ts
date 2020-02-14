

export default class UploadMemberModel {
    public tafmsd: string | null;
    public fullName: string;
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


    constructor(tafmsd: string | null, fullName: string, grade: string, assignedPas: string, dafsc: string, officeSymbol: string | null, dutyTitle: string | null, dutyStartDate: string | null, dutyPhone: string | null, supvName: string | null, supvBeginDate: string | null, dateArrivedStation: string | null, dor: string | null) {
        this.tafmsd = tafmsd;
        this.fullName = fullName;
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



export default class MemberModel {
    public id: number;
    public mbrId: string;
    public fullName: string;
    public grade: string;
    public assignedPas: string;
    public dafsc: string;
    public officeSymbol: string | undefined;
    public dutyTitle: string | undefined;
    public dutyStartDate: Date | undefined;
    public dutyPhone: string | undefined;
    public supvName: string | undefined;
    public supvBeginDate: Date | undefined;
    public dateArrivedStation: Date | undefined;
    public rnltd: Date | undefined;
    public dor: Date | undefined;
    public lastUpdated: Date | undefined;


    constructor(id: number, mbrId: string, fullName: string, grade: string, assignedPas: string, dafsc: string, officeSymbol: string | undefined, dutyTitle: string | undefined, dutyStartDate: Date | undefined, dutyPhone: string | undefined, supvName: string | undefined, supvBeginDate: Date | undefined, dateArrivedStation: Date | undefined, rnltd: Date | undefined, dor: Date | undefined, lastUpdated: Date | undefined) {
        this.id = id;
        this.mbrId = mbrId;
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
        this.rnltd = rnltd;
        this.dor = dor;
        this.lastUpdated = lastUpdated;
    }
}




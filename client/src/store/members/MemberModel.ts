


export default class MemberModel {
    public id: number;
    public sqid: string;
    public fullName: string;
    public tafmsd: Date | null;
    public grade: string;
    public assignedPas: string;
    public dafsc: string;
    public officeSymbol: string | null;
    public dutyTitle: string | null;
    public dutyStartDate: Date | null;
    public dutyPhone: string | null;
    public supvName: string | null;
    public supvBeginDate: Date | null;
    public dateArrivedStation: Date | null;
    public dor: Date | null;


    constructor(id: number, sqid: string, fullName: string, tafmsd: Date | null, grade: string, assignedPas: string, dafsc: string, officeSymbol: string | null, dutyTitle: string | null, dutyStartDate: Date | null, dutyPhone: string | null, supvName: string | null, supvBeginDate: Date | null, dateArrivedStation: Date | null, dor: Date | null) {
        this.id = id;
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




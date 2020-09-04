export default class StagingUploadMemberModel {
    public id: number;
    public ssan: string;
    public fullName: string;
    public grade: string | null;
    public assignedPas: string| null;
    public cafsc: string | null;
    public dafsc: string | null;
    public pafsc: string | null;
    public officeSymbol: string | null;
    public dutyTitle: string | null;
    public dutyStartDate: string | null;
    public dutyPhone: string | null;
    public supvName: string | null;
    public supvBeginDate: string | null;
    public dateArrivedStation: string | null;
    public rnltd: string | null;
    public dor: string | null;
    public deros: string | null;

    constructor(id: number, ssan: string, fullName: string, grade: string, assignedPas: string, cafsc: string, dafsc: string, pafsc: string, officeSymbol: string | null, dutyTitle: string | null, dutyStartDate: string | null, dutyPhone: string | null, supvName: string | null, supvBeginDate: string | null, dateArrivedStation: string | null, rnltd: string | null, dor: string | null, deros: string | null) {
        this.id = id;
        this.ssan = ssan;
        this.fullName = fullName;
        this.grade = grade;
        this.assignedPas = assignedPas;
        this.cafsc = cafsc;
        this.dafsc = dafsc;
        this.pafsc = pafsc;
        this.officeSymbol = officeSymbol;
        this.dutyTitle = dutyTitle;
        this.dutyStartDate = dutyStartDate;
        this.dutyPhone = dutyPhone;
        this.supvName = supvName;
        this.supvBeginDate = supvBeginDate;
        this.dateArrivedStation = dateArrivedStation;
        this.rnltd = rnltd;
        this.dor = dor;
        this.deros = deros;
    }
}
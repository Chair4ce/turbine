


export default class MemberModel {
    public id: number;
    public sqid: number;
    public tafmsd: Date | null;
    public fullName: string;
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


    constructor(id: number, sqid: number, tafmsd: Date | null, full_name: string, grade: string, assigned_pas: string, dafsc: string, office_symbol: string | null, duty_title: string | null, duty_start_date: Date | null, duty_phone: string | null, supv_name: string | null, supv_begin_date: Date | null, date_arrived_station: Date | null, dor: Date | null) {
        this.id = id;
        this.sqid = sqid;
        this.tafmsd = tafmsd;
        this.fullName = full_name;
        this.grade = grade;
        this.assignedPas = assigned_pas;
        this.dafsc = dafsc;
        this.officeSymbol = office_symbol;
        this.dutyTitle = duty_title;
        this.dutyStartDate = duty_start_date;
        this.dutyPhone = duty_phone;
        this.supvName = supv_name;
        this.supvBeginDate = supv_begin_date;
        this.dateArrivedStation = date_arrived_station;
        this.dor = dor;
    }
}




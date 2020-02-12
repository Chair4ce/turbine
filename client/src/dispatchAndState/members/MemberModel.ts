


export default class MemberModel {
    public id: number;
    public sqid: number;
    public tafmsd: Date | null;
    public full_name: string;
    public grade: string;
    public assigned_pas: string;
    public dafsc: string;
    public office_symbol: string | null;
    public duty_title: string | null;
    public duty_start_date: Date | null;
    public duty_phone: string | null;
    public supv_name: string | null;
    public supv_begin_date: Date | null;
    public date_arrived_station: Date | null;
    public dor: Date | null;


    constructor(id: number, sqid: number, tafmsd: Date | null, full_name: string, grade: string, assigned_pas: string, dafsc: string, office_symbol: string | null, duty_title: string | null, duty_start_date: Date | null, duty_phone: string | null, supv_name: string | null, supv_begin_date: Date | null, date_arrived_station: Date | null, dor: Date | null) {
        this.id = id;
        this.sqid = sqid;
        this.tafmsd = tafmsd;
        this.full_name = full_name;
        this.grade = grade;
        this.assigned_pas = assigned_pas;
        this.dafsc = dafsc;
        this.office_symbol = office_symbol;
        this.duty_title = duty_title;
        this.duty_start_date = duty_start_date;
        this.duty_phone = duty_phone;
        this.supv_name = supv_name;
        this.supv_begin_date = supv_begin_date;
        this.date_arrived_station = date_arrived_station;
        this.dor = dor;
    }
}




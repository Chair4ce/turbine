

export default class UploadMemberModel {
    public tafmsd: string | null;
    public full_name: string;
    public grade: string;
    public assigned_pas: string;
    public dafsc: string;
    public office_symbol: string | null;
    public duty_title: string | null;
    public duty_start_date: string | null;
    public duty_phone: string | null;
    public supv_name: string | null;
    public supv_begin_date: string | null;
    public date_arrived_station: string | null;
    public dor: string | null;


    constructor(tafmsd: string | null, full_name: string, grade: string, assigned_pas: string, dafsc: string, office_symbol: string | null, duty_title: string | null, duty_start_date: string | null, duty_phone: string | null, supv_name: string | null, supv_begin_date: string | null, date_arrived_station: string | null, dor: string | null) {
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



export default class MemberModel {
        public id: number;
    public ssan: string;
    public full_name: string;
    public grade: string;
    public assigned_pas: string;
    public dafsc: string;
    public office_symbol: string;
    public duty_title: string;
    public duty_start_date: string;
    public duty_phone: string;
    public supv_name: string;
    public supv_begin_date: string;
    public date_arrived_station: string;
    public dor: string;


    constructor(id: number, ssan: string, full_name: string, grade: string, assigned_pas: string, dafsc: string, office_symbol: string, duty_title: string, duty_start_date: string, duty_phone: string, supv_name: string, supv_begin_date: string, date_arrived_station: string, dor: string) {
        this.id = id;
        this.ssan = ssan;
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




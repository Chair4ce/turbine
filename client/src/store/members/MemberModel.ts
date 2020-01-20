


export default class MemberModel {
        public id: string;
        public full_name: string;
        public grade: string;
        public assigned_pas: string;
        public dafsc: string;
        public office_symbol: string;
        public duty_title: string;
        public duty_start_date: string;
        public duty_phone: string;
        public awardec_status: string;
        public epr_opr_status: string


    constructor(id: string, full_name: string, grade: string, assigned_pas: string, dafsc: string, office_symbol: string, duty_title: string, duty_start_date: string, duty_phone: string, awardec_status: string, epr_opr_status: string) {
        this.id = id;
        this.full_name = full_name;
        this.grade = grade;
        this.assigned_pas = assigned_pas;
        this.dafsc = dafsc;
        this.office_symbol = office_symbol;
        this.duty_title = duty_title;
        this.duty_start_date = duty_start_date;
        this.duty_phone = duty_phone;
        this.awardec_status = awardec_status;
        this.epr_opr_status = epr_opr_status;
    }
}




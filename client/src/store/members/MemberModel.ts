

export default class MemberModel {
    constructor(
        public id: string,
        public full_name: string,
        public grade: string,
        public assigned_pas: string,
        public dafsc: string,
        public office_symbol: string,
        public duty_title: string,
        public duty_start_date: string,
        public duty_phone: string,
        public awardec_status: string,
        public epr_opr_status: string
    ) {
    }
}


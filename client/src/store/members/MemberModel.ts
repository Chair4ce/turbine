


export default class MemberModel {
        public id: number;
        public ssan: string;
        public fullName: string;
        public grade: string;
        public assignedPas: string;
        public officeSymbol: string;
        public dutyTitle: string;
        public dutyStartDate: Date;
        public dafsc: string;
        public dutyPhone: string;
        public supv_name: string;
        public supv_begin_date: Date;
        public dor: Date;
        public date_arrived_station: Date;


    constructor(id: number, ssan: string, fullName: string, grade: string, assignedPas: string, officeSymbol: string, dutyTitle: string, dutyStartDate: Date, dafsc: string, dutyPhone: string, supv_name: string, supv_begin_date: Date, dor: Date, date_arrived_station: Date) {
        this.id = id;
        this.ssan = ssan;
        this.fullName = fullName;
        this.grade = grade;
        this.assignedPas = assignedPas;
        this.officeSymbol = officeSymbol;
        this.dutyTitle = dutyTitle;
        this.dutyStartDate = dutyStartDate;
        this.dafsc = dafsc;
        this.dutyPhone = dutyPhone;
        this.supv_name = supv_name;
        this.supv_begin_date = supv_begin_date;
        this.dor = dor;
        this.date_arrived_station = date_arrived_station;
    }
}




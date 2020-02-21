


export default class GainingModel {
    public id: number;
    public sqid: string;
    public fullName: string;
    public firstName: string;
    public lastName: string;
    public rnltd: Date | null;
    public grade: string;
    public gainingPas: string;
    public projectedArrivalDate: Date | null;
    public dafsc: string;
    public cellPhone: string | null;
    public email: string | null;
    public dor: Date | null;
    public dateArrivedStation: Date | null;
    public projectedBilletId: string | null;
    public dateDepLastDutyStn: Date | null;
    public sponsorId: string | null;
    public losingPas: string | null;
    public projectedOfficeSymbol: string | null;
    public lastUpdated: Date | null;


    constructor(id: number, sqid: string, fullName: string, firstName: string, lastName: string, rnltd: Date | null, grade: string, gainingPas: string, projectedArrivalDate: Date | null, dafsc: string, cellPhone: string | null, email: string | null, dor: Date | null, dateArrivedStation: Date | null, projectedBilletId: string | null, dateDepLastDutyStn: Date | null, sponsorId: string | null, losingPas: string | null, projectedOfficeSymbol: string | null, lastUpdated: Date | null) {
        this.id = id;
        this.sqid = sqid;
        this.fullName = fullName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.rnltd = rnltd;
        this.grade = grade;
        this.gainingPas = gainingPas;
        this.projectedArrivalDate = projectedArrivalDate;
        this.dafsc = dafsc;
        this.cellPhone = cellPhone;
        this.email = email;
        this.dor = dor;
        this.dateArrivedStation = dateArrivedStation;
        this.projectedBilletId = projectedBilletId;
        this.dateDepLastDutyStn = dateDepLastDutyStn;
        this.sponsorId = sponsorId;
        this.losingPas = losingPas;
        this.projectedOfficeSymbol = projectedOfficeSymbol;
        this.lastUpdated = lastUpdated;
    }
}




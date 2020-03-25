


export default class GainingModel {
    public id: number;
    public sqid: string;
    public fullName: string;
    public firstName: string;
    public lastName: string;
    public rnltd: Date | undefined;
    public grade: string;
    public gainingPas: string;
    public projectedArrivalDate: Date | undefined;
    public dafsc: string;
    public cellPhone: string | undefined;
    public email: string | undefined;
    public dor: Date | undefined;
    public dateArrivedStation: Date | undefined;
    public projectedBilletId: string | undefined;
    public dateDepLastDutyStn: Date | undefined;
    public sponsorId: string | undefined;
    public losingPas: string | undefined;
    public projectedOfficeSymbol: string | undefined;
    public lastUpdated: Date | undefined;


    constructor(id: number, sqid: string, fullName: string, firstName: string, lastName: string, rnltd: Date | undefined, grade: string, gainingPas: string, projectedArrivalDate: Date | undefined, dafsc: string, cellPhone: string | undefined, email: string | undefined, dor: Date | undefined, dateArrivedStation: Date | undefined, projectedBilletId: string | undefined, dateDepLastDutyStn: Date | undefined, sponsorId: string | undefined, losingPas: string | undefined, projectedOfficeSymbol: string | undefined, lastUpdated: Date | undefined) {
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




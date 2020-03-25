


export default class GainingSavingModel {
    public id: number;
    public sqid: string;
    public fullName: string;
    public firstName: string;
    public lastName: string;
    public rnltd: string | undefined;
    public grade: string;
    public gainingPas: string;
    public projectedArrivalDate: string | undefined;
    public dafsc: string;
    public cellPhone: string | null;
    public email: string | null;
    public dor: string | undefined;
    public dateArrivedStation: string | undefined;
    public projectedBilletId: string | null;
    public dateDepLastDutyStn: string | undefined;
    public sponsorId: string | null;
    public losingPas: string | null;
    public projectedOfficeSymbol: string | null;
    public lastUpdated: string | undefined;


    constructor(id: number, sqid: string, fullName: string, firstName: string, lastName: string, rnltd: string | undefined, grade: string, gainingPas: string, projectedArrivalDate: string | undefined, dafsc: string, cellPhone: string | null, email: string | null, dor: string | undefined, dateArrivedStation: string | undefined, projectedBilletId: string | null, dateDepLastDutyStn: string | undefined, sponsorId: string | null, losingPas: string | null, projectedOfficeSymbol: string | null, lastUpdated: string | undefined) {
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




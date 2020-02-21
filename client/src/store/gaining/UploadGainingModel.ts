

export default class UploadGainingModel {
    public sqid: string;
    public fullName: string;
    public rnltd: Date | null;
    public grade: string;
    public gainingPas: string;
    public dafsc: string;
    public dor: Date | null;
    public dateDepLastDutyStn: Date | null;
    public sponsorId: string | null;
    public losingPas: string | null;


    constructor(sqid: string, fullName: string, rnltd: Date | null, grade: string, gainingPas: string, dafsc: string, dor: Date | null, dateDepLastDutyStn: Date | null, sponsorId: string | null, losingPas: string | null) {
        this.sqid = sqid;
        this.fullName = fullName;
        this.rnltd = rnltd;
        this.grade = grade;
        this.gainingPas = gainingPas;
        this.dafsc = dafsc;
        this.dor = dor;
        this.dateDepLastDutyStn = dateDepLastDutyStn;
        this.sponsorId = sponsorId;
        this.losingPas = losingPas;
    }
}
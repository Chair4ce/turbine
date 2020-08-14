

export default class UploadGainingMemberModel {
    public gainingPas: string;
    public mbrId: string;
    public fullName: string;
    public grade: string | null;
    public losingPas: string | null;
    public losingPasCleartext: string | null;
    public dafsc: string | null;
    public sponsorId: string | null;
    public dor: string | null;
    public dos: string | null;
    public rnltd: string | null;


    constructor(gainingPas: string,mbrId: string, fullName: string, grade: string | null, losingPas: string | null, losingPasCleartext: string | null, dafsc: string | null, sponsorId: string | null, dor: string | null, dos: string | null, rnltd: string | null) {
        this.gainingPas = gainingPas;
        this.mbrId = mbrId;
        this.fullName = fullName;
        this.grade = grade;
        this.losingPas = losingPas;
        this.losingPasCleartext = losingPasCleartext;
        this.dafsc = dafsc;
        this.sponsorId = sponsorId;
        this.dor = dor;
        this.dos = dos;
        this.rnltd = rnltd;
    }
}
export default class GainingMemberModel {
    public id: Number;
    public mbrId: string;
    public fullName: string;
    public grade: string;
    public losingPas: string| null;
    public losingPasCleartext: string | null;
    public dafsc: string | null;
    public sponsorId: string | null;
    public dor: Date | null;
    public dos: Date | null;
    public rnltd: Date | null;


    constructor(id: Number, mbrId: string, fullName: string, grade: string, losingPas: string | null, losingPasCleartext: string | null, dafsc: string | null, sponsorId: string | null, dor: Date | null, dos: Date | null, rnltd: Date | null) {
        this.id = id;
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
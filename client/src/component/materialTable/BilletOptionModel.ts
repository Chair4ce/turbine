export default class BilletOptionModel {
    public pasCode: string;
    public posNr: string;
    public afscAuth: string;


    constructor(pasCode: string, posNr: string, afscAuth: string) {
        this.pasCode = pasCode;
        this.posNr = posNr;
        this.afscAuth = afscAuth;
    }
}
export default class BilletImportChangeModel {
    public id: number;
    public squadronId: string;
    public posNr: string;
    public importDateTime: Date;
    public field: string;
    public oldData: string;
    public newData: string;


    constructor(id: number, posNr: string, squadronId: string, importDateTime: Date, field: string, oldData: string, newData: string) {
        this.id = id;
        this.posNr = posNr;
        this.squadronId = squadronId;
        this.importDateTime = importDateTime;
        this.field = field;
        this.oldData = oldData;
        this.newData = newData;
    }
}

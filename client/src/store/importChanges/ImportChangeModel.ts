export default class ImportChangeModel {
    public id: number;
    public sqid: string;
    public fullName: string;
    public importDateTime: Date;
    public field: string;
    public oldData: string;
    public newData: string;


    constructor(id: number, sqid: string, fullName: string, importDateTime: Date, field: string, oldData: string, newData: string) {
        this.id = id;
        this.sqid = sqid;
        this.fullName = fullName;
        this.importDateTime = importDateTime;
        this.field = field;
        this.oldData = oldData;
        this.newData = newData;
    }
}

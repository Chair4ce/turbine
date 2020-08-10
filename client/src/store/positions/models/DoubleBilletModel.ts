export default class PositionModel {
    public id: string;
    public pasCode: string;
    public mbrId: string;
    public posId: string;
    public lastUpdated: Date | undefined;


    constructor(id: string, pasCode: string, mbrId: string, posId: string, lastUpdated: Date | undefined) {
        this.id = id;
        this.pasCode = pasCode;
        this.mbrId = mbrId;
        this.posId = posId;
        this.lastUpdated = lastUpdated;
    }
}
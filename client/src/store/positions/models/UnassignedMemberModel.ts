export default class UnassignedMemberModel {
    public id: string;
    public pasCode: string;
    public mbrId: string | undefined;
    public lastUpdated: Date | undefined;


    constructor(id: string, pasCode: string, mbrId: string | undefined, lastUpdated: Date | undefined) {
        this.id = id;
        this.pasCode = pasCode;
        this.mbrId = mbrId;
        this.lastUpdated = lastUpdated;
    }
}
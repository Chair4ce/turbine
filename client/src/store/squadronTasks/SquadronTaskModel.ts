export default class SquadronTask {
    public id: number;
    public mbrId: string;
    public taskType: string;
    public status: string;
    public dueDate: Date;


    constructor(id: number, mbrId: string, taskType: string, status: string, dueDate: Date) {
        this.id = id;
        this.mbrId = mbrId;
        this.taskType = taskType;
        this.status = status;
        this.dueDate = dueDate;
    }
}

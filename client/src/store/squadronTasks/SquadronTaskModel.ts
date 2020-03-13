export default class SquadronTask {
    public id: number;
    public mbrId: string;
    public taskType: string;
    public status: string;
    public dueDate: Date;


    constructor(id: number, mbrSqId: string, taskType: string, status: string, dueDate: Date) {
        this.id = id;
        this.mbrId = mbrSqId;
        this.taskType = taskType;
        this.status = status;
        this.dueDate = dueDate;
    }
}

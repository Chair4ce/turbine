export default class SquadronTask {
    public id: number;
    public mbrId: string;
    public taskType: string;
    public status: string;
    public dueDate: Date | undefined;


    constructor(id: number, mbrId: string, taskType: string, status: string, dueDate: Date | undefined) {
        this.id = id;
        this.mbrId = mbrId;
        this.taskType = taskType;
        this.status = status;
        this.dueDate = dueDate;
    }
}

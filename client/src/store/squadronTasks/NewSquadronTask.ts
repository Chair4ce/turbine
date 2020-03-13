export default class NewSquadronTask {
    public mbrId: string;
    public taskType: string;
    public status: string;
    public dueDate: Date;


    constructor(mbrId: string, taskType: string, status: string, dueDate: Date) {
        this.mbrId = mbrId;
        this.taskType = taskType;
        this.status = status;
        this.dueDate = dueDate;
    }
}

export default class NewSquadronTask {
    public mbrId: string;
    public taskType: string;
    public status: string;
    public dueDate: Date | undefined;


    constructor(mbrId: string, taskType: string, status: string, dueDate: Date | undefined) {
        this.mbrId = mbrId;
        this.taskType = taskType;
        this.status = status;
        this.dueDate = dueDate;
    }
}

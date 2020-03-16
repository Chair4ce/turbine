export default class SquadronTaskDetail {
    public id: number;
    public mbrId: string;
    public mbrName: string;
    public taskType: string;
    public status: string;
    public dueDate: Date;
    public rnltd: Date;
    public supervisor: string;


    constructor(id: number, mbrId: string, mbrName: string, taskType: string, status: string, dueDate: Date, rnltd: Date, supervisor: string) {
        this.id = id;
        this.mbrId = mbrId;
        this.mbrName = mbrName;
        this.taskType = taskType;
        this.status = status;
        this.dueDate = dueDate;
        this.rnltd = rnltd;
        this.supervisor = supervisor;
    }
}
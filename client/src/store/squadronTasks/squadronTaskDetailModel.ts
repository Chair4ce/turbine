export default class SquadronTaskDetail {
    public id: number;
    public mbrSqId: string;
    public mbrName: string;
    public taskType: string;
    public status: string;
    public dueDate: Date;
    public rnltd: Date;
    public Supervisor: string;
    public SupId: string;


    constructor(id: number, mbrSqId: string, mbrName: string, taskType: string, status: string, dueDate: Date, rnltd: Date, Supervisor: string, SupId: string) {
        this.id = id;
        this.mbrSqId = mbrSqId;
        this.mbrName = mbrName;
        this.taskType = taskType;
        this.status = status;
        this.dueDate = dueDate;
        this.rnltd = rnltd;
        this.Supervisor = Supervisor;
        this.SupId = SupId;
    }
}
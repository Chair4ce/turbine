package squadron.manager.turbine.tasks;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@NoArgsConstructor
@Data
public class TaskDetailModel {

    private long id;
    private String mbrId;
    private String mbrName;
    private String taskType;
    private String status;
    private Date dueDate;
    private Date rnltd;
    private String supervisor;

    public TaskDetailModel( String mbrId, String mbrName, String taskType, String status, Date dueDate, Date rnltd, String supervisor) {
        this.mbrId = mbrId;
        this.mbrName = mbrName;
        this.taskType = taskType;
        this.status = status;
        this.dueDate = dueDate;
        this.rnltd = rnltd;
        this.supervisor = supervisor;
    }

    public TaskDetailModel(long id, String mbrId, String mbrName, String taskType, String status, Date dueDate, Date rnltd, String supervisor) {
        this.id = id;
        this.mbrId = mbrId;
        this.mbrName = mbrName;
        this.taskType = taskType;
        this.status = status;
        this.dueDate = dueDate;
        this.rnltd = rnltd;
        this.supervisor = supervisor;
    }

    public TaskDetailModel update(TaskDetailJSON json) {
        this.setMbrId(json.getMbrId());
        this.setMbrName(json.getMbrName());
        this.setTaskType(json.getTaskType());
        this.setStatus(json.getStatus());
        this.setDueDate(json.getDueDate());
        this.setRnltd(json.getRnltd());
        this.setSupervisor(json.getSupervisor());
        return this;
    }
}

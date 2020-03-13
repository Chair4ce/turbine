package squadron.manager.turbine.tasks;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@NoArgsConstructor
@Entity
@Data
@Table(name = "squadron_member_task")
public class SquadronTask {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String mbrId;
    private String taskType;
    private String status;
    private Date dueDate;

    public SquadronTask(String mbrId, String taskType, String status, Date dueDate) {
        this.mbrId = mbrId;
        this.taskType = taskType;
        this.status = status;
        this.dueDate = dueDate;
    }

    public SquadronTask(long id,String mbrId, String taskType, String status, Date dueDate) {
        this.id = id;
        this.mbrId = mbrId;
        this.taskType = taskType;
        this.status = status;
        this.dueDate = dueDate;
    }

    public SquadronTask update(SquadronTaskJSON json) {
        this.setMbrId(json.getMbrId());
        this.setTaskType(json.getTaskType());
        this.setStatus(json.getStatus());
        this.setDueDate(json.getDueDate());
        return this;
    }


}

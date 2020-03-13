package squadron.manager.turbine.tasks;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@NoArgsConstructor
@Data
public class TaskDetailJSON {

    private long id;
    private String mbrId;
    private String mbrName;
    private String taskType;
    private String status;
    private Date dueDate;
    private Date rnltd;
    private String Supervisor;
    private String SupId;
}

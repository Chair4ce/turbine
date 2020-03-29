package squadron.manager.turbine.tasks;


import lombok.*;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
@Setter
public class SquadronTaskJSON {
    private Long id;
    private String mbrId;
    private String taskType;
    private String status;
    private Date dueDate;
}

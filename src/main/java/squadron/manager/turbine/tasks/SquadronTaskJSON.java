package squadron.manager.turbine.tasks;


import lombok.*;

@NoArgsConstructor
@Data
public class SquadronTaskJSON {
    private Long id;
    private String mbrId;
    private String taskType;
    private String status;
    private String dueDate;

}

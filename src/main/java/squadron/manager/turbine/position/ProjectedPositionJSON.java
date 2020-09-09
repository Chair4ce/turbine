package squadron.manager.turbine.position;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProjectedPositionJSON {
    private int month;
    private int year;
    private AssignedPosition positions[];
}

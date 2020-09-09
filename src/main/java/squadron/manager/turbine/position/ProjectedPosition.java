package squadron.manager.turbine.position;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectedPosition {
    private int month;
    private int year;
    private AssignedPosition positions[];

}

package squadron.manager.turbine.positionAssignment;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PositionAssignmentJSON {
    private String afscGroup;
    private String type;
    private String posId;
    private Long mbrId;
}

package squadron.manager.turbine.positionAssignment;

import lombok.*;

@AllArgsConstructor
@Getter
@Setter
public class PositionAssignmentJSON {
    private String pasCode;
    private String afscGroup;
    private String type;
    private String posId;
    private Long mbrId;
}

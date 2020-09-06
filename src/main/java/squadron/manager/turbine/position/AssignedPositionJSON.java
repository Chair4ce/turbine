package squadron.manager.turbine.position;

import lombok.*;
import squadron.manager.turbine.member.Member;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
@Setter
public class AssignedPositionJSON {
    private Position position;
    private Member assigned;
}

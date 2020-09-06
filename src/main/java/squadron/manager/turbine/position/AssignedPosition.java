package squadron.manager.turbine.position;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import squadron.manager.turbine.member.Member;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AssignedPosition {
    private Position position;
    private Member assigned;
}

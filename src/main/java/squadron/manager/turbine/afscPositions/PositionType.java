package squadron.manager.turbine.afscPositions;


import lombok.*;
import squadron.manager.turbine.member.Member;
import squadron.manager.turbine.position.Position;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
public class PositionType {
    private String type;
    private Position position;
}

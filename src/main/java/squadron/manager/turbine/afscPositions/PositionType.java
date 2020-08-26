package squadron.manager.turbine.afscPositions;


import lombok.*;
import squadron.manager.turbine.member.Member;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PositionType {
    private String type;
    private String posNr;
    private String gradeAuth;
    private Member assigned;
}

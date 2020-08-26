package squadron.manager.turbine.afscPositions;

import lombok.*;
import squadron.manager.turbine.member.Member;
import squadron.manager.turbine.position.Position;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SkillLevelGroup {

    private String AfscSkillLevel;
    private int assigned;
    private int authorized;
    private int month;
    private int year;
    private String manning;
    private List<PositionType> assignedPositions;

}

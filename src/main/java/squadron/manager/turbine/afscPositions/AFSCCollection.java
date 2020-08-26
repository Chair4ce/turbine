package squadron.manager.turbine.afscPositions;

import lombok.*;
import squadron.manager.turbine.gainingMember.GainingMember;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AFSCCollection {

        private String afscGroup;
        private int assigned;
        private int authorized;
        private int month;
        private int year;
        private String manning;
        private List<SkillLevelGroup> skillLevelGroups;
}

package squadron.manager.turbine.position;

import lombok.*;
import squadron.manager.turbine.member.Member;

import java.util.Date;
import java.util.List;


@Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
public class PositionCollectionJSON {
        private Long id;
        private String pasCode;
        private String orgStructureId;
        private String afscAuth;
        private String grdAuth;
        private String currQtr;
        private String projQtr1;
        private String projQtr2;
        private String projQtr3;
        private String projQtr4;
        private String posNr;
        private String assignedMbrId;
        private List<Member> doubleBillet;
        private List<Member> unfunded;
        private Date lastUpdated;

}

package squadron.manager.turbine.position;


import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PositionJSON {

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
    private String mbrName;
    private Date lastUpdated;
}

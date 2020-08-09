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
    private Boolean currQtr;
    private Boolean projQtr1;
    private Boolean projQtr2;
    private Boolean projQtr3;
    private Boolean projQtr4;
    private String posNr;
    private String assignedMbrId;
    private String posType;
    private Date lastUpdated;
}

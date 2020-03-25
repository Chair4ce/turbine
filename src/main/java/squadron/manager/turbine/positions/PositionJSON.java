package squadron.manager.turbine.positions;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PositionJSON {

    private static final String emptyFieldMessage = "This is required";

    private long id;
    private int squadronId;
    private String posId;
    private String afscAuth;
    private String grdAuth;
    private String currQtr;
    private String projQtr1;
    private String projQtr2;
    private String projQtr3;
    private String projQtr4;
    private String mbrAssigned;
    private Date lastUpdate;

    public PositionJSON(int squadronId, String posId, String afscAuth, String grdAuth, String currQtr, String projQtr1, String projQtr2, String projQtr3, String projQtr4, String mbrAssigned, Date lastUpdate) {
        this.squadronId = squadronId;
        this.posId = posId;
        this.afscAuth = afscAuth;
        this.grdAuth = grdAuth;
        this.currQtr = currQtr;
        this.projQtr1 = projQtr1;
        this.projQtr2 = projQtr2;
        this.projQtr3 = projQtr3;
        this.projQtr4 = projQtr4;
        this.mbrAssigned = mbrAssigned;
        this.lastUpdate = lastUpdate;
    }
}

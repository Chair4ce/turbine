package squadron.manager.turbine.positions;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AuthorizedBilletJSON {

    private static final String emptyFieldMessage = "This is required";

    private long id;
    private int squadronId;
    private String posNr;
    private String afscAuth;
    private String grdAuth;
    private String currQtr;
    private String projQtr1;
    private String projQtr2;
    private String projQtr3;
    private String projQtr4;
    private Date lastUpdate;

    public AuthorizedBilletJSON(int squadronId, String posNr, String afscAuth, String grdAuth, String currQtr, String projQtr1, String projQtr2, String projQtr3, String projQtr4, Date lastUpdate) {
        this.squadronId = squadronId;
        this.posNr = posNr;
        this.afscAuth = afscAuth;
        this.grdAuth = grdAuth;
        this.currQtr = currQtr;
        this.projQtr1 = projQtr1;
        this.projQtr2 = projQtr2;
        this.projQtr3 = projQtr3;
        this.projQtr4 = projQtr4;
        this.lastUpdate = lastUpdate;
    }
}

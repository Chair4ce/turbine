package squadron.manager.turbine.billet;


import lombok.*;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class AuthorizedBilletJSON {
    private String pasCode;
    private String orgnStructId;
    private String posNr;
    private String afscAuth;
    private String grdAuth;
    private String currQtr;
    private String projQtr1;
    private String projQtr2;
    private String projQtr3;
    private String projQtr4;
    private String mbrAssigned;
    private Date lastUpdate;
}

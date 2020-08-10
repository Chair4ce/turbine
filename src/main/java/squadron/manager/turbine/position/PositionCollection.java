package squadron.manager.turbine.position;

import lombok.*;

import java.util.ArrayList;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PositionCollection {
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
    private String gradeAssigned;
    private String dafscAssigned;
    private String nameAssigned;
    private String mbrIdAssigned;
    private ArrayList<Position> doubleBillet;
    private ArrayList<Position> unfunded;
    private Date lastUpdated;

}

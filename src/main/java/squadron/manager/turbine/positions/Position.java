package squadron.manager.turbine.positions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;


@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name = "authorized_positions")
public class Position {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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


    public Position(int squadronId, String posId, String afscAuth, String grdAuth, String currQtr, String projQtr1, String projQtr2, String projQtr3, String projQtr4, String mbrAssigned, Date lastUpdate) {
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

    public Position update(PositionJSON json) {
        this.setSquadronId(json.getSquadronId());
        this.setPosId(json.getPosId());
        this.setAfscAuth(json.getAfscAuth());
        this.setGrdAuth(json.getGrdAuth());
        this.setCurrQtr(json.getCurrQtr());
        this.setProjQtr1(json.getProjQtr1());
        this.setProjQtr2(json.getProjQtr2());
        this.setProjQtr3(json.getProjQtr3());
        this.setProjQtr4(json.getProjQtr4());
        this.setMbrAssigned(json.getMbrAssigned());
        this.setLastUpdate(json.getLastUpdate());
        return this;
    }

}

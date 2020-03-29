package squadron.manager.turbine.billet;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@NoArgsConstructor
@Entity
@Data
@Table(name = "authorized_positions")
@DynamicUpdate
public class AuthorizedBillet {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
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

    public AuthorizedBillet(String pasCode, String orgnStructId, String posNr, String afscAuth, String grdAuth, String currQtr, String projQtr1, String projQtr2, String projQtr3, String projQtr4, String mbrAssigned, Date lastUpdate) {
        this.pasCode = pasCode;
        this.orgnStructId = orgnStructId;
        this.posNr = posNr;
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

    public AuthorizedBillet(Long id, String pasCode, String orgnStructId, String posNr, String afscAuth, String grdAuth, String currQtr, String projQtr1, String projQtr2, String projQtr3, String projQtr4, String mbrAssigned, Date lastUpdate) {
        this.id = id;
        this.pasCode = pasCode;
        this.orgnStructId = orgnStructId;
        this.posNr = posNr;
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

    public AuthorizedBillet update(AuthorizedBilletJSON json) {
        this.setPasCode(json.getPasCode());
        this.setOrgnStructId(json.getOrgnStructId());
        this.setPosNr(json.getPosNr());
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

    public List<String> compare(AuthorizedBillet importingAuthorizedBillet) throws NullPointerException {
        List<String> diff = new ArrayList<>();

        if (this.pasCode.equals(importingAuthorizedBillet.pasCode))
            diff.add("pasCode");

        if (this.orgnStructId.equals(importingAuthorizedBillet.orgnStructId))
            diff.add("orgnStructId");

        if (this.posNr.equals(importingAuthorizedBillet.posNr))
            diff.add("posNr");

        try {
            if (!this.afscAuth.equals(importingAuthorizedBillet.afscAuth)){
                    diff.add("afscAuth");
            }
        } catch (NullPointerException e) {
            if (this.afscAuth != null) {
                diff.add("afscAuth");
            }
        }

        try {
            if (!this.grdAuth.equals(importingAuthorizedBillet.grdAuth)){
                    diff.add("grdAuth");
            }
        } catch (NullPointerException e) {
            if (this.grdAuth != null) {
                diff.add("grdAuth");
            }
        }

        try {
            if (!this.currQtr.equals(importingAuthorizedBillet.currQtr)){
                    diff.add("currQtr");
            }
        } catch (NullPointerException e) {
            if (this.currQtr != null) {
                diff.add("currQtr");
            }
        }

        try {
            if (!this.projQtr1.equals(importingAuthorizedBillet.projQtr1)){
                    diff.add("projQtr1");
            }
        } catch (NullPointerException e) {
            if (this.projQtr1 != null) {
                diff.add("projQtr1");
            }
        }

        try {
            if (!this.projQtr2.equals(importingAuthorizedBillet.projQtr2)){
                    diff.add("projQtr2");
            }
        } catch (NullPointerException e) {
            if (this.projQtr2 != null) {
                diff.add("projQtr2");
            }
        }

        try {
            if (!this.projQtr3.equals(importingAuthorizedBillet.projQtr3)){
                    diff.add("projQtr3");
            }
        } catch (NullPointerException e) {
            if (this.projQtr3 != null) {
                diff.add("projQtr3");
            }
        }

        try {
            if (!this.projQtr4.equals(importingAuthorizedBillet.projQtr4)){
                    diff.add("projQtr4");
            }
        } catch (NullPointerException e) {
            if (this.projQtr4 != null) {
                diff.add("projQtr4");
            }
        }

        try {
            if (!this.mbrAssigned.equals(importingAuthorizedBillet.mbrAssigned)){
                    diff.add("mbrAssigned");
            }
        } catch (NullPointerException e) {
            if (this.mbrAssigned != null) {
                diff.add("mbrAssigned");
            }
        }

        return diff;
    }

}

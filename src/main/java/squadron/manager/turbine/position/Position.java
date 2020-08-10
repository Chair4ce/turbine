package squadron.manager.turbine.position;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;


@NoArgsConstructor
@Entity
@Data
@Table(name = "position")
@DynamicUpdate
public class Position {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private Long id;
    @Column(name = "pas_code")
    private String pasCode;
    @Column(name = "org_structure_id")
    private String orgStructureId;
    @Column(name = "afsc_auth")
    private String afscAuth;
    @Column(name = "grd_auth")
    private String grdAuth;
    @Column(name = "curr_qtr")
    private String currQtr;
    @Column(name = "proj_qtr_1")
    private String projQtr1;
    @Column(name = "proj_qtr_2")
    private String projQtr2;
    @Column(name = "proj_qtr_3")
    private String projQtr3;
    @Column(name = "proj_qtr_4")
    private String projQtr4;
    @Column(name = "pos_nr")
    private String posNr;
    @Column(name = "assigned_mbr_id")
    private String assignedMbrId;
    @Column(name = "mbr_name")
    private String mbrName;
    @Column(name = "last_updated")
    private Date lastUpdated;

    public Position(String pasCode, String orgStructureId, String afscAuth, String grdAuth, String currQtr, String projQtr1, String projQtr2, String projQtr3, String projQtr4, String posNr, String assignedMbrId, String mbrName, Date lastUpdated) {
        this.pasCode = pasCode;
        this.orgStructureId = orgStructureId;
        this.afscAuth = afscAuth;
        this.grdAuth = grdAuth;
        this.currQtr = currQtr;
        this.projQtr1 = projQtr1;
        this.projQtr2 = projQtr2;
        this.projQtr3 = projQtr3;
        this.projQtr4 = projQtr4;
        this.posNr = posNr;
        this.assignedMbrId = assignedMbrId;
        this.mbrName = mbrName;
        this.lastUpdated = lastUpdated;
    }

    public Position(Long id, String pasCode, String orgStructureId, String afscAuth, String grdAuth, String currQtr, String projQtr1, String projQtr2, String projQtr3, String projQtr4, String posNr, String assignedMbrId, String mbrName, Date lastUpdated) {
        this.id = id;
        this.pasCode = pasCode;
        this.orgStructureId = orgStructureId;
        this.afscAuth = afscAuth;
        this.grdAuth = grdAuth;
        this.currQtr = currQtr;
        this.projQtr1 = projQtr1;
        this.projQtr2 = projQtr2;
        this.projQtr3 = projQtr3;
        this.projQtr4 = projQtr4;
        this.posNr = posNr;
        this.assignedMbrId = assignedMbrId;
        this.mbrName = mbrName;
        this.lastUpdated = lastUpdated;
    }
}

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
        @Column(name= "pas_code")
    private String pasCode;
        @Column(name= "org_structure_id")
    private String orgStructureId;
        @Column(name= "afsc_auth")
    private String afscAuth;
        @Column(name= "grd_auth")
    private String grdAuth;
        @Column(name= "curr_qtr")
    private Boolean currQtr;
        @Column(name= "proj_qtr_1")
    private Boolean projQtr1;
        @Column(name= "proj_qtr_2")
    private Boolean projQtr2;
        @Column(name= "proj_qtr_3")
    private Boolean projQtr3;
        @Column(name= "proj_qtr_4")
    private Boolean projQtr4;
        @Column(name= "pos_nr")
    private String posNr;
        @Column(name= "assigned_mbr_id")
    private String assignedMbrId;
    @Column(name= "pos_type")
    private String posType;
    @Column(name= "last_updated")
    private Date lastUpdated;

    public Position(String pasCode, String orgStructureId, String afscAuth, String grdAuth, Boolean currQtr, Boolean projQtr1, Boolean projQtr2, Boolean projQtr3, Boolean projQtr4, String posNr, String assignedMbrId, String posType, Date lastUpdated) {
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
        this.posType = posType;
        this.lastUpdated = lastUpdated;
    }
    public Position(Long id, String pasCode, String orgStructureId, String afscAuth, String grdAuth, Boolean currQtr, Boolean projQtr1, Boolean projQtr2, Boolean projQtr3, Boolean projQtr4, String posNr, String assignedMbrId, String posType, Date lastUpdated) {
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
        this.posType = posType;
        this.lastUpdated = lastUpdated;
    }
}

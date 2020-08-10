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
    @Column(name = "grade_assigned")
    private String gradeAssigned;
    @Column(name = "dafsc_assigned")
    private String dafscAssigned;
    @Column(name = "name_assigned")
    private String nameAssigned;
    @Column(name = "mbr_id_assigned")
    private String mbrIdAssigned;
    @Column(name = "last_updated")
    private Date lastUpdated;

    public Position(Long id, String pasCode, String orgStructureId, String afscAuth, String grdAuth, String currQtr, String projQtr1, String projQtr2, String projQtr3, String projQtr4, String posNr, String gradeAssigned, String dafscAssigned, String nameAssigned, String mbrIdAssigned, Date lastUpdated) {
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
        this.gradeAssigned = gradeAssigned;
        this.dafscAssigned = dafscAssigned;
        this.nameAssigned = nameAssigned;
        this.mbrIdAssigned = mbrIdAssigned;
        this.lastUpdated = lastUpdated;
    }

    public Position(String pasCode, String orgStructureId, String afscAuth, String grdAuth, String currQtr, String projQtr1, String projQtr2, String projQtr3, String projQtr4, String posNr, String gradeAssigned, String dafscAssigned, String nameAssigned, String mbrIdAssigned, Date lastUpdated) {
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
        this.gradeAssigned = gradeAssigned;
        this.dafscAssigned = dafscAssigned;
        this.nameAssigned = nameAssigned;
        this.mbrIdAssigned = mbrIdAssigned;
        this.lastUpdated = lastUpdated;
    }
}

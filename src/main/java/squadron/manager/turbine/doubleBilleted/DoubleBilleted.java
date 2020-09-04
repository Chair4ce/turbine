package squadron.manager.turbine.doubleBilleted;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;


@NoArgsConstructor
@Entity
@Data
@Table(name = "double_billeted")
@DynamicUpdate
public class DoubleBilleted {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "pas_code")
    private String pasCode;
    @Column(name = "pos_nr")
    private String posNr;
    @Column(name = "name_assigned")
    private String nameAssigned;
    @Column(name = "mbr_id_assigned")
    private String mbrIdAssigned;
    @Column(name = "last_updated")
    private Date lastUpdated;

    public DoubleBilleted(Long id, String pasCode, String posNr, String nameAssigned, String mbrIdAssigned, Date lastUpdated) {
        this.id = id;
        this.pasCode = pasCode;
        this.posNr = posNr;
        this.nameAssigned = nameAssigned;
        this.mbrIdAssigned = mbrIdAssigned;
        this.lastUpdated = lastUpdated;
    }

    public DoubleBilleted(String pasCode, String posNr, String nameAssigned, String mbrIdAssigned, Date lastUpdated) {
        this.pasCode = pasCode;
        this.posNr = posNr;
        this.nameAssigned = nameAssigned;
        this.mbrIdAssigned = mbrIdAssigned;
        this.lastUpdated = lastUpdated;
    }
}

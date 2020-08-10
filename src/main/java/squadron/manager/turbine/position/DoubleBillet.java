package squadron.manager.turbine.position;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;


@NoArgsConstructor
@Entity
@Data
@Table(name = "double_billet")
@DynamicUpdate
public class DoubleBillet {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private Long id;
    @Column(name= "pas_code")
    private String pasCode;
    @Column(name= "mbr_id")
    private String mbrId;
    @Column(name= "pos_nr")
    private String posNr;
    @Column(name= "last_updated")
    private Date lastUpdated;

    public DoubleBillet(String pasCode, String mbrId, String posNr, Date lastUpdated) {
        this.pasCode = pasCode;
        this.mbrId = mbrId;
        this.posNr = posNr;
        this.lastUpdated = lastUpdated;
    }
    public DoubleBillet(Long id, String pasCode, String mbrId, String posNr, Date lastUpdated) {
        this.id = id;
        this.pasCode = pasCode;
        this.mbrId = mbrId;
        this.posNr = posNr;
        this.lastUpdated = lastUpdated;
    }

}

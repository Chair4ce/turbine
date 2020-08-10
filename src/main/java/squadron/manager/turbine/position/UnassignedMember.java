package squadron.manager.turbine.position;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;


@NoArgsConstructor
@Entity
@Data
@Table(name = "unassigned")
@DynamicUpdate
public class UnassignedMember {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private Long id;
    @Column(name= "pas_code")
    private String pasCode;
    @Column(name= "mbr_id")
    private String mbrId;
    @Column(name= "last_updated")
    private Date lastUpdated;

    public UnassignedMember(Long id, String pasCode, String mbrId, Date lastUpdated) {
        this.id = id;
        this.pasCode = pasCode;
        this.mbrId = mbrId;
        this.lastUpdated = lastUpdated;
    }

    public UnassignedMember(String pasCode, String mbrId, Date lastUpdated) {
        this.pasCode = pasCode;
        this.mbrId = mbrId;
        this.lastUpdated = lastUpdated;
    }
}

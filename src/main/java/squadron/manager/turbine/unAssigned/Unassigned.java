package squadron.manager.turbine.unAssigned;

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
public class Unassigned {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "pas_code")
    private String pasCode;
    @Column(name = "mbr_id")
    private String mbrId;
    @Column(name = "full_name")
    private String fullName;
    private String dafsc;
    private String grade;
    @Column(name = "last_updated")
    private Date lastUpdated;

    public Unassigned(Long id, String pasCode, String mbrId, String fullName, String dafsc, String grade, Date lastUpdated) {
        this.id = id;
        this.pasCode = pasCode;
        this.mbrId = mbrId;
        this.fullName = fullName;
        this.dafsc = dafsc;
        this.grade = grade;
        this.lastUpdated = lastUpdated;
    }

    public Unassigned( String pasCode, String mbrId, String fullName, String dafsc, String grade, Date lastUpdated) {
        this.pasCode = pasCode;
        this.mbrId = mbrId;
        this.fullName = fullName;
        this.dafsc = dafsc;
        this.grade = grade;
        this.lastUpdated = lastUpdated;
    }
}

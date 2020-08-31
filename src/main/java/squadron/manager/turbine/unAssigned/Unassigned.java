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
    private String mbrId;
    private String fullName;
    private String dafsc;
    private String grade;
    private Date lastUpdated;

    public Unassigned(Long id, String mbrId, String fullName, String dafsc, String grade, Date lastUpdated) {
        this.id = id;
        this.mbrId = mbrId;
        this.fullName = fullName;
        this.dafsc = dafsc;
        this.grade = grade;
        this.lastUpdated = lastUpdated;
    }

    public Unassigned(String mbrId, String fullName, String dafsc, String grade, Date lastUpdated) {
        this.mbrId = mbrId;
        this.fullName = fullName;
        this.dafsc = dafsc;
        this.grade = grade;
        this.lastUpdated = lastUpdated;
    }
}

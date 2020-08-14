package squadron.manager.turbine.manningChart;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.joda.time.DateTime;

import javax.persistence.*;
import java.util.Date;

@NoArgsConstructor
@Entity
@Data
@Table(name = "increment_log")
@DynamicUpdate
public class AFSCIncrementLog {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "pas_code")
    private String pasCode;
    @Column(name = "mbr_id")
    private String mbrId;
    private String afsc;
    @Column(name = "increment_date")
    private Date incrementDate;
    @Column(name = "increment_change")
    private double incrementChange;
    @Column(name = "increment_type")
    private String incrementType;

    public AFSCIncrementLog(Long id, String pasCode, String mbrId, String afsc, Date incrementDate, double incrementChange, String incrementType) {
        this.id = id;
        this.pasCode = pasCode;
        this.mbrId = mbrId;
        this.afsc = afsc;
        this.incrementDate = incrementDate;
        this.incrementChange = incrementChange;
        this.incrementType = incrementType;
    }

    public AFSCIncrementLog(String pasCode, String mbrId, String afsc, Date incrementDate, double incrementChange, String incrementType) {
        this.pasCode = pasCode;
        this.mbrId = mbrId;
        this.afsc = afsc;
        this.incrementDate = incrementDate;
        this.incrementChange = incrementChange;
        this.incrementType = incrementType;
    }
}

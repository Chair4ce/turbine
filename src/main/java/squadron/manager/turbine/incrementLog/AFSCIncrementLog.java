package squadron.manager.turbine.incrementLog;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

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
    @Column(name = "item_id")
    private String itemId;
    private String afsc;
    @Column(name = "increment_date")
    private Date incrementDate;
    private int month;
    private int year;
    @Column(name = "increment_change")
    private double incrementChange;
    @Column(name = "increment_type")
    private String incrementType;

    public AFSCIncrementLog(Long id, String pasCode, String itemId, String afsc, Date incrementDate,int month,int year, double incrementChange, String incrementType) {
        this.id = id;
        this.pasCode = pasCode;
        this.itemId = itemId;
        this.afsc = afsc;
        this.incrementDate = incrementDate;
        this.month = month;
        this.year = year;
        this.incrementChange = incrementChange;
        this.incrementType = incrementType;
    }

    public AFSCIncrementLog(String pasCode, String itemId, String afsc, Date incrementDate,int month,int year, double incrementChange, String incrementType) {
        this.pasCode = pasCode;
        this.itemId = itemId;
        this.afsc = afsc;
        this.incrementDate = incrementDate;
        this.month = month;
        this.year = year;
        this.incrementChange = incrementChange;
        this.incrementType = incrementType;
    }
}

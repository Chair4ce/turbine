package squadron.manager.turbine.metric;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@Table(name = "new_gaining_log")
public class NewGainingLogModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String sqid;
    private String fullName;
    private Date importDateTime;


    public NewGainingLogModel( String sqid, String fullName, Date importDateTime) {
        this.sqid = sqid;
        this.fullName = fullName;
        this.importDateTime = importDateTime;
    }

}

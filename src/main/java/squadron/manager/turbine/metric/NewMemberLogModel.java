package squadron.manager.turbine.metric;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@Table(name = "new_member_log")
public class NewMemberLogModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String sqid;
    private String fullName;
    private Date importDateTime;


    public NewMemberLogModel(String sqid, String fullName, Date importDateTime) {
        this.sqid = sqid;
        this.fullName = fullName;
        this.importDateTime = importDateTime;
    }

}

package squadron.manager.turbine.metric;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;


@Entity
@Data
@NoArgsConstructor
@Table(name = "new_billet_log")
public class NewBilletsLogModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String pasCode;
    private String posNr;
    private Date importDateTime;

    public NewBilletsLogModel(String pasCode, String posNr, Date importDateTime) {
        this.pasCode = pasCode;
        this.posNr = posNr;
        this.importDateTime = importDateTime;
    }
}

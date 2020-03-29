package squadron.manager.turbine.metric;

import lombok.Data;
import lombok.NoArgsConstructor;
import squadron.manager.turbine.billet.AuthorizedBillet;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@Table(name = "billet_import_log")
public class ImportBilletsChangeLog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String pasCode;
    private String posNr;
    private Date importDateTime; // time change *observed*
    private String field;

    @Column(length = 65535)
    private String oldData;

    @Column(length = 65535)
    private String newData;

    public ImportBilletsChangeLog(
            Date importDateTime,
            AuthorizedBillet newBillet,
            AuthorizedBillet oldBillet,
            String field
    ) {
        this.pasCode = newBillet.getPasCode();
        this.posNr = newBillet.getPosNr();
        this.importDateTime = importDateTime;
        this.field = field;

        switch (field) {
            case "orgnStructId":
                this.oldData = oldBillet.getOrgnStructId();
                this.newData = newBillet.getOrgnStructId();
                break;
            case "afsc_auth":
                this.oldData = oldBillet.getAfscAuth();
                this.newData = newBillet.getAfscAuth();
                break;
            case "grd_auth":
                this.oldData = oldBillet.getGrdAuth();
                this.newData = newBillet.getGrdAuth();
                break;
            case "curr_qtr":
                this.oldData = oldBillet.getCurrQtr();
                this.newData = newBillet.getCurrQtr();
                break;
            case "proj_qtr1":
                this.oldData = oldBillet.getProjQtr1();
                this.newData = newBillet.getProjQtr1();
                break;
            case "proj_qtr2":
                this.oldData = oldBillet.getProjQtr2();
                this.newData = newBillet.getProjQtr2();
                break;
            case "proj_qtr3":
                this.oldData = oldBillet.getProjQtr3();
                this.newData = newBillet.getProjQtr3();
                break;
            case "proj_qtr4":
                this.oldData = oldBillet.getProjQtr4();
                this.newData = newBillet.getProjQtr4();
                break;
            default:
                break;
        }
    }
}

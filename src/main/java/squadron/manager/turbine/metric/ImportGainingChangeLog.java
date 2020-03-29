package squadron.manager.turbine.metric;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.joda.time.LocalDate;
import squadron.manager.turbine.gaining.Gaining;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@Table(name = "gaining_import_log")
public class ImportGainingChangeLog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String sqid;
    private String fullName;
    private Date importDateTime; // time change *observed*
    private String field;

    @Column(length = 65535)
    private String oldData;

    @Column(length = 65535)
    private String newData;

    public ImportGainingChangeLog(
            Date importDatetime,
            Gaining newGaining,
            Gaining oldGaining,
            String field
    ) {
        this.sqid = newGaining.getSqid();
        this.importDateTime = importDatetime;
        this.fullName = oldGaining.getFullName();
        this.field = field;
        SimpleDateFormat newformat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss.S");
        switch (field) {
            case "fullName":
                this.oldData = oldGaining.getFullName();
                this.newData = newGaining.getFullName();
                break;
            case "firstName":
                this.oldData = oldGaining.getFirstName();
                this.newData = newGaining.getFirstName();
                break;

            case "lastName":
                this.oldData = oldGaining.getLastName();
                this.newData = newGaining.getLastName();
                break;

            case "rnltd":
                if (oldGaining.getRnltd() == null && newGaining.getRnltd() == null) break;
                if (oldGaining.getRnltd() == null) {
                    this.oldData = "not set";
                } else {
                    this.oldData = newformat.format(oldGaining.getRnltd());
                }

                if (newGaining.getRnltd() == null) {
                    this.newData = "not set";
                } else {
                    this.newData = newformat.format(newGaining.getRnltd());
                }
                break;

            case "grade":
                this.oldData = oldGaining.getGrade();
                this.newData = newGaining.getGrade();
                break;

            case "projectedArrivalDate":
                if (oldGaining.getProjectedArrivalDate() == null) {
                    this.oldData = "not set";
                } else {
                    this.oldData = newformat.format(oldGaining.getProjectedArrivalDate());
                }

                if (newGaining.getProjectedArrivalDate() == null) {
                    this.newData = null;
                } else {
                    this.newData = newformat.format(newGaining.getProjectedArrivalDate());
                }
                break;

            case "dafsc":
                this.oldData = oldGaining.getDafsc();
                this.newData = newGaining.getDafsc();
                break;

            case "cellPhone":
                if (oldGaining.getCellPhone() == null) {
                    this.oldData = "not set";
                } else {
                    this.oldData = oldGaining.getCellPhone();
                }

                if (newGaining.getCellPhone() == null) {
                    this.newData = null;
                } else {
                    this.newData = newGaining.getCellPhone();
                }
                break;

            case "email":
                if (oldGaining.getEmail() == null) {
                    this.oldData = "not set";
                } else {
                    this.oldData = oldGaining.getEmail();
                }

                if (newGaining.getEmail() == null) {
                    this.newData = null;
                } else {
                    this.newData = newGaining.getEmail();
                }
                break;

            case "dor":
                if (oldGaining.getDor() == null) {
                    this.oldData = "not set";
                } else {
                    this.oldData = newformat.format(oldGaining.getDor());
                }

                if (newGaining.getDor() == null) {
                    this.newData = null;
                } else {
                    this.newData = newformat.format(newGaining.getDor());
                }
                break;

            case "dateArrivedStation":
                if (oldGaining.getDateArrivedStation() == null) {
                    this.oldData = "not set";
                } else {
                    this.oldData = newformat.format(oldGaining.getDateArrivedStation());
                }

                if (newGaining.getDateArrivedStation() == null) {
                    this.newData = null;
                } else {
                    this.newData = newformat.format(newGaining.getDateArrivedStation());
                }
                break;

            case "projectedBilletId":
                if (oldGaining.getProjectedBilletId() == null) {
                    this.oldData = "not set";
                } else {
                    this.oldData = oldGaining.getProjectedBilletId();
                }

                if (newGaining.getProjectedBilletId() == null) {
                    this.newData = null;
                } else {
                    this.newData = newGaining.getProjectedBilletId();
                }
                break;


            case "dateDepLastDutyStn":
                if (oldGaining.getDateDepLastDutyStn() == null) {
                    this.oldData = "not set";
                } else {
                    this.oldData = newformat.format(oldGaining.getDateDepLastDutyStn());
                }

                if (newGaining.getDateDepLastDutyStn() == null) {
                    this.newData = "not set";
                } else {
                    this.newData = newformat.format(newGaining.getDateDepLastDutyStn());
                }

                break;
            case "sponsorId":

                if (oldGaining.getSponsorId() == null) {
                    this.oldData = "not set";
                } else {
                    this.oldData = oldGaining.getSponsorId();
                }

                if (newGaining.getSponsorId() == null) {
                    this.newData = "not set";
                } else {
                    this.newData = newGaining.getSponsorId();
                }

                break;

            case "projectedOfficeSymbol":
                if (oldGaining.getProjectedOfficeSymbol() == null) {
                    this.oldData = "not set";
                } else {
                    this.oldData = newformat.format(oldGaining.getProjectedOfficeSymbol());
                }

                if (newGaining.getProjectedOfficeSymbol() == null) {
                    this.newData = null;
                } else {
                    this.newData = newformat.format(newGaining.getProjectedOfficeSymbol());
                }
                break;

            default:
                break;
        }
    }
}

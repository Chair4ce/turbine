package squadron.manager.turbine.metric;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.joda.time.LocalDate;
import squadron.manager.turbine.member.Member;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Date;


@Entity
@Data
@NoArgsConstructor
@Table(name = "member_import_log")
public class ImportMembersChangeLog {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String sqid;
    private String fullName;
    private Date importDateTime; // time change *observed*
    private String field;

    @Column(length = 65535, name= "old_data")
    private String oldData;

    @Column(length = 65535)
    private String newData;

    public ImportMembersChangeLog(
            String sqid,
            Date importDateTime,
            String field,
            String oldData,
            String newData
    ) {
        this.sqid = sqid;
        this.importDateTime = verifyDate(importDateTime);
        this.field = field;
        this.oldData = oldData;
        this.newData = newData;
    }

    private Date verifyDate(Date item) {
        if (item != null) {
            return new LocalDate(item).toDate();
        } else {
            return null;
        }
    }

    public ImportMembersChangeLog(
            Date importDatetime,
            Member newMember,
            Member oldMember,
            String field
    ) {
        this.sqid = newMember.getSqid();
        this.importDateTime = importDatetime;
        this.fullName = oldMember.getFullName();
        this.field = field;
        SimpleDateFormat newformat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss.S");
        switch (field) {
            case "fullName":
                this.oldData = oldMember.getFullName();
                this.newData = newMember.getFullName();
                break;
            case "firstName":
                this.oldData = oldMember.getFirstName();
                this.newData = newMember.getFirstName();
                break;


            case "lastName":// this is the only field that could be null to string
                this.oldData = oldMember.getLastName();
                this.newData = newMember.getLastName();
                break;

            case "tafmsd":
                this.oldData = oldMember.getTafmsd().toString();
                this.newData = newformat.format(newMember.getTafmsd());
                break;

            case "grade":
                this.oldData = oldMember.getGrade();
                this.newData = newMember.getGrade();
                break;

            case "assignedPas":
                this.oldData = oldMember.getAssignedPas();
                this.newData = newMember.getAssignedPas();
                break;

            case "dafsc":
                this.oldData = oldMember.getDafsc();
                this.newData = newMember.getDafsc();
                break;
            case "officeSymbol":
                if (oldMember.getOfficeSymbol() == null) {

                    this.oldData = "empty";
                } else {
                    this.oldData = oldMember.getOfficeSymbol();
                }

                if (newMember.getOfficeSymbol() == null) {
                    this.newData = "empty";
                } else {
                    this.newData = newMember.getOfficeSymbol();
                }

                break;
            case "dutyTitle":
                this.oldData = oldMember.getDutyTitle();
                this.newData = newMember.getDutyTitle();
                break;

            case "dutyStartDate":

                if (oldMember.getDutyStartDate() == null) {
                    this.oldData = "empty";
                } else {
                    this.oldData = oldMember.getDutyStartDate().toString();
                }

                if (newMember.getDutyStartDate() == null) {
                    this.newData = "empty";
                } else {
                    this.newData = newformat.format(newMember.getDutyStartDate());
                }
                break;

            case "dutyPhone":
                this.oldData = oldMember.getDutyPhone();
                this.newData = newMember.getDutyPhone();
                break;

            case "supvName":
                this.oldData = oldMember.getSupvName();
                this.newData = newMember.getSupvName();
                break;

            case "supvBeginDate":

                if (oldMember.getSupvBeginDate() == null) {
                    this.oldData = "empty";
                } else {
                    this.oldData = oldMember.getSupvBeginDate().toString();
                }

                if (newMember.getSupvBeginDate() == null) {
                    this.newData = "empty";
                } else {
                    this.newData = newformat.format(newMember.getSupvBeginDate());
                }
                break;

            case "dateArrivedStation":
                this.oldData = oldMember.getDateArrivedStation().toString();
                this.newData = newformat.format(newMember.getDateArrivedStation());
                break;

            case "dor":
                this.oldData = oldMember.getDor().toString();
                this.newData = newformat.format(newMember.getDor());
                break;

            default:
                break;
        }

    }
}

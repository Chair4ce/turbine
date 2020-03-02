package squadron.manager.turbine.metric;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.joda.time.LocalDate;
import squadron.manager.turbine.member.Member;

import javax.persistence.*;
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
        switch (field) {
            case "fullName":
                System.out.println("Found Change in: " + field);
                this.oldData = oldMember.getFullName();
                this.newData = newMember.getFullName();
                break;
            case "firstName":
                System.out.println("Found Change in: " + field);
                this.oldData = oldMember.getFirstName();
                this.newData = newMember.getFirstName();
                break;


            case "lastName":
                System.out.println("Found Change in: " + field);// this is the only field that could be null to string
                this.oldData = oldMember.getLastName();
                this.newData = newMember.getLastName();
                break;

            case "tafmsd":
                System.out.println("Found Change in: " + field);
                this.oldData = verifyDate(oldMember.getTafmsd()).toString();
                this.newData = newMember.getTafmsd().toString();
                break;

            case "grade":
                System.out.println("Found Change in: " + field);
                this.oldData = oldMember.getGrade();
                this.newData = newMember.getGrade();
                break;

            case "assignedPas":
                System.out.println("Found Change in: " + field);
                this.oldData = oldMember.getAssignedPas();
                this.newData = newMember.getAssignedPas();
                break;

            case "dafsc":
                System.out.println("Found Change in: " + field);
                this.oldData = oldMember.getDafsc();
                this.newData = newMember.getDafsc();
                break;
            case "officeSymbol":
                System.out.println("Found Change in: " + field);
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
                System.out.println("Found Change in: " + field);
                this.oldData = oldMember.getDutyTitle();
                this.newData = newMember.getDutyTitle();
                break;

            case "dutyStartDate":
                System.out.println("Found Change in: " + field);

                if (oldMember.getDutyStartDate() == null) {
                    this.oldData = "empty";
                } else {
                    this.oldData = verifyDate(oldMember.getDutyStartDate()).toString();
                }

                if (newMember.getDutyStartDate() == null) {
                    this.newData = "empty";
                } else {
                    this.newData = newMember.getDutyStartDate().toString();
                }
                break;

            case "dutyPhone":
                System.out.println("Found Change in: " + field);
                this.oldData = oldMember.getDutyPhone();
                this.newData = newMember.getDutyPhone();
                break;

            case "supvName":
                System.out.println("Found Change in: " + field);
                this.oldData = oldMember.getSupvName();
                this.newData = newMember.getSupvName();
                break;

            case "supvBeginDate":
                System.out.println("Found Change in: " + field);

                if (oldMember.getSupvBeginDate() == null) {
                    this.oldData = "empty";
                } else {
                    this.oldData = verifyDate(oldMember.getSupvBeginDate()).toString();
                }

                if (newMember.getSupvBeginDate() == null) {
                    this.newData = "empty";
                } else {
                    this.newData = newMember.getSupvBeginDate().toString();
                }
                break;

            case "dateArrivedStation":
                System.out.println("Found Change in: " + field);
                this.oldData = verifyDate(oldMember.getDateArrivedStation()).toString();
                this.newData = newMember.getDateArrivedStation().toString();
                break;

            case "dor":
                System.out.println("Found Change in: " + field);
                this.oldData = verifyDate(oldMember.getDor()).toString();
                this.newData = newMember.getDor().toString();
                break;

            default:
                System.out.println("Found Change in: " + field);
                break;
        }

    }
}

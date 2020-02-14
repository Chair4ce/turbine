package squadron.manager.turbine.member;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.joda.time.LocalDate;

import javax.persistence.*;
import java.util.Date;

@NoArgsConstructor
@Data
@Entity
@Table(name = "members")
public
class UploadmembersModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Integer sqid;

    private Date tafmsd;

    private String fullName;

    private String grade;

    private String assignedPas;

    private String dafsc;

    private String officeSymbol;

    private String dutyTitle;

    private Date dutyStartDate;

    private String dutyPhone;

    private String supvName;

    private Date supvBeginDate;

    private Date dateArrivedStation;

    private Date dor ;

    public UploadmembersModel(Integer sqid, Date tafmsd, String fullName, String grade, String assignedPas, String dafsc, String officeSymbol, String dutyTitle, Date dutyStartDate, String dutyPhone, String supvName, Date supvBeginDate, Date dateArrivedStation, Date dor) {
        this.sqid = sqid;
        this.tafmsd = tafmsd;
        this.fullName = fullName;
        this.grade = grade;
        this.assignedPas = assignedPas;
        this.dafsc = dafsc;
        this.officeSymbol = officeSymbol;
        this.dutyTitle = dutyTitle;
        this.dutyStartDate = dutyStartDate;
        this.dutyPhone = dutyPhone;
        this.supvName = supvName;
        this.supvBeginDate = supvBeginDate;
        this.dateArrivedStation = dateArrivedStation;
        this.dor = dor;
    }

    public UploadmembersModel update(MembersJSON json) {
        this.setSqid(json.getSqid());
        this.setTafmsd(json.getTafmsd());
        this.setFullName(json.getFullName());
        this.setGrade(json.getGrade());
        this.setAssignedPas(json.getAssignedPas());
        this.setOfficeSymbol(json.getOfficeSymbol());
        this.setDafsc(json.getDafsc());
        this.setDutyPhone(json.getDutyPhone());
        this.setDutyStartDate(json.getDutyStartDate());
        this.setDutyTitle(json.getDutyTitle());
        this.setSupvName(json.getSupvName());
        this.setSupvBeginDate(json.getSupvBeginDate());
        this.setDateArrivedStation(json.getDateArrivedStation());
        return this;
    }


    private Date verifyDate(Date item) {
        if (item != null){
            return new LocalDate(item).toDate();
        } else {
            return null;
        }
    }
}

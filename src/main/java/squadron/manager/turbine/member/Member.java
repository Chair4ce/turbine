package squadron.manager.turbine.member;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.joda.time.LocalDate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@NoArgsConstructor
@Entity
@Data
@Table(name = "members")
@DynamicUpdate
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String sqid;

    private String fullName;

    //    @Column(name = "first_name")
    private String firstName;

    //    @Column(name = "last_name")
    private String lastName;

    private Date tafmsd;

    private String grade;

    //    @Column(name = "assigned_pas")
    private String assignedPas;

    private String dafsc;

    //    @Column(name = "office_symbol")
    private String officeSymbol;

    //    @Column(name = "duty_title")
    private String dutyTitle;

    //    @Column(name = "duty_start_date")
    private Date dutyStartDate;

    //    @Column(name = "duty_phone")
    private String dutyPhone;

    //    @Column(name = "supv_name")
    private String supvName;

    //    @Column(name = "supv_begin_date")
    private Date supvBeginDate;

    //    @Column(name = "date_arrived_station")
    private Date dateArrivedStation;

    private Date rnltd;

    private Date dor;

    //    @Column(name = "last_updated")
    private Date lastUpdated;

    public Member(String sqid, String fullName, String firstName, String lastName, Date tafmsd, String grade, String assignedPas, String dafsc, String officeSymbol, String dutyTitle, Date dutyStartDate, String dutyPhone, String supvName, Date supvBeginDate, Date dateArrivedStation, Date rnltd, Date dor, Date lastUpdated) {
        this.sqid = sqid;
        this.fullName = fullName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.tafmsd = tafmsd;
        this.grade = grade;
        this.assignedPas = assignedPas;
        this.dafsc = dafsc.replaceAll("-", "");
        this.officeSymbol = officeSymbol;
        this.dutyTitle = dutyTitle;
        this.dutyStartDate = dutyStartDate;
        this.dutyPhone = dutyPhone;
        this.supvName = supvName;
        this.supvBeginDate = supvBeginDate;
        this.dateArrivedStation = dateArrivedStation;
        this.rnltd = rnltd;
        this.dor = dor;
        this.lastUpdated = lastUpdated;
    }

    public Member(Long id, String sqid, String fullName, String firstName, String lastName, Date tafmsd, String grade, String assignedPas, String dafsc, String officeSymbol, String dutyTitle, Date dutyStartDate, String dutyPhone, String supvName, Date supvBeginDate, Date dateArrivedStation,Date rnltd, Date dor, Date lastUpdated) {
        this.id = id;
        this.sqid = sqid;
        this.fullName = fullName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.tafmsd = tafmsd;
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
        this.rnltd = rnltd;
        this.dor = dor;
        this.lastUpdated = lastUpdated;
    }

    public Member update(MemberJSON json) {
        this.setSqid(json.getSqid());
        this.setFullName(json.getFullName());
        this.setFirstName(json.getFirstName());
        this.setLastName(json.getLastName());
        this.setTafmsd(json.getTafmsd());
        this.setGrade(json.getGrade());
        this.setAssignedPas(json.getAssignedPas());
        this.setDafsc(json.getDafsc());
        this.setOfficeSymbol(json.getOfficeSymbol());
        this.setDutyTitle(json.getDutyTitle());
        this.setDutyStartDate(json.getDutyStartDate());
        this.setDutyPhone(json.getDutyPhone());
        this.setSupvName(json.getSupvName());
        this.setSupvBeginDate(json.getSupvBeginDate());
        this.setDateArrivedStation(json.getDateArrivedStation());
        this.setRnltd(json.getRnltd());
        this.setDor(json.getDor());
        this.setLastUpdated(json.getLastUpdated());
        return this;
    }


    public List<String> compare(Member importingMember) throws NullPointerException {
        List<String> diff = new ArrayList<>();

        if (!this.fullName.equals(importingMember.fullName))
            diff.add("fullName");

        try {
            if (!this.firstName.equals(importingMember.firstName))
                diff.add("firstName");
        } catch (NullPointerException e) {
            diff.add("firstName");
        }

        try {
            if (!this.lastName.equals(importingMember.lastName))
                diff.add("lastName");
        } catch (NullPointerException e) {
            diff.add("lastName");
        }

        try {
            if (this.tafmsd.getTime() != importingMember.tafmsd.getTime()){
                if (this.tafmsd == null && importingMember.tafmsd == null) {
                } else {
                    diff.add("tafmsd");
                }
            }
        } catch (NullPointerException e) {
            if (this.tafmsd != null && importingMember.tafmsd != null) {
                diff.add("tafmsd");
            }
        }

        try {
            if (!this.grade.equals(importingMember.grade))
                diff.add("grade");
        } catch (NullPointerException e) {
            diff.add("grade");
        }

        try {
            if (!this.assignedPas.equals(importingMember.assignedPas))
                diff.add("assignedPas");
        } catch (NullPointerException e) {
            diff.add("assignedPas");
        }

        try {
            if (!this.dafsc.equals(importingMember.dafsc))
                diff.add("dafsc");
        } catch (NullPointerException e) {
            diff.add("dafsc");
        }

        try {
            if (!this.officeSymbol.equals(importingMember.officeSymbol))
                diff.add("officeSymbol");
        } catch (NullPointerException e) {
            if (!(this.officeSymbol == null && importingMember.officeSymbol == null)) {
            diff.add("officeSymbol");
        }
        }

        try {
            if (!this.dutyTitle.equals(importingMember.dutyTitle))
                diff.add("dutyTitle");
        } catch (NullPointerException e) {
            if (!(this.dutyTitle == null && importingMember.dutyTitle == null)) {
                diff.add("dutyTitle");
            }
        }

        try {
            if (this.dutyStartDate.getTime() != importingMember.dutyStartDate.getTime()){
                if (this.dutyStartDate == null && importingMember.dutyStartDate == null) {
                } else {
                    diff.add("dutyStartDate");
                }
            }
        } catch (NullPointerException e) {
            if (this.dutyStartDate != null && importingMember.dutyStartDate != null) {
                diff.add("dutyStartDate");
            }
        }

        try {
            if (!this.dutyPhone.equals(importingMember.dutyPhone))
                diff.add("dutyPhone");
        } catch (NullPointerException e) {
            if (!(this.dutyPhone == null && importingMember.dutyPhone == null)){
            diff.add("dutyPhone");
            }
        }

        try {
            if (!this.supvName.equals(importingMember.supvName))
                diff.add("supvName");
        } catch (NullPointerException e) {
            if (!(this.supvName == null && importingMember.supvName == null)){
            diff.add("supvName");
            }
        }

        try {
            if (this.supvBeginDate.getTime() != importingMember.supvBeginDate.getTime()){
                if (this.supvBeginDate == null && importingMember.supvBeginDate == null) {
                } else {
                    diff.add("supvBeginDate");
                }
            }
        } catch (NullPointerException e) {
            if (this.supvBeginDate != null && importingMember.supvBeginDate != null) {
                diff.add("supvBeginDate");
            }
        }

        try {
            if (this.dateArrivedStation.getTime() != importingMember.dateArrivedStation.getTime()){
                if (this.dateArrivedStation == null && importingMember.dateArrivedStation == null) {
                } else {
                    diff.add("dateArrivedStation");
                }
            }
        } catch (NullPointerException e) {
            if (this.dateArrivedStation != null && importingMember.dateArrivedStation != null) {
                diff.add("dateArrivedStation");
            }
        }

        try {
            if (this.rnltd.getTime() != importingMember.rnltd.getTime()) {
                if (this.rnltd == null && importingMember.rnltd == null) {
                } else {
                    diff.add("rnltd");
                }
            }
        } catch (NullPointerException e) {
            if (this.rnltd != null && importingMember.rnltd != null) {
                diff.add("rnltd");
            }
        }

        try {
            if (this.dor.getTime() != importingMember.dor.getTime()){
                if (this.dor == null && importingMember.dor == null) {
                } else {
                    diff.add("dor");
                }
            }
        } catch (NullPointerException e) {
            if (this.dor != null && importingMember.dor != null) {
                diff.add("dor");
            }
        }
        return diff;
    }

}

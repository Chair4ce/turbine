package squadron.manager.turbine.member;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.joda.time.LocalDate;
import org.springframework.context.annotation.ComponentScan;

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

    @Column(name= "mbr_id")
    private String mbrId;

    @Column(name = "full_name")
    private String fullName;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;

    private String grade;

    @Column(name = "assigned_pas")
    private String assignedPas;

    private String cafsc;
    private String dafsc;
    private String pafsc;

    @Column(name = "office_symbol")
    private String officeSymbol;

    @Column(name = "duty_title")
    private String dutyTitle;

    @Column(name = "duty_start_date")
    private Date dutyStartDate;

    @Column(name = "duty_phone")
    private String dutyPhone;

    @Column(name = "supv_name")
    private String supvName;

    @Column(name = "supv_begin_date")
    private Date supvBeginDate;

    @Column(name = "date_arrived_station")
    private Date dateArrivedStation;

    private Date rnltd;

    private Date dor;
    private Date deros;

    @Column(name = "last_updated")
    private Date lastUpdated;

    public Member(Long id, String mbrId, String fullName, String firstName, String lastName, String grade, String assignedPas, String cafsc, String dafsc,String pafsc, String officeSymbol, String dutyTitle, Date dutyStartDate, String dutyPhone, String supvName, Date supvBeginDate, Date dateArrivedStation, Date rnltd, Date dor, Date deros, Date lastUpdated) {
        this.id = id;
        this.mbrId = mbrId;
        this.fullName = fullName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.grade = grade;
        this.assignedPas = assignedPas;
        this.cafsc = cafsc;
        this.dafsc = dafsc;
        this.pafsc = pafsc;
        this.officeSymbol = officeSymbol;
        this.dutyTitle = dutyTitle;
        this.dutyStartDate = dutyStartDate;
        this.dutyPhone = dutyPhone;
        this.supvName = supvName;
        this.supvBeginDate = supvBeginDate;
        this.dateArrivedStation = dateArrivedStation;
        this.rnltd = rnltd;
        this.dor = dor;
        this.deros = deros;
        this.lastUpdated = lastUpdated;
    }

    public Member(String mbrId, String fullName, String firstName, String lastName, String grade, String assignedPas, String cafsc, String dafsc,String pafsc, String officeSymbol, String dutyTitle, Date dutyStartDate, String dutyPhone, String supvName, Date supvBeginDate, Date dateArrivedStation, Date rnltd, Date dor, Date deros, Date lastUpdated) {
        this.mbrId = mbrId;
        this.fullName = fullName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.grade = grade;
        this.assignedPas = assignedPas;
        this.cafsc = cafsc != null ? cafsc.replaceAll("-", "") : null;
        this.dafsc = dafsc != null ? dafsc.replaceAll("-", "") : null;
        this.pafsc = pafsc != null ? pafsc.replaceAll("-", "") : null;
        this.officeSymbol = officeSymbol;
        this.dutyTitle = dutyTitle;
        this.dutyStartDate = dutyStartDate;
        this.dutyPhone = dutyPhone;
        this.supvName = supvName;
        this.supvBeginDate = supvBeginDate;
        this.dateArrivedStation = dateArrivedStation;
        this.rnltd = rnltd;
        this.dor = dor;
        this.deros = deros;
        this.lastUpdated = lastUpdated;
    }



    public List<String> compare(Member importingMember) throws NullPointerException {
        List<String> diff = new ArrayList<>();

        if (!this.fullName.equals(importingMember.fullName))
            diff.add("fullName");

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

package squadron.manager.turbine.gaining;

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
@Table(name = "gaining")
public class Gaining {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String sqid;

    //    @Column(name = "full_name")
    private String fullName;

    //    @Column(name = "first_name")
    private String firstName;

    //    @Column(name = "last_name")
    private String lastName;

    private Date rnltd;

    private String grade;

    //    @Column(name = "gaining_pas")
    private String gainingPas;

    //    @Column(name = "projected_arrival_date")
    private Date projectedArrivalDate;

    private String dafsc;

    //    @Column(name = "cell_phone")
    private String cellPhone;

    private String email;

    private Date dor;

    //    @Column(name = "date_arrived_station")
    private Date dateArrivedStation;

    //    @Column(name = "projected_billet_id")
    private String projectedBilletId;

    //    @Column(name = "departed_last_station")
    private Date dateDepLastDutyStn;

    private String sponsorId;

    //    @Column(name = "losing_pas")
    private String losingPas;

    //    @Column(name = "projected_Office_Symbol")
    private String projectedOfficeSymbol;

    //    @Column(name = "last_updated")
    private Date lastUpdated;


    public Gaining(String sqid, String fullName, String firstName, String lastName, Date rnltd, String grade, String gainingPas, String dafsc, Date dor, Date dateDepLastDutyStn, String sponsorId, String losingPas, Date lastUpdated) {
        this.sqid = sqid;
        this.fullName = fullName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.rnltd = rnltd;
        this.grade = grade;
        this.gainingPas = gainingPas;
        this.dafsc = dafsc.replaceAll("-", "");
        this.dor = dor;
        this.dateDepLastDutyStn = dateDepLastDutyStn;
        this.sponsorId = sponsorId;
        this.losingPas = losingPas;
        this.lastUpdated = lastUpdated;
    }

    public Gaining(String sqid, String fullName, String firstName, String lastName, Date rnltd, String grade, String gainingPas, Date projectedArrivalDate, String dafsc, String cellPhone, String email, Date dor, Date dateArrivedStation, String projectedBilletId, Date dateDepLastDutyStn,String sponsorId, String losingPas, String projectedOfficeSymbol, Date lastUpdated) {
        this.sqid = sqid;
        this.fullName = fullName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.rnltd = rnltd;
        this.grade = grade;
        this.gainingPas = gainingPas;
        this.projectedArrivalDate = projectedArrivalDate;
        this.dafsc = dafsc;
        this.cellPhone = cellPhone;
        this.email = email;
        this.dor = dor;
        this.dateArrivedStation = dateArrivedStation;
        this.projectedBilletId = projectedBilletId;
        this.dateDepLastDutyStn = dateDepLastDutyStn;
        this.sponsorId = sponsorId;
        this.losingPas = losingPas;
        this.projectedOfficeSymbol = projectedOfficeSymbol;
        this.lastUpdated = lastUpdated;
    }

    public Gaining update(GainingJSON json) {
        this.setSqid(json.getSqid());
        this.setFullName(json.getFullName());
        this.setFirstName(json.getFirstName());
        this.setLastName(json.getLastName());
        this.setRnltd(json.getRnltd());
        this.setGrade(json.getGrade());
        this.setGainingPas(json.getGainingPas());
        this.setProjectedArrivalDate(json.getProjectedArrivalDate());
        this.setDafsc(json.getDafsc());
        this.setCellPhone(json.getCellPhone());
        this.setEmail(json.getEmail());
        this.setDor(json.getDor());
        this.setDateArrivedStation(json.getDateArrivedStation());
        this.setProjectedBilletId(json.getProjectedBilletId());
        this.setDateDepLastDutyStn(json.getDateDepLastDutyStn());
        this.setSponsorId(json.getSponsorId());
        this.setLosingPas(json.getLosingPas());
        this.setProjectedOfficeSymbol(json.getProjectedOfficeSymbol());
        this.setLastUpdated(json.getLastUpdated());
        return this;
    }

    public List<String> compare(Gaining importingMember) throws NullPointerException {
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
            if (!this.rnltd.equals(importingMember.rnltd)) {
                if (this.rnltd == null && importingMember.rnltd == null) {

                } else {
                diff.add("rnltd");
                }
            }
        } catch (NullPointerException e) {
            if (this.rnltd == null && importingMember.rnltd == null) {

            } else {
                diff.add("rnltd");
            }
        }

        try {
            if (!this.grade.equals(importingMember.grade))
                diff.add("grade");
        } catch (NullPointerException e) {
            diff.add("grade");
        }

        try {
            if (!this.gainingPas.equals(importingMember.gainingPas))
                diff.add("gainingPas");
        } catch (NullPointerException e) {
            diff.add("gainingPas");
        }

        try {
            if (!this.dafsc.equals(importingMember.dafsc))
                diff.add("dafsc");
        } catch (NullPointerException e) {
            diff.add("dafsc");
        }

        try {
            if (!this.dor.equals(importingMember.dor)) {
                if (this.dor == null && importingMember.dor == null) {

                } else {
                    diff.add("dor");
                }
            }
        } catch (NullPointerException e) {
            if (this.dor == null && importingMember.dor == null) {

            } else {
                diff.add("dor");
            }
        }

        try {
            if (!this.dateDepLastDutyStn.equals(importingMember.dateDepLastDutyStn)) {
                if (this.dateDepLastDutyStn == null && importingMember.dateDepLastDutyStn == null) {

                } else {
                    diff.add("dateDepLastDutyStn");
                }
            }

        } catch (NullPointerException e) {
            if (this.dateDepLastDutyStn == null && importingMember.dateDepLastDutyStn == null) {

            } else {
                diff.add("dateDepLastDutyStn");
            }
        }

        try {
            if (!this.sponsorId.equals(importingMember.sponsorId))
                diff.add("sponsorId");
        } catch (NullPointerException e) {
            if (!(this.sponsorId == null && importingMember.sponsorId == null)) {
                diff.add("sponsorId");
            }
        }
System.out.println(diff);
        return diff;
    }

    private Date convertDate(Date item) {
        if (item != null) {
            System.out.println(item + " -> " + new LocalDate(item).toDate());
            return new LocalDate(item).toDate();
        } else {
            return null;
        }
    }

}

package squadron.manager.turbine.gaining;

import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.text.SimpleDateFormat;
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
    private String fullName;
    private String firstName;
    private String lastName;
    private Date rnltd;
    private String grade;
    private String gainingPas;
    private Date projectedArrivalDate;
    private String dafsc;
    private String cellPhone;
    private String email;
    private Date dor;
    private Date dateArrivedStation;
    private String projectedBilletId;
    private Date dateDepLastDutyStn;
    private String sponsorId;
    private String losingPas;
    private String projectedOfficeSymbol;
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
        SimpleDateFormat oldformat = new SimpleDateFormat("MMM dd HH:mm:ss z yyyy");
        SimpleDateFormat newformat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss.S");

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
            if (this.projectedArrivalDate.getTime() != importingMember.projectedArrivalDate.getTime()) {
                if (this.projectedArrivalDate == null && importingMember.projectedArrivalDate == null) {
                } else {
                    diff.add("projectedArrivalDate");
                }
            }
        } catch (NullPointerException e) {
            if (this.projectedArrivalDate == null && importingMember.projectedArrivalDate == null) {

            } else {
                diff.add("projectedArrivalDate");
            }
        }

        try {
            if (!this.dafsc.equals(importingMember.dafsc))
                diff.add("dafsc");
        } catch (NullPointerException e) {
            diff.add("dafsc");
        }

        try {
            if (this.cellPhone != importingMember.cellPhone) {
                if (this.cellPhone == null && importingMember.cellPhone == null) {
                } else {
                    diff.add("cellPhone");
                }
            }
        } catch (NullPointerException e) {
            if (this.cellPhone == null && importingMember.cellPhone == null) {

            } else {
                diff.add("cellPhone");
            }
        }

        try {
            if (this.email != importingMember.email) {
                if (this.email == null && importingMember.email == null) {
                } else {
                    diff.add("email");
                }
            }
        } catch (NullPointerException e) {
            if (this.email == null && importingMember.email == null) {

            } else {
                diff.add("email");
            }
        }

        try {
            if (this.dor.getTime() != importingMember.dor.getTime()) {
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
            if (this.dateArrivedStation.getTime() != importingMember.dateArrivedStation.getTime()) {
                if (this.dateArrivedStation == null && importingMember.dateArrivedStation == null) {
                } else {
                    diff.add("dateArrivedStation");
                }
            }
        } catch (NullPointerException e) {
            if (this.dateArrivedStation == null && importingMember.dateArrivedStation == null) {

            } else {
                diff.add("dateArrivedStation");
            }
        }

        try {
            if (this.projectedBilletId != importingMember.projectedBilletId) {
                if (this.projectedBilletId == null && importingMember.projectedBilletId == null) {
                } else {
                    diff.add("projectedBilletId");
                }
            }
        } catch (NullPointerException e) {
            if (this.projectedBilletId == null && importingMember.projectedBilletId == null) {

            } else {
                diff.add("projectedBilletId");
            }
        }

        try {
            if (this.dateDepLastDutyStn.getTime() != importingMember.dateDepLastDutyStn.getTime()) {
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
            if (!this.sponsorId.equals(importingMember.sponsorId)) {
                if (this.sponsorId == null && importingMember.sponsorId == null) {
                } else {
                    diff.add("sponsorId");
                }
            }
        } catch (NullPointerException e) {
            if (this.sponsorId == null && importingMember.sponsorId == null) {

            } else {
                diff.add("sponsorId");
            }
        }

        try {
            if (this.projectedOfficeSymbol != importingMember.projectedOfficeSymbol) {
                if (this.projectedOfficeSymbol == null && importingMember.projectedOfficeSymbol == null) {
                } else {
                    diff.add("projectedOfficeSymbol");
                }
            }
        } catch (NullPointerException e) {
            if (this.projectedOfficeSymbol == null && importingMember.projectedOfficeSymbol == null) {

            } else {
                diff.add("projectedOfficeSymbol");
            }
        }
        return diff;
    }
}

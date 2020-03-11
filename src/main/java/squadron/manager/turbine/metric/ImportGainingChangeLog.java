package squadron.manager.turbine.metric;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.joda.time.LocalDate;
import squadron.manager.turbine.gaining.Gaining;

import javax.persistence.*;
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
                String sqid,
                Date importDatetime,
                String field,
                String oldData,
                String newData
        ) {
            this.sqid = sqid;
            this.importDateTime = importDatetime;
            this.field = field;
            this.oldData = oldData;
            this.newData = newData;
        }

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
                        this.oldData = verifyDate(oldGaining.getRnltd()).toString();
                    }

                    if (newGaining.getRnltd() == null) {
                        this.newData = "not set";
                    } else {
                        this.newData = newGaining.getRnltd().toString();
                    }
                    break;

                case "grade":
                    this.oldData = oldGaining.getGrade();
                    this.newData = newGaining.getGrade();
                    break;

                case "dafsc":
                    this.oldData = oldGaining.getDafsc();
                    this.newData = newGaining.getDafsc();
                    break;
                case "dor":
                    if (oldGaining.getDor() == null) {
                        this.oldData = "not set";
                    } else {
                        this.oldData = verifyDate(oldGaining.getDor()).toString();
                    }

                    if (newGaining.getDor() == null) {
                        this.newData = null;
                    } else {
                        this.newData = newGaining.getDor().toString();
                    }
                    break;
                case "dateDepLastDutyStn":
                    if (oldGaining.getDateDepLastDutyStn() == null) {
                        this.oldData = "not set";
                    } else {
                        this.oldData = verifyDate(oldGaining.getDateDepLastDutyStn()).toString();
                    }

                    if (newGaining.getDateDepLastDutyStn() == null) {
                        this.newData = "not set";
                    } else {
                        this.newData = newGaining.getDateDepLastDutyStn().toString();
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

                default:
                    break;
            }
        }

        private Date verifyDate(Date item) {
            if (item != null) {
                return new LocalDate(item).toDate();
            } else {
                return null;
            }
        }
}

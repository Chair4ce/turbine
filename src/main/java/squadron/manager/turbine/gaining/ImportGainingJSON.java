package squadron.manager.turbine.gaining;

import lombok.*;

import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ImportGainingJSON {
    private Long id;
    private String sqid;
    private String fullName;
    private String firstName;
    private String lastName;
    private String rnltd;
    private String grade;
    private String gainingPas;
    private String projectedArrivalDate;
    private String dafsc;
    private String cellPhone;
    private String email;
    private String dor;
    private String dateArrivedStation;
    private String projectedBilletId;
    private String dateDepLastDutyStn;
    private String sponsorId;
    private String losingPas;
    private String projectedOfficeSymbol;
    private Date lastUpdated;
}

package squadron.manager.turbine.gaining;

import lombok.*;

import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class GainingJSON {

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

    private String sponsorName;

    private String losingPas;

    private String projectedOfficeSymbol;

    private Date lastUpdated;
}

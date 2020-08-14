package squadron.manager.turbine.member;

import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class GainingMemberJSON {

    private Long id;

    private String gainingPas;

    private String mbrId;

    private String fullName;

    private String grade;

    private String losingPas;

    private String losingPasCleartext;

    private String dafsc;

    private String sponsorId;

    private Date dor;

    private Date dos;

    private Date rnltd;

    private Date lastUpdated;
}

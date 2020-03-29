package squadron.manager.turbine.member;

import lombok.*;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MemberJSON {
    private Long id;
    private String sqid;
    private String fullName;
    private String firstName;
    private String lastName;
    private Date tafmsd;
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
    private Date rnltd;
    private Date dor;
    private Date lastUpdated;
}

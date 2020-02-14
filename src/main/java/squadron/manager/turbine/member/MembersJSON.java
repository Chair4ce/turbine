package squadron.manager.turbine.member;


import lombok.*;

import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MembersJSON {

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

    private Date dor;
}

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

    private String full_name;

    private String grade;

    private String assigned_pas;

    private String dafsc;

    private String office_symbol;

    private String duty_title;

    private Date duty_start_date;

    private String duty_phone;

    private String supv_name;

    private Date supv_begin_date;

    private Date date_arrived_station;

    private Date dor;
}

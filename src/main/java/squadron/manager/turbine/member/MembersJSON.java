package squadron.manager.turbine.member;


import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;


@NoArgsConstructor
@Data

public class MembersJSON {

    private static final String emptyFieldMessage = "This is required";

    private Long id;
    private String ssan;

    private String full_name;

    private String grade;

    private String assigned_pas;

    private String dafsc;

    private String office_symbol;

    private String duty_title;

    private Timestamp duty_start_date;

    private String duty_phone;

    private String supv_name;

    private Timestamp supv_begin_date;

    private Timestamp date_arrived_station;

    private Timestamp dor;

    public MembersJSON(Long id, String ssan, String full_name, String grade, String assigned_pas, String dafsc, String office_symbol, String duty_title, Timestamp duty_start_date, String duty_phone, String supv_name, Timestamp supv_begin_date, Timestamp date_arrived_station, Timestamp dor) {
        this.id = id;
        this.ssan = ssan;
        this.full_name = full_name;
        this.grade = grade;
        this.assigned_pas = assigned_pas;
        this.dafsc = dafsc;
        this.office_symbol = office_symbol;
        this.duty_title = duty_title;
        this.duty_start_date = duty_start_date;
        this.duty_phone = duty_phone;
        this.supv_name = supv_name;
        this.supv_begin_date = supv_begin_date;
        this.date_arrived_station = date_arrived_station;
        this.dor = dor;
    }
}

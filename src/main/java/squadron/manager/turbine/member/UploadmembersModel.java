package squadron.manager.turbine.member;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.joda.time.LocalDate;

import javax.persistence.*;
import java.util.Date;

@NoArgsConstructor
@Entity
@Data
@Table(name = "members")
public
class UploadmembersModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String ssan;

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

    public UploadmembersModel(String ssan, String full_name, String grade, String assigned_pas, String dafsc, String office_symbol, String duty_title, Date duty_start_date, String duty_phone, String supv_name, Date supv_begin_date, Date date_arrived_station, Date dor) {
        this.ssan = ssan;
        this.full_name = full_name;
        this.grade = grade;
        this.assigned_pas = assigned_pas;
        this.dafsc = dafsc;
        this.office_symbol = office_symbol;
        this.duty_title = duty_title;
        this.duty_start_date = new LocalDate(duty_start_date).toDate();
        this.duty_phone = duty_phone;
        this.supv_name = supv_name;
        this.supv_begin_date = new LocalDate(supv_begin_date).toDate();
        this.date_arrived_station = new LocalDate(date_arrived_station).toDate();
        this.dor = new LocalDate(dor).toDate();
    }

    public UploadmembersModel update(MembersJSON json) {
        this.setSsan(json.getSsan());
        this.setFull_name(json.getFull_name());
        this.setGrade(json.getGrade());
        this.setAssigned_pas(json.getAssigned_pas());
        this.setOffice_symbol(json.getOffice_symbol());
        this.setDafsc(json.getDafsc());
        this.setDuty_phone(json.getDuty_phone());
        this.setDuty_start_date(json.getDuty_start_date());
        this.setDuty_title(json.getDuty_title());
        this.setSupv_name(json.getSupv_name());
        this.setSupv_begin_date(json.getSupv_begin_date());
        this.setDate_arrived_station(json.getDate_arrived_station());
        return this;
    }
}

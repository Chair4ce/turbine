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
public class MemberModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

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

    public MemberModel(Integer sqid, Date tafmsd, String full_name, String grade, String assigned_pas, String dafsc, String office_symbol, String duty_title, Date duty_start_date, String duty_phone, String supv_name, Date supv_begin_date, Date date_arrived_station, Date dor) {
        this.sqid = sqid;
        this.tafmsd = verifyDate(tafmsd);
        this.full_name = full_name;
        this.grade = grade;
        this.assigned_pas = assigned_pas;
        this.dafsc = dafsc;
        this.office_symbol = office_symbol;
        this.duty_title = duty_title;
        this.duty_start_date = verifyDate(duty_start_date);
        this.duty_phone = duty_phone;
        this.supv_name = supv_name;
        this.supv_begin_date = verifyDate(supv_begin_date);
        this.date_arrived_station = verifyDate(date_arrived_station);
        this.dor = verifyDate(dor);
    }

    public MemberModel update(MembersJSON json) {
        this.setSqid(json.getSqid());
        this.setTafmsd(json.getTafmsd());
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


    private Date verifyDate(Date item) {
        if (item != null){
            return new LocalDate(item).toDate();
        } else {
            return null;
        }
    }
}

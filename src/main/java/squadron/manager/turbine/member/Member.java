package squadron.manager.turbine.member;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Entity
@Data
@Table(name = "members")
public
class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String full_name;

    private String grade;

    private String assigned_pas;

    private String dafsc;

    private String office_symbol;

    private String duty_title;

    private String duty_start_date;

    private String duty_phone;

    private String awardec_status;

    private String epr_opr_status;


    public Member( String full_name, String grade, String assigned_pas, String dafsc, String office_symbol,
                      String duty_title, String duty_start_date, String duty_phone, String awardec_status, String epr_opr_status) {

        this.full_name = full_name;
        this.grade = grade;
        this.assigned_pas = assigned_pas;
        this.dafsc = dafsc;
        this.office_symbol = office_symbol;
        this.duty_title = duty_title;
        this.duty_start_date = duty_start_date;
        this.duty_phone = duty_phone;
        this.awardec_status = awardec_status;
        this.epr_opr_status = epr_opr_status;
    }

    public Member update(MemberJSON json) {
        this.setId(json.getId());
        this.setFull_name(json.getFull_name());
        this.setGrade(json.getGrade());
        this.setAssigned_pas(json.getAssigned_pas());
        this.setOffice_symbol(json.getOffice_symbol());
        this.setDafsc(json.getDafsc());
        this.setDuty_phone(json.getDuty_phone());
        this.setDuty_start_date(json.getDuty_start_date());
        this.setDuty_title(json.getDuty_title());
        this.setAwardec_status(json.getAwardec_status());
        this.setEpr_opr_status(json.getEpr_opr_status());
        return this;
    }
}

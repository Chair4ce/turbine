package squadron.manager.turbyne.member;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name = "members")
public
class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

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


    public Member(String full_name, String grade, String assigned_pas, String dafsc, String office_symbol,
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
}

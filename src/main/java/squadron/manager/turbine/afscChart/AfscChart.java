package squadron.manager.turbine.afscChart;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@NoArgsConstructor
@Entity
@Data
@Table(name = "afsc_chart")
@DynamicUpdate
public class AfscChart {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private Long id;
    private String afsc;
    private int assigned;
    private int authorized;
    private int month;
    private int year;
    private String manning;

    public AfscChart(Long id, String afsc, int assigned, int authorized, int month, int year, String manning) {
        this.id = id;
        this.afsc = afsc;
        this.assigned = assigned;
        this.authorized = authorized;
        this.month = month;
        this.year = year;
        this.manning = manning;
    }

    public AfscChart(String afsc, int assigned, int authorized, int month, int year, String manning) {
        this.afsc = afsc;
        this.assigned = assigned;
        this.authorized = authorized;
        this.month = month;
        this.year = year;
        this.manning = manning;
    }
}

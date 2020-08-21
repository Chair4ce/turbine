package squadron.manager.turbine.afscChart;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AfscChartJSON {

    private Long id;
    private String afsc;
    private int assigned;
    private int authorized;
    private int month;
    private int year;
    private String manning;
}

package squadron.manager.turbine.manningChart;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;


@Getter
@Setter
public class AFSCManningChartData {
    private String afsc;
    private String month;
    private String value;


    public AFSCManningChartData(String afsc, String month, String value) {
        this.afsc = afsc;
        this.month = month;
        this.value = value;
    }
}

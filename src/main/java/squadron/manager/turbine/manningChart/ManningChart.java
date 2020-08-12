package squadron.manager.turbine.manningChart;

import lombok.*;

import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ManningChart {
    private String afsc;
    private Number current;
    private Number authorized;
}

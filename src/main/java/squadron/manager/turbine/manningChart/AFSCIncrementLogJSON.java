package squadron.manager.turbine.manningChart;

import lombok.*;

import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AFSCIncrementLogJSON {

    private Long id;
    private String pasCode;
    private String mbrId;
    private String afsc;
    private Date incrementDate;
    private double incrementChange;
    private String incrementType;
}

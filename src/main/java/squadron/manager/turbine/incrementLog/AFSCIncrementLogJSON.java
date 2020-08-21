package squadron.manager.turbine.incrementLog;

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
    private String itemId;
    private String afsc;
    private Date incrementDate;
    private int month;
    private int year;
    private double incrementChange;
    private String incrementType;
}

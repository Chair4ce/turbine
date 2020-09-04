package squadron.manager.turbine.doubleBilleted;


import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DoubleBilletedJSON {
    private Long id;
    private String pasCode;
    private String posNr;
    private String nameAssigned;
    private String mbrIdAssigned;
    private Date lastUpdated;
}

package squadron.manager.turbine.unAssigned;


import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UnassignedJSON {
    private Long id;
    private String mbrId;
    private String fullName;
    private String dafsc;
    private String grade;
    private Date lastUpdated;
}

package squadron.manager.turbine.position;

import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProjectedAFSCManningJSON {
    private Date date;
    private int assigned;
    private int authorized;
}

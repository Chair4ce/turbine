package squadron.manager.turbine.position;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProjectedAFSCManning {
    private Date date;
    private int assigned;
    private int authorized;
}

package squadron.manager.turbine.position;

import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AFSCHealth {
    private Long id;
    private String AFSC;
    private String manning;
}

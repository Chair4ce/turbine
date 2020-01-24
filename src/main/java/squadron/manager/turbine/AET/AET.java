package squadron.manager.turbine.AET;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name = "AET")
public class AET {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String org_id;
    private String pas_Code;

    public AET(String org_id, String PAS_Code) {
        this.org_id = org_id;
        this.pas_Code = PAS_Code;
    }
}

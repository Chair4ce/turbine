package squadron.manager.turbine.squadron;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name = "squadron")
public class Squadron {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String squadron;
    private String pas_Code;
    private String group_PAS;

    public Squadron(String squadron, String PAS_Code, String group_PAS) {
        this.squadron = squadron;
        this.pas_Code = PAS_Code;
        this.group_PAS = group_PAS;
    }
}

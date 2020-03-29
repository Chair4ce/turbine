package squadron.manager.turbine.squadron;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name = "Squadron")
public class Squadron {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String squadron;
    private String pas;
    private String group_pas;

    public Squadron(String squadron, String pas, String group_pas) {
        this.squadron = squadron;
        this.pas = pas;
        this.group_pas = group_pas;
    }
}

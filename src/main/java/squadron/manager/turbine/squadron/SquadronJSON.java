package squadron.manager.turbine.squadron;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SquadronJSON {

    private static  final String emptyFieldMessage = "This is required";

    private long id;
    private String squadron;
    private String pas;
    private String group_pas;

    public SquadronJSON(String squadron, String pas, String group_pas) {
        this.squadron = squadron;
        this.pas = pas;
        this.group_pas = group_pas;
    }
}

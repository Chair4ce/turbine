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
    private String pas_Code;
    private String group_PAS;

    public SquadronJSON(String squadron, String pas_Code, String group_PAS) {
        this.squadron = squadron;
        this.pas_Code = pas_Code;
        this.group_PAS = group_PAS;
    }
}

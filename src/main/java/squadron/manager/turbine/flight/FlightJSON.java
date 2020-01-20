package squadron.manager.turbine.flight;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FlightJSON {

    private static final String emptyFieldMessage = "This is required";

    private long id;
    private String org_id;
    private String pas_Code;

    public FlightJSON(String org_id, String pas_Code) {
        this.org_id = org_id;
        this.pas_Code = pas_Code;
    }
}

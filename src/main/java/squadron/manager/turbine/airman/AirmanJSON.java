package squadron.manager.turbine.airman;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.NotEmpty;
import squadron.manager.turbine.rank.grade;

import javax.validation.constraints.Min;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AirmanJSON {
    private static final String emptyFieldMessage = "This field is required.";

    private Long id;

    @Min(value = 0L, message = emptyFieldMessage)
    private Long flightId;

    @NotEmpty(message = emptyFieldMessage)
    private String firstName;

    @NotEmpty(message = emptyFieldMessage)
    private String lastName;

    private String remarks;

    private grade grade;

    public AirmanJSON(
            Long id,
            Long flightId,
            String firstName,
            String lastName,
            String remarks
    ) {
        this.id = id;
        this.flightId = flightId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.remarks = remarks;
    }
}

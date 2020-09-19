package squadron.manager.turbine.flight;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FlightJSON {
  private static final String emptyFieldMessage = "This field is required.";

  private Long id;

  @NotNull(message = emptyFieldMessage)
  private String name;

  private Long squadronId;
}

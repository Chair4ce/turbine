package squadron.manager.turbine.airman;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.NotNull;
import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AirmanSkillJSON {
  private static final String emptyFieldMessage = "This field is required.";

  private Long id;

  @NotNull
  private Long skillId;

  @NotNull(message = emptyFieldMessage)
  private Instant earnDate;

  @NotNull(message = emptyFieldMessage)
  private Instant periodicDue;

  @NotNull(message = emptyFieldMessage)
  private Instant currencyExpiration;

  @NotNull(message = emptyFieldMessage)
  private Instant lastSat;

  public AirmanSkillJSON(
    Long skillId,
    Instant earnDate,
    Instant periodicDue,
    Instant currencyExpiration,
    Instant lastSat) {
    this.skillId = skillId;
    this.earnDate = earnDate;
    this.periodicDue = periodicDue;
    this.currencyExpiration = currencyExpiration;
    this.lastSat = lastSat;
  }

  @AssertTrue(message = "End Date cannot be before Start Date.")
  public boolean isValidDateRange() {
    if (this.periodicDue != null && this.earnDate != null) {
      return this.periodicDue.compareTo(this.earnDate) >= 0;
    } else {
      return true;
    }
  }
}

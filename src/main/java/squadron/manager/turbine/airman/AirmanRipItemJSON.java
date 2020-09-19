package squadron.manager.turbine.airman;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mil.af.us.narwhal.rip_item.RipItem;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AirmanRipItemJSON {
  private Long id;
  private Long airmanId;
  private RipItem ripItem;
  private Instant expirationDate;
}

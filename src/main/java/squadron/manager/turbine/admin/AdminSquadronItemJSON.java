package squadron.manager.turbine.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminSquadronItemJSON {
  private Long siteId;
  private String siteName;
  private Long squadronId;
  private String squadronName;
  private Long airmenCount;
}

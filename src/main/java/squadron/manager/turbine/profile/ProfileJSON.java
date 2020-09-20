package squadron.manager.turbine.profile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileJSON {
  private Long id;
  private String username;
  private Long siteId;
  private String siteName;
  private Long roleId;
  private String roleName;
  private Long squadronId;

  public ProfileJSON(
    Long id,
    String username,
    Long siteId,
    Long squadronId,
    String siteName,
    Long roleId,
    String roleName
  ) {
    this.id = id;
    this.username = username;
    this.siteId = siteId;
    this.squadronId = squadronId;
    this.siteName = siteName;
    this.roleId = roleId;
    this.roleName = roleName;
  }
}

package squadron.manager.turbine.config;

import org.springframework.boot.autoconfigure.security.oauth2.resource.PrincipalExtractor;
import squadron.manager.turbine.profile.ProfileService;

import java.util.Map;

public class GeoAxisPrincipalExtractor implements PrincipalExtractor {
  private ProfileService profileService;

  public GeoAxisPrincipalExtractor(ProfileService profileService) {
    this.profileService = profileService;
  }

  @Override
  public Object extractPrincipal(Map<String, Object> map) {
    return profileService.getProfile((String) map.get("user_name"));
  }
}

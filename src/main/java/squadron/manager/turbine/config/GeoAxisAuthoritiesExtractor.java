package squadron.manager.turbine.config;

import org.springframework.boot.autoconfigure.security.oauth2.resource.AuthoritiesExtractor;
import org.springframework.security.core.GrantedAuthority;
import squadron.manager.turbine.profile.ProfileService;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class GeoAxisAuthoritiesExtractor implements AuthoritiesExtractor {
  private ProfileService profileService;

  public GeoAxisAuthoritiesExtractor(ProfileService profileService) {
    this.profileService = profileService;
  }

  @Override
  public List<GrantedAuthority> extractAuthorities(Map<String, Object> map) {
    return new ArrayList<>(profileService.getProfile((String) map.get("user_name")).getAuthorities());
  }
}

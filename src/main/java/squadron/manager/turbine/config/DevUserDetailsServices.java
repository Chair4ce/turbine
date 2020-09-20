package squadron.manager.turbine.config;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import squadron.manager.turbine.profile.Profile;
import squadron.manager.turbine.profile.ProfileService;

@org.springframework.context.annotation.Profile({"!cloud", "!prod"})
@Service
public class DevUserDetailsServices implements UserDetailsService {
  private ProfileService profileService;

  public DevUserDetailsServices(ProfileService profileService) {
    this.profileService = profileService;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Profile profile = profileService.getProfile(username);
    profile.setPassword("password");
    return profile;
  }
}

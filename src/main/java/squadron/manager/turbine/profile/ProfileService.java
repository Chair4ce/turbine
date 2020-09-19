package squadron.manager.turbine.profile;

import org.springframework.stereotype.Service;
import squadron.manager.turbine.site.Site;
import squadron.manager.turbine.site.SiteRepository;
import squadron.manager.turbine.squadron.Squadron;

import java.util.List;

@Service
public class ProfileService {
  private ProfileRepository profileRepository;
  private RoleRepository roleRepository;
  private SiteRepository siteRepository;

  public ProfileService(
    ProfileRepository profileRepository,
    RoleRepository roleRepository,
    SiteRepository siteRepository
  ) {
    this.profileRepository = profileRepository;
    this.roleRepository = roleRepository;
    this.siteRepository = siteRepository;
  }

  public List<Profile> getAllProfiles() {
    return profileRepository.findAll();
  }

  public Profile getProfile(String username) {
    Profile profile = profileRepository.findOneByUsername(username);
    if (profile == null) {
      final Role role = roleRepository.findByName(RoleName.READER);
      profile = profileRepository.save(new Profile(username, role));
    }
    return profile;
  }

  public Profile setSite(Profile profile, Long siteId) {
    final Site site = siteRepository.findOne(siteId);
    if (site != null) {
      profile.setSite(site);
    }
    return profileRepository.save(profile);
  }

  public Profile update(ProfileJSON json) {
    Profile profile = profileRepository.findOne(json.getId());
    if (profile == null) {
      return null;
    }

    final Role role = roleRepository.findOne(json.getRoleId());
    if (role != null) {
      profile.setRole(role);
    }

    return profileRepository.save(profile);
  }

  public Profile setSiteAndSquadron(Profile profile, Long siteId, Long squadronId) {
    final Site site = siteRepository.findOne(siteId);

    if (site != null) {
      profile.setSite(site);
      for (Squadron squadron : site.getSquadrons()) {
        if (squadron.getId().equals(squadronId)) {
          profile.setSquadronId(squadron.getId());
        }
      }
    }

    return profileRepository.save(profile);
  }

  public void resetSiteAndSquadron(Profile profile) {
    profile.setSquadronId(null);
    profile.setSite(null);
    profileRepository.save(profile);
  }
}

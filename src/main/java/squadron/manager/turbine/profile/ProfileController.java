package squadron.manager.turbine.profile;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(ProfileController.URI)
public class ProfileController {
  public static final String URI = "/api/profiles";

  private ProfileService profileService;
  private RoleRepository roleRepository;

  public ProfileController(ProfileService profileService, RoleRepository roleRepository) {
    this.profileService = profileService;
    this.roleRepository = roleRepository;
  }

  @GetMapping
  public List<ProfileJSON> index() {
    return this.profileService.getAllProfiles().stream()
      .map(Profile::toProfileJSON)
      .collect(Collectors.toList());
  }

  @GetMapping(path = "/me")
  public ProfileJSON show(@AuthenticationPrincipal Profile profile) {
    return profile.toProfileJSON();
  }

  @DeleteMapping(path = "/me")
  public void deleteProfile(@AuthenticationPrincipal Profile profile) {
    this.profileService.resetSiteAndSquadron(profile);
  }

  @PutMapping(path = "/me")
  public ProfileJSON setSite(
    @AuthenticationPrincipal Profile profile,
    @RequestParam Long siteId,
    @RequestParam(value = "squadronId", required = false) Long squadronId
  ) {
    if (squadronId != null) {
      profile = this.profileService.setSiteAndSquadron(profile, siteId, squadronId);
      ProfileJSON profileJSON = profile.toProfileJSON();
      profileJSON.setSquadronId(profile.getSquadronId());
      return profileJSON;
    } else {
      return this.profileService.setSite(profile, siteId).toProfileJSON();
    }
  }

  @PutMapping
  public ResponseEntity<ProfileJSON> update(@RequestBody ProfileJSON json) {
    Profile profile = profileService.update(json);
    return profile != null ?
      new ResponseEntity<>(profile.toProfileJSON(), HttpStatus.OK) :
      new ResponseEntity<>(HttpStatus.BAD_REQUEST);
  }

  @GetMapping(path = "/roles")
  public List<Role> getRoles() {
    return roleRepository.findAll();
  }
}

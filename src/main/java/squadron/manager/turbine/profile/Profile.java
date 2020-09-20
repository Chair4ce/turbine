package squadron.manager.turbine.profile;

import com.fasterxml.jackson.annotation.JsonIgnoreType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import squadron.manager.turbine.site.Site;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreType
public class Profile implements UserDetails {
  @Id
  @GeneratedValue
  private Long id;

  @Column(unique = true, nullable = false)
  private String username;

  @ManyToOne
  @JoinColumn(name = "site_id")
  private Site site;

  private Long squadronId;

  @ManyToOne
  @JoinColumn(name = "role_id", nullable = false)
  private Role role;

  @Transient
  private String password;

  public Profile(String username, Role role) {
    this.username = username;
    this.role = role;
  }

  public Profile(String username, String password, Role role) {
    this.password = password;
    this.role = role;
    this.username = username;
  }

  public Profile(String username, Site site) {
    this.username = username;
    this.site = site;
  }

  public Profile(String username, Site site, Long squadronId) {
    this.username = username;
    this.site = site;
    this.squadronId = squadronId;
  }

  public Profile(String username, Site site, Role role) {
    this.username = username;
    this.site = site;
    this.role = role;
  }

  public Profile(long id, String username, Role role) {
    this.id = id;
    this.username = username;
    this.role = role;
  }

  public Profile(String username, Site site, Role role, String password) {
    this.username = username;
    this.site = site;
    this.role = role;
    this.password = password;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return AuthorityUtils.createAuthorityList(role.getFullName());
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  public ProfileJSON toProfileJSON() {
    final Long siteId = site == null ? null : site.getId();
    final String siteName = site == null ? "" : site.getFullName();
    return new ProfileJSON(
      id,
      username,
      siteId,
      squadronId,
      siteName,
      role.getId(),
      role.getName().name()
    );
  }
}

package squadron.manager.turbine.site;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.NoArgsConstructor;
import mil.af.us.narwhal.squadron.Squadron;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Site {
  @Id
  @GeneratedValue
  private Long id;

  private String name;

  @Enumerated(EnumType.STRING)
  private SiteType siteType;

  private String fullName;

  @OneToMany(mappedBy = "site", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  @JsonManagedReference
  private List<Squadron> squadrons = new ArrayList<>();

  public Site(Long id, String name, List<Squadron> squadrons) {
    this.id = id;
    this.name = name;
    this.squadrons = new ArrayList<>(squadrons);
  }

  public Site(String name) {
    this(null, name, new ArrayList<>());
  }

  public void addSquadron(Squadron squad) {
    squad.setSite(this);
    this.squadrons.add(squad);
  }
}

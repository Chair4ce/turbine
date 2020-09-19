package squadron.manager.turbine.squadron;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.NoArgsConstructor;
import squadron.manager.turbine.flight.Flight;
import squadron.manager.turbine.site.Site;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static java.util.Collections.emptyList;

@Entity
@Data
@NoArgsConstructor
public class Squadron {
  @Id
  @GeneratedValue
  private Long id;

  @ManyToOne
  @JsonBackReference
  private Site site;

  private String name;

  @OneToMany(mappedBy = "squadron", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  @JsonManagedReference
  List<Flight> flights = new ArrayList<>();

  public Squadron(Long id, Site site, String name, List<Flight> flights) {
    this.id = id;
    this.site = site;
    this.name = name;
    this.flights = new ArrayList<>(flights);
  }

  public Squadron(String name) {
    this(null, null, name, emptyList());
  }

  public void addFlight(Flight flight) {
    flight.setSquadron(this);
    this.flights.add(flight);
  }

  @Override
  public String toString() {
    return "Squadron{" +
      "id=" + id +
      ", site=" + site.getId() +
      ", name='" + name + '\'' +
      ", flights=" + flights +
      '}';
  }
}

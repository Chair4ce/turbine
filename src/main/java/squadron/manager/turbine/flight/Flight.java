package squadron.manager.turbine.flight;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import squadron.manager.turbine.airman.Airman;
import squadron.manager.turbine.squadron.Squadron;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Flight {
  @Id
  @GeneratedValue
  private Long id;

  @NotNull
  @ManyToOne
  @JsonIgnore
  private Squadron squadron;

  @OneToMany(mappedBy = "flight", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @JsonIgnore
  private List<Airman> airmen;

  private String name;

  public Flight(String name) {
    this.name = name;
  }

  public Flight(Squadron squadron, String name) {
    this.squadron = squadron;
    this.name = name;
  }

  @Override
  public String toString() {
    return "Flight{" +
      "id=" + id +
      ", squadronId=" + squadron.getId() +
      ", name='" + name + '\'' +
      '}';
  }

  @JsonProperty
  public Long squadronId(){
    return this.squadron != null
      ? this.squadron.getId()
      : null;
  }
}

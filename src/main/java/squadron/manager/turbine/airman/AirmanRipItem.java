package squadron.manager.turbine.airman;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mil.af.us.narwhal.rip_item.RipItem;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(
  name = "join_airman_rip_item",
  uniqueConstraints = {@UniqueConstraint(columnNames = {"airman_id", "rip_item_id"})}
)
public class AirmanRipItem {
  @Id
  @GeneratedValue
  private Long id;

  @ManyToOne
  @JoinColumn(name = "airman_id", referencedColumnName = "id", nullable = false)
  @JsonIgnore
  private Airman airman;

  @ManyToOne
  @JoinColumn(name = "rip_item_id", referencedColumnName = "id", nullable = false)
  private RipItem ripItem;

  private Instant expirationDate;

  public AirmanRipItem(RipItem ripItem) {
    this.ripItem = ripItem;
  }

  @JsonProperty
  public Long airmanId() {
    return this.airman.getId();
  }
}

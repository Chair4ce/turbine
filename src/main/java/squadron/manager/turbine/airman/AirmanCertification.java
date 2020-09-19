package squadron.manager.turbine.airman;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mil.af.us.narwhal.skill.Certification;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.Instant;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(
  name = "join_airman_certification",
  uniqueConstraints = {@UniqueConstraint(columnNames = {"airman_id", "certification_id"})}
)
public class AirmanCertification {
  @Id
  @GeneratedValue
  private Long Id;

  @Column(name = "airman_id", nullable = false)
  private Long airmanId;

  @ManyToOne
  @JoinColumn(name = "certification_id", referencedColumnName = "id", nullable = false)
  private Certification certification;

  @NotNull
  @Column(name = "earn_date")
  private Instant earnDate;

  @NotNull
  @Column(name = "periodic_due")
  private Instant periodicDue;

  @NotNull
  @Column(name = "currency_expiration")
  private Instant currencyExpiration;

  @NotNull
  @Column(name = "last_sat")
  private Instant lastSat;

  public AirmanCertification(
    Certification certification,
    Instant earnDate,
    Instant periodicDue,
    Instant currencyExpiration,
    Instant lastSat
  ) {
    this.certification = certification;
    this.earnDate = earnDate;
    this.periodicDue = periodicDue;
    this.currencyExpiration = currencyExpiration;
    this.lastSat = lastSat;
  }
}

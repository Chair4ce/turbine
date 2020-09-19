package squadron.manager.turbine.airman;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mil.af.us.narwhal.skill.Qualification;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.Instant;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(
  name = "join_airman_qualification",
  uniqueConstraints = {@UniqueConstraint(columnNames = {"airman_id", "qualification_id"})}
)
public class AirmanQualification {
  @Id
  @GeneratedValue
  private Long id;

  @Column(name = "airman_id", nullable = false)
  private Long airmanId;

  @ManyToOne
  @JoinColumn(name = "qualification_id", referencedColumnName = "id", nullable = false)
  private Qualification qualification;

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

  public AirmanQualification(Long airmanId, Qualification qualification, Instant earnDate, Instant periodicDue) {
    this.airmanId = airmanId;
    this.qualification = qualification;
    this.earnDate = earnDate;
    this.periodicDue = periodicDue;
  }

  public AirmanQualification(
    Qualification qualification,
    Instant earnDate,
    Instant periodicDue,
    Instant lastSat,
    Instant currencyExpiration
  ) {
    this.qualification = qualification;
    this.earnDate = earnDate;
    this.periodicDue = periodicDue;
    this.lastSat = lastSat;
    this.currencyExpiration = currencyExpiration;
  }
}

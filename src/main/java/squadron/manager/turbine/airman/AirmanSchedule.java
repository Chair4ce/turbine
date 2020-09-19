package squadron.manager.turbine.airman;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mil.af.us.narwhal.schedule.Schedule;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.Instant;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "join_airman_schedule")
public class AirmanSchedule {
  @Id
  @GeneratedValue
  private Long id;

  @NotNull
  @ManyToOne
  @JoinColumn(name = "airman_id", referencedColumnName = "id", nullable = false)
  @JsonIgnore
  private Airman airman;

  @ManyToOne
  @JoinColumn(name = "schedule_id", referencedColumnName = "id", nullable = false)
  private Schedule schedule;

  @NotNull
  @Column(name = "start_date")
  private Instant startDate;

  @Column(name = "end_date")
  private Instant endDate;

  public AirmanSchedule(Airman airman, Schedule schedule, Instant startDate) {
    this.airman = airman;
    this.schedule = schedule;
    this.startDate = startDate;
  }

  public AirmanSchedule(Schedule schedule, Instant startDate) {
    this.schedule = schedule;
    this.startDate = startDate;
  }

  @JsonProperty
  public Long airmanId() {
    return this.airman.getId();
  }
}


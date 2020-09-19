package squadron.manager.turbine.airman;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mil.af.us.narwhal.schedule.Schedule;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AirmenScheduleJSON {
  private Schedule schedule = new Schedule();
  private List<Long> airmanIds = new ArrayList<>();
}

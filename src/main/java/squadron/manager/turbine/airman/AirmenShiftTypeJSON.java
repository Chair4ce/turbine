package squadron.manager.turbine.airman;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AirmenShiftTypeJSON {
  private ShiftType shiftType;
  private List<Long> airmanIds = new ArrayList<>();
}

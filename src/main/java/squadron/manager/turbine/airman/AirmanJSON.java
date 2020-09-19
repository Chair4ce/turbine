package squadron.manager.turbine.airman;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mil.af.us.narwhal.event.Event;
import mil.af.us.narwhal.rank.Rank;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.Min;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AirmanJSON {
    private static final String emptyFieldMessage = "This field is required.";

    private Long id;

    @Min(value = 0L, message = emptyFieldMessage)
    private Long flightId;

    @NotEmpty(message = emptyFieldMessage)
    private String firstName;

    @NotEmpty(message = emptyFieldMessage)
    private String lastName;

    private String remarks;

    private Rank rank;

    private ShiftType shift;

    private List<AirmanQualification> qualifications = new ArrayList<>();

    private List<AirmanCertification> certifications = new ArrayList<>();

    private List<AirmanSchedule> schedules = new ArrayList<>();

    private List<Event> events = new ArrayList<>();

    public AirmanJSON(
            Long id,
            Long flightId,
            String firstName,
            String lastName,
            String remarks,
            ShiftType shift,
            List<AirmanQualification> qualifications,
            List<AirmanCertification> certifications,
            List<AirmanSchedule> schedules,
            List<Event> events
    ) {
        this.id = id;
        this.flightId = flightId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.remarks = remarks;
        this.shift = shift;
        this.qualifications = new ArrayList<>(qualifications);
        this.certifications = new ArrayList<>(certifications);
        this.schedules = new ArrayList<>(schedules);
        this.events = new ArrayList<>(events);
    }
}

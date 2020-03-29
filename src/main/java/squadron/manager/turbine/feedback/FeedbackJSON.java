package squadron.manager.turbine.feedback;

import lombok.*;

import java.util.Date;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
@Setter
public class FeedbackJSON {
    private Date date_time;
    private String feedback_entry;
}

package squadron.manager.turbine.feedback;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@NoArgsConstructor
@Data
public class FeedbackJSON {

    private Date date_time;
    private String feedback_entry;

    public FeedbackJSON(Date date_time, String feedback_entry) {
        this.date_time = date_time;
        this.feedback_entry = feedback_entry;
    }

    public String getFeedback_entry() {
        return feedback_entry;
    }
}

package squadron.manager.turbine.feedback;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private Date date_time;
    private String feedback_entry;


    public Feedback(Date date_time, String feedback_entry) {
        this.date_time = date_time;
        this.feedback_entry = feedback_entry;
    }
}

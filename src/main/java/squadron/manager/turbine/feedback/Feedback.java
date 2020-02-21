package squadron.manager.turbine.feedback;


import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@Table(name = "feedback")
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

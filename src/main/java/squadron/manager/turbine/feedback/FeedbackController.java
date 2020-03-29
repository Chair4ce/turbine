package squadron.manager.turbine.feedback;

import org.joda.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping(FeedbackController.URI)
public class FeedbackController {

    public static final String URI = "api/feedback";
    private FeedbackRepository feedbackRepository;

    @CrossOrigin
    @Autowired
    public void setFeedbackRepository(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }
    @CrossOrigin
    @GetMapping(path = "/getAll")
    public List<Feedback> getFeedback() {
        return feedbackRepository.findAll();
    }

    @CrossOrigin
    @PostMapping(path = "/submit")
    public Feedback create(@Valid @RequestBody String feedback) {

            Feedback newfeedback = new Feedback(
                    new LocalDateTime().toDate(),
                    feedback
            );

            return this.feedbackRepository.save(newfeedback);
    }
}

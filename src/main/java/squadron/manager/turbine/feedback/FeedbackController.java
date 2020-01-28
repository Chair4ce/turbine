package squadron.manager.turbine.feedback;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import squadron.manager.turbine.member.MemberController;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.validation.Valid;
import java.util.Date;
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
    public Feedback create(@Valid @RequestBody FeedbackJSON feedbackJSON) {

            Feedback feedback = new Feedback(
                    new Date(),
                    feedbackJSON.getFeedback_entry()
            );

            return this.feedbackRepository.save(feedback);
    }
}

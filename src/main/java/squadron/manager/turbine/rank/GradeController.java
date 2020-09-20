package squadron.manager.turbine.rank;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(GradeController.URI)
public class GradeController {
    public static final String URI = "/api/grades";

    private GradeService gradeService;

    public GradeController(GradeService gradeService) {
        this.gradeService = gradeService;
    }

    @GetMapping
    public List<grade> index() {
        return gradeService.getAllRanks();
    }
}

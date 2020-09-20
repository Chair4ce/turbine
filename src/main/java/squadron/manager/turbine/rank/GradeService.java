package squadron.manager.turbine.rank;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GradeService {
    private GradeRepository gradeRepository;

    public GradeService(GradeRepository gradeRepository) {
        this.gradeRepository = gradeRepository;
    }

    public List<grade> getAllRanks() {
        return this.gradeRepository.findAll();
    }
}

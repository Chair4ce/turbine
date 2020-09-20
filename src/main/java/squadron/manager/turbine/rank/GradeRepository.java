package squadron.manager.turbine.rank;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GradeRepository extends JpaRepository<grade, Long> {
  grade findGradeByAbbreviation(String abbreviation);
}

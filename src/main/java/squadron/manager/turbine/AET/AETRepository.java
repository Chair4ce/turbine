package squadron.manager.turbine.AET;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AETRepository extends JpaRepository<AET, Long> {
    AET findById(long id);
}

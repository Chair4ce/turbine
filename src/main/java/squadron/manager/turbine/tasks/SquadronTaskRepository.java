package squadron.manager.turbine.tasks;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SquadronTaskRepository extends JpaRepository<SquadronTask, Long> {
    SquadronTask findSquadronTaskById(Long id);
}

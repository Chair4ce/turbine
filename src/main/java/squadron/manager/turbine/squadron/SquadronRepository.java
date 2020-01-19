package squadron.manager.turbine.squadron;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SquadronRepository extends JpaRepository<Squadron, Long> {
    Squadron findById(long id);

}

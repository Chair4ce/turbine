package squadron.manager.turbine.gaining;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GainingRepository extends JpaRepository<Gaining, Long> {
    Gaining findBySqid(String sqid);
    List<Gaining> findAll();
}

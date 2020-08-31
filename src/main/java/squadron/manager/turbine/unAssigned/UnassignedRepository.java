package squadron.manager.turbine.unAssigned;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UnassignedRepository extends JpaRepository<Unassigned, Long> {

Unassigned findByMbrId(String mbrId);
}

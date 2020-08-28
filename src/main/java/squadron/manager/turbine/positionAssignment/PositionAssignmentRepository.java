package squadron.manager.turbine.positionAssignment;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PositionAssignmentRepository extends JpaRepository<PositionAssignment, Long> {


    List<PositionAssignment> findAllByAfscGroup(String afscGroup);
}

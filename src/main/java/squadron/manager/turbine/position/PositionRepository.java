package squadron.manager.turbine.position;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import squadron.manager.turbine.member.Member;

import java.util.List;


public interface PositionRepository extends JpaRepository<Position, Long> {

    Position findByPosNrAndCurrQtr(String posNr, Boolean currQtr);
    Position findByPosNrAndCurrQtrAndAssignedMbrId(String posNr, Boolean currQtr, String assignedMbrId);
    @Query("select DISTINCT posNr from Position")
    List<String> findDistinctPosNr();
    @Query("select DISTINCT afscAuth from Position")
    List<String> findDistinctAFSCAuth();
}

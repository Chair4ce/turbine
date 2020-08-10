package squadron.manager.turbine.position;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;
import java.util.List;


public interface PositionRepository extends JpaRepository<Position, Long> {

    List<Position> findAllByCurrQtrIsTrue();
    List<Position> findAllByPosNrAndCurrQtrIsFalse(String posNr);
    List<Position> findAllByPosNr(String posNr);


    void deleteByPosNr(String posNr);
    void deleteAll();
    @Query("select DISTINCT posNr from Position")
    List<String> findDistinctPosNr();
    @Query("select DISTINCT afscAuth from Position")
    List<String> findDistinctAFSCAuth();
}

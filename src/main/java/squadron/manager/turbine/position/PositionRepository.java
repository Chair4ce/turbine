package squadron.manager.turbine.position;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import squadron.manager.turbine.member.Member;

import java.util.ArrayList;
import java.util.List;


public interface PositionRepository extends JpaRepository<Position, Long> {

    List<Position> findAllByCurrQtrIsTrue();
    List<Position> findAllByPosNrIsNotNullAndCurrQtr(String currQtr);
    List<Position> findAllByPosNr(String posNr);
    List<Position> findAllByPosNrIsNull();
    List<Position> findAllByPosNrIsNotNullAndCurrQtrIsNull();

    void deleteByPosNr(String posNr);
    void deleteAll();
    @Query("select DISTINCT afscAuth from Position " +
            "where currQtr = '1' " +
            "and projQtr1 = '1'" +
            "and projQtr2 = '1'" +
            "and projQtr3 = '1'" +
            "and projQtr4 = '1'")
    List<String> findDistinctAfscAuth();

//    @Query("select DISTINCT afscAuth from Position " +
//            "where currQtr = '1'")
//    Number countAllByAfscAuth(String afsc);

    Number countAllByAfscAuthAndCurrQtrAndPosNrIsNotNull(String afsc, String code);
    Number countAllByDafscAssigned(String dafsc);

//    @Query("select DISTINCT afscAuth from Position " +
//            "where currQtr = ?1 " +
//            "and projQtr1 = ?1 " +
//            "and projQtr2 = ?1 " +
//            "and projQtr3 = ?1 " +
//            "and projQtr4 = ?1")
//    List<String> findAllWithFuncingCode(String code);
//    @Query("select posNr from Position " +
//            "where currQtr IS EMPTY ")
//    List<String> findAllDoubleBilleted(String code);


//    @Query("select COUNT(DISTINCT afscAuth) from Position")
//    List<String> findDistinctCount();
}

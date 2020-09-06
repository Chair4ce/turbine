package squadron.manager.turbine.position;

import javafx.geometry.Pos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import squadron.manager.turbine.member.Member;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;


public interface PositionRepository extends JpaRepository<Position, Long> {
    List<Position> findAllByPasCodeAndPosNrIsNotNullAndAfscAuthIsNotNullAndCurrQtr(String pasCode, String currQtr);
    List<Position> findAllByCurrQtrIsTrue();
    List<Position> findAllByAfscAuthAndPosNrIsNotNullAndCurrQtr(String afscAuth, String currQtr);
    List<Position> findAllByPosNr(String posNr);
    List<Position> findAllByPasCodeAndAfscAuth(String pasCode, String afsc);
    List<Position> findAllByPosNrIsNull();
    List<Position> findAllByPosNrIsNotNullAndCurrQtrIsNull();
    List<Position> findAllByCurrQtrAndProjQtr1(String current,String projected);
    List<Position> findAllByCurrQtrAndProjQtr2(String current,String projected);
    List<Position> findAllByCurrQtrAndProjQtr3(String current,String projected);
    List<Position> findAllByCurrQtrAndProjQtr4(String current,String projected);

    List<Position> findAllByPosNrAndAfscAuthIsNullAndCurrQtrIsNotContaining(String PosNr, String curr);

    void deleteAllByPasCode(String pas);
    void deleteAll();
    @Query("select DISTINCT afscAuth from Position " +
            "where posNr IS not null " +
            "and afscAuth IS not null")
    List<String> findDistinctAfscAuth();

    List<Position> findAllByAfscAuthAndCurrQtrIsNotNullAndPosNrIsNotNullAndMbrIdAssignedIsNotNull(String afsc);

    //Assigned in Funded || unFunded position
    List<Position> findAllByAfscAuthAndCurrQtrAndPosNrIsNotNullAndMbrIdAssignedIsNotNull(String afsc, String currQtr);

    List<Position> findAllByAfscAuthAndCurrQtrAndPosNrIsNotNullAndMbrIdAssignedIsNull(String afsc, String currQtr);
    List<Position> findAllByAfscAuthAndCurrQtrIsNullAndPosNrIsNotNullAndMbrIdAssignedIsNotNull(String afsc);
    //double billeted
    List<Position> findAllByPasCodeAndPosNrAndCurrQtrIsNullAndAfscAuthIsNullAndMbrIdAssignedIsNotNull(String pas, String pos);


    int countAllByAfscAuthAndCurrQtrAndPosNrIsNotNull(String afsc, String code);
    int countAllByAfscAuthAndPosNrIsNotNullAndMbrIdAssignedIsNotNull(String afsc);
    int countAllByDafscAssigned(String dafsc);

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

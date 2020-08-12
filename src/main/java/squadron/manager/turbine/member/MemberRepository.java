package squadron.manager.turbine.member;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;
import java.util.List;


public interface MemberRepository extends JpaRepository<Member, Long> {

    Member findByMbrId(String mbrId);

    @Query("select DISTINCT dafsc from Member WHERE dafsc IS NOT null")
    List<String> findDistinctDAFSC();
    @Query("select DISTINCT dafsc from Member WHERE dafsc IS NOT null or dafsc <> ''")
    List<String> findDistinctAFSCs();

    Number countAllByDafscAndDafscIsNotNull(String afsc);

    @Query(
           value = "select * from members WHERE dafsc = ?1",
            nativeQuery = true
    )
    List<Member> findAFSCCount(String string);
}



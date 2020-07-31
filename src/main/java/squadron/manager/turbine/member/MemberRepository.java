package squadron.manager.turbine.member;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;
import java.util.List;


public interface MemberRepository extends JpaRepository<Member, Long> {

    Member findByMbrId(String mbrId);

    @Query("select DISTINCT dafsc from Member")
    List<String> findDistinctDAFSC();

}



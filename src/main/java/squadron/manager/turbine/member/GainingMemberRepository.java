package squadron.manager.turbine.member;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GainingMemberRepository extends JpaRepository<GainingMember, Long> {

    GainingMember findByMbrId(String mbrId);
    List<GainingMember> findAllByDafsc(String dafsc);

    @Query("select DISTINCT dafsc from GainingMember")
    List<String> findDistinctDAFSC();

}

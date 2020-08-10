package squadron.manager.turbine.position;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UnassignedMemberRepository extends JpaRepository<UnassignedMember, Long> {

    UnassignedMember findByMbrId(String mbrId);
    void deleteByMbrId(String mbrId);
}

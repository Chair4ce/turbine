package squadron.manager.turbine.member;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface MembersRepository extends JpaRepository<MemberModel, Long> {
    void deleteAllBySqid(int sqid);
    List<MemberModel> findAllBySqid(int sqid);
}



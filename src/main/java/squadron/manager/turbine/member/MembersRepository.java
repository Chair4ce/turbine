package squadron.manager.turbine.member;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface MembersRepository extends JpaRepository<Members, Long> {
    void deleteAllBySqid(int sqid);
    List<Members> findAllBySqid(int sqid);
}



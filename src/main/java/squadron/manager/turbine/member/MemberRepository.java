package squadron.manager.turbine.member;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface MemberRepository extends JpaRepository<Member, Long> {
}



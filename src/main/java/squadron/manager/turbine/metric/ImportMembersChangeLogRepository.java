package squadron.manager.turbine.metric;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface ImportMembersChangeLogRepository extends JpaRepository<ImportMembersChangeLog, Long> {

    List<ImportMembersChangeLog> findAll();
}

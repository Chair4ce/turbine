package squadron.manager.turbine.metric;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface ImportGainingChangeLogRepository extends JpaRepository<ImportGainingChangeLog, Long> {
List<ImportGainingChangeLog> findAllByImportDateTime(Date date);
}

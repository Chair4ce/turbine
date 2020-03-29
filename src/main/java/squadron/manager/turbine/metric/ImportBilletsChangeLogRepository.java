package squadron.manager.turbine.metric;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface ImportBilletsChangeLogRepository extends JpaRepository<ImportBilletsChangeLog, Long> {

    Iterable<ImportBilletsChangeLog> findAllByImportDateTime(Date importDateTime);
}

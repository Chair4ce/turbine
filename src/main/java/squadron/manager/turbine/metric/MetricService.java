package squadron.manager.turbine.metric;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class MetricService {

    @Autowired
    private ImportGainingChangeLogRepository importGainingChangeLogRepository;

    @Autowired
    private ImportMembersChangeLogRepository importMembersChangeLogRepository;

    public void logGainingFieldChanges(Iterable<ImportGainingChangeLog> importGainingChangeLog) {
        this.importGainingChangeLogRepository.saveAll(importGainingChangeLog);
    }

    public void logMembersFieldChange(Iterable<ImportMembersChangeLog> importMembersChangeLog) {
        this.importMembersChangeLogRepository.saveAll(importMembersChangeLog);
    }
}

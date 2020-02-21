package squadron.manager.turbine.metric;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class MetricService {

    @Autowired
    private ImportGainingChangeLogRepository importGainingChangeLogRepository;

    @Autowired
    private ImportMembersChangeLogRepository importMembersChangeLogRepository;

    public void logGainingFieldChange(ImportGainingChangeLog importGainingChangeLog) {
        this.importGainingChangeLogRepository.save(importGainingChangeLog);
    }

    public void logMembersFieldChange(ImportMembersChangeLog importMembersChangeLog) {
        this.importMembersChangeLogRepository.save(importMembersChangeLog);
    }
}

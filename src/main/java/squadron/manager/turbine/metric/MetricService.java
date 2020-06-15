package squadron.manager.turbine.metric;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MetricService {

    @Autowired
    private ImportMembersChangeLogRepository importMembersChangeLogRepository;

    @Autowired
    private NewMemberLogRepository newMemberLogRepository;

    public void logMembersFieldChange(Iterable<ImportMembersChangeLog> importMembersChangeLog) {
        this.importMembersChangeLogRepository.saveAll(importMembersChangeLog);
    }

    public void logNewImportedMembers(NewMemberLogModel member){
this.newMemberLogRepository.save(member);
    }
}

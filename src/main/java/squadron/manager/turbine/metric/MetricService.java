package squadron.manager.turbine.metric;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import squadron.manager.turbine.gaining.Gaining;


@Service
public class MetricService {

    @Autowired
    private ImportGainingChangeLogRepository importGainingChangeLogRepository;

    @Autowired
    private ImportMembersChangeLogRepository importMembersChangeLogRepository;

    @Autowired
    private NewGainingLogRepository newGainingLogRepository;

    @Autowired
    private NewMemberLogRepository newMemberLogRepository;

    public void logGainingFieldChanges(Iterable<ImportGainingChangeLog> importGainingChangeLog) {
        System.out.println("logging change");
        this.importGainingChangeLogRepository.saveAll(importGainingChangeLog);
    }

    public void logMembersFieldChange(Iterable<ImportMembersChangeLog> importMembersChangeLog) {
        this.importMembersChangeLogRepository.saveAll(importMembersChangeLog);
    }

    public void logNewImportedGaining(NewGainingLogModel gaining){
this.newGainingLogRepository.save(gaining);
    }
    public void logNewImportedMembers(NewMemberLogModel member){
this.newMemberLogRepository.save(member);
    }
    public void logNewImportedBillets(NewMemberLogModel member){
this.newMemberLogRepository.save(member);
    }


}

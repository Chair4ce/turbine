package squadron.manager.turbine.metric;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;

@Service
public class MetricService {
    private ImportGainingChangeLogRepository importGainingChangeLogRepository;
    private ImportMembersChangeLogRepository importMembersChangeLogRepository;
    private ImportBilletsChangeLogRepository importBilletsChangeLogRepository;
    private NewGainingLogRepository newGainingLogRepository;
    private NewMemberLogRepository newMemberLogRepository;
    private NewBilletsLogRepository newBilletsLogRepository;

    @Autowired
    public void ConstructorBasedInjection(
            ImportMembersChangeLogRepository importMembersChangeLogRepository
    ) {
        this.importMembersChangeLogRepository = importMembersChangeLogRepository;
    }

    @Autowired
    public void ConstructorBasedInjection(
            ImportGainingChangeLogRepository importGainingChangeLogRepository
    ) {
        this.importGainingChangeLogRepository = importGainingChangeLogRepository;
    }

    @Autowired
    public void ConstructorBasedInjection(
            NewGainingLogRepository newGainingLogRepository
    ) {
        this.newGainingLogRepository = newGainingLogRepository;
    }

    @Autowired
    public void ConstructorBasedInjection(
            NewMemberLogRepository newMemberLogRepository
    ) {
        this.newMemberLogRepository = newMemberLogRepository;
    }

    @Autowired
    public void ConstructorBasedInjection(
            NewBilletsLogRepository newBilletsLogRepository
    ) {
        this.newBilletsLogRepository = newBilletsLogRepository;
    }

    @Autowired
    public void ConstructorBasedInjection(
            ImportBilletsChangeLogRepository importBilletsChangeLogRepository
    ) {
        this.importBilletsChangeLogRepository = importBilletsChangeLogRepository;
    }

    public void logGainingFieldChanges(Iterable<ImportGainingChangeLog> importGainingChangeLog) {
        this.importGainingChangeLogRepository.saveAll(importGainingChangeLog);
    }

    public void logMembersFieldChange(Iterable<ImportMembersChangeLog> importMembersChangeLog) {
        this.importMembersChangeLogRepository.saveAll(importMembersChangeLog);
    }

    public void logBilletsFieldChange(Iterable<ImportBilletsChangeLog> importBilletsChangeLog) {
        this.importBilletsChangeLogRepository.saveAll(importBilletsChangeLog);
    }

    public void logNewImportedGaining(NewGainingLogModel gaining) {
        this.newGainingLogRepository.save(gaining);
    }

    public void logNewImportedMembers(NewMemberLogModel member) {
        this.newMemberLogRepository.save(member);
    }

    public void logNewImportedBillets(NewBilletsLogModel billet) {
        this.newBilletsLogRepository.save(billet);
    }

    public Iterable<ImportBilletsChangeLog> getAllBilletsByImportDateTime(Date date) {
        return this.importBilletsChangeLogRepository.findAllByImportDateTime(date);
    }

    public Iterable<ImportMembersChangeLog> getAllMembersByImportDateTime(Date date) {
        return this.importMembersChangeLogRepository.findAllByImportDateTime(date);
    }

    public Iterable<ImportGainingChangeLog> getAllGainingByImportDateTime(Date date) {
        return this.importGainingChangeLogRepository.findAllByImportDateTime(date);
    }
}

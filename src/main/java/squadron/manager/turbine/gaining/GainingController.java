package squadron.manager.turbine.gaining;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import squadron.manager.turbine.member.Member;
import squadron.manager.turbine.member.MemberRepository;
import squadron.manager.turbine.member.SqidGenerator;
import squadron.manager.turbine.metric.ImportGainingChangeLog;
import squadron.manager.turbine.metric.ImportGainingChangeLogRepository;
import squadron.manager.turbine.metric.MetricService;
import squadron.manager.turbine.metric.NewGainingLogModel;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@RestController
@RequestMapping(GainingController.URI)
public class GainingController {

    public static final String URI = "api/gaining";
    private GainingRepository gainingRepository;
    private MemberRepository memberRepository;
    private MetricService metricService;
    private ImportGainingChangeLogRepository importGainingChangeLogRepository;



    @Autowired
    public void ConstructorBasedInjection(GainingRepository gainingRepository) {
        this.gainingRepository = gainingRepository;
    }
    @Autowired
    public void ConstructorBasedInjection(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }
    @Autowired
    public void ConstructorBasedInjection(MetricService metricService) {
        this.metricService = metricService;
    }
    @Autowired
    public void ConstructorBasedInjection(ImportGainingChangeLogRepository importGainingChangeLogRepository) {
        this.importGainingChangeLogRepository = importGainingChangeLogRepository;
    }



    @CrossOrigin
    @GetMapping
    public @ResponseBody
    Iterable<Gaining> getGaining() {
        return this.gainingRepository.findAll();
    }

    @CrossOrigin
    @PostMapping(path = "/delete")
    public List<Gaining> create(@Valid @RequestBody Long id) {
        gainingRepository.deleteById(id);
        return gainingRepository.findAll();
    }

    @CrossOrigin
    @PostMapping(path = "/update")
    public List<Gaining> create(@Valid @RequestBody GainingJSON newGaining) {
        Gaining oldData = gainingRepository.findBySqid(newGaining.getSqid());
        Date date = new Date();
        Gaining newData = new Gaining(
                newGaining.getSqid(),
                newGaining.getFullName(),
                newGaining.getFirstName(),
                newGaining.getLastName(),
                newGaining.getRnltd(),
                newGaining.getGrade(),
                newGaining.getGainingPas(),
                newGaining.getProjectedArrivalDate(),
                newGaining.getDafsc(),
                newGaining.getCellPhone(),
                newGaining.getEmail(),
                newGaining.getDor(),
                newGaining.getDateArrivedStation(),
                newGaining.getProjectedBilletId(),
                newGaining.getDateDepLastDutyStn(),
                newGaining.getSponsorId(),
                newGaining.getLosingPas(),
                newGaining.getProjectedOfficeSymbol(),
                date
        );

        logAndSaveChanges(date, newData, oldData);

        oldData.setFullName(newData.getFullName());
        oldData.setFirstName(newData.getFirstName());
        oldData.setLastName(newData.getLastName());
        oldData.setRnltd(newData.getRnltd());
        oldData.setGrade(newData.getGrade());
        oldData.setGainingPas(newData.getGainingPas());
        oldData.setProjectedArrivalDate(newData.getProjectedArrivalDate());
        oldData.setDafsc(newData.getDafsc());
        oldData.setCellPhone(newData.getCellPhone());
        oldData.setEmail(newData.getEmail());
        oldData.setDor(newData.getDor());
        oldData.setProjectedBilletId(newData.getProjectedBilletId());
        oldData.setDateDepLastDutyStn(newData.getDateDepLastDutyStn());
        oldData.setSponsorId(newData.getSponsorId());
        oldData.setLosingPas(newData.getLosingPas());
        oldData.setProjectedOfficeSymbol(newData.getProjectedOfficeSymbol());
        oldData.setLastUpdated(date);
        gainingRepository.save(oldData);
        return gainingRepository.findAll();
    }

    @CrossOrigin
    @Transactional
    @PostMapping(path = "/save")
    public Iterable<ImportGainingChangeLog> importGaining(@Valid @RequestBody Iterable<GainingJSON> json) {
        List<Member> members = memberRepository.findAll();
        Date date = new Date();

        json.forEach((newImport -> {
            SqidGenerator sqidModel = new SqidGenerator(newImport.getFullName(), newImport.getSqid());

            Gaining importedGaining = buildGainingModel(members, date, newImport, sqidModel);

            findExistingOrSaveNew(date, sqidModel, importedGaining);
        }));
       return importGainingChangeLogRepository.findAllByImportDateTime(date);
    }

    private Gaining buildGainingModel(List<Member> members, Date date, GainingJSON newImport, SqidGenerator sqidModel) {
        String assignedSponsor = returnSponsorName(newImport.getSponsorId(), members);
        return new Gaining(
                sqidModel.getSqid(),
                newImport.getFullName(),
                sqidModel.getFirstName(),
                sqidModel.getLastName(),
                newImport.getRnltd(),
                newImport.getGrade(),
                newImport.getGainingPas(),
                newImport.getDafsc(),
                newImport.getDor(),
                newImport.getDateDepLastDutyStn(),
                assignedSponsor,
                newImport.getLosingPas(),
                date
        );
    }

    private void findExistingOrSaveNew(Date date, SqidGenerator sqidModel, Gaining importedGaining) {
        Gaining existingGaining = returnGainingIfExists(sqidModel.getSqid());

        if (notNull(existingGaining)) {
             logAndSaveChanges(date, importedGaining, existingGaining);
        } else {
            this.metricService.logNewImportedGaining(new NewGainingLogModel(importedGaining.getSqid(), importedGaining.getFullName(), date));
            this.gainingRepository.save(importedGaining);
        }
    }


    private Gaining updateExistingGainingData(Gaining existingGaining, Gaining importingGaining) {

            existingGaining.setFullName(importingGaining.getFullName());
            existingGaining.setFirstName(importingGaining.getFirstName());
            existingGaining.setLastName(importingGaining.getLastName());
            existingGaining.setRnltd(importingGaining.getRnltd());
            existingGaining.setGrade(importingGaining.getGrade());
            existingGaining.setGainingPas(importingGaining.getGainingPas());
            existingGaining.setDafsc(importingGaining.getDafsc());
            existingGaining.setDor(importingGaining.getDor());
            existingGaining.setDateDepLastDutyStn(importingGaining.getDateDepLastDutyStn());
            existingGaining.setSponsorId(importingGaining.getSponsorId());
            existingGaining.setLosingPas(importingGaining.getLosingPas());
            existingGaining.setLastUpdated(new Date());
return existingGaining;

    }

    private String returnSponsorName(String sponsorId, List<Member> members) {
        if (sponsorId != null) {
            for (Member member : members) {
                if (member.getSqid().substring(0, 9).equals(sponsorId)) {
                    return member.getFullName();
                }
            }
        }
        return null;
    }

    private void logAndSaveChanges(Date date, Gaining importingGaining, Gaining existingGaining) {
        List<ImportGainingChangeLog> importGainingChanges = new ArrayList();
        Boolean changed = false;
        for (String field : existingGaining.compare(importingGaining)) {
            if (field.length() > 0) changed = true;
            importGainingChanges.add(new ImportGainingChangeLog(date, importingGaining, existingGaining, field));
        }
        if (changed) {
        this.metricService.logGainingFieldChanges(importGainingChanges);
        this.gainingRepository.save(updateExistingGainingData(existingGaining, importingGaining));
        }
    }

    private boolean notNull(Gaining existingGaining) {
        return existingGaining != null;
    }

    private Gaining returnGainingIfExists(String importingSqid) {
        return gainingRepository.findBySqid(importingSqid);
    }

}

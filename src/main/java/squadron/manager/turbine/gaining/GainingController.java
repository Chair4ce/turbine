package squadron.manager.turbine.gaining;

import org.joda.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import squadron.manager.turbine.feedback.Feedback;
import squadron.manager.turbine.feedback.FeedbackJSON;
import squadron.manager.turbine.member.Member;
import squadron.manager.turbine.member.MemberRepository;
import squadron.manager.turbine.member.SqidGenerator;
import squadron.manager.turbine.metric.ImportGainingChangeLog;
import squadron.manager.turbine.metric.ImportGainingChangeLogRepository;
import squadron.manager.turbine.metric.MetricService;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping(GainingController.URI)
public class GainingController {

    public static final String URI = "api/gaining";

    @Autowired
    private GainingRepository gainingRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MetricService metricService;

    @Autowired
    private ImportGainingChangeLogRepository importGainingChangeLogRepository;

    @CrossOrigin
    @GetMapping
    public @ResponseBody
    Iterable<Gaining> getGaining() {
        return this.gainingRepository.findAll();
    }

    @CrossOrigin
    @PostMapping(path = "/delete")
    public List<Gaining> create(@Valid @RequestBody Long id) {
        System.out.println("Deleting: " + id);
        gainingRepository.deleteById(id);
        return gainingRepository.findAll();
    }

    @CrossOrigin
    @PostMapping(path = "/update")
    public List<Gaining> create(@Valid @RequestBody GainingJSON gaining) {
        Gaining oldData = gainingRepository.findBySqid(gaining.getSqid());
        System.out.println("Updating: " + gaining);
        Date date = new Date();
        Gaining updatedGaining = new Gaining(
                gaining.getSqid(),
                gaining.getFullName(),
                gaining.getFirstName(),
                gaining.getLastName(),
                gaining.getRnltd(),
                gaining.getGrade(),
                gaining.getGainingPas(),
                gaining.getDafsc(),
                gaining.getDor(),
                gaining.getDateDepLastDutyStn(),
                gaining.getSponsorId(),
                gaining.getLosingPas(),
                date
        );

        oldData.setFullName(updatedGaining.getFullName());
        oldData.setFirstName(updatedGaining.getFirstName());
        oldData.setLastName(updatedGaining.getLastName());
        oldData.setRnltd(updatedGaining.getRnltd());
        oldData.setGrade(updatedGaining.getGrade());
        oldData.setGainingPas(updatedGaining.getGainingPas());
        oldData.setDafsc(updatedGaining.getDafsc());
        oldData.setDor(updatedGaining.getDor());
        oldData.setDateDepLastDutyStn(updatedGaining.getDateDepLastDutyStn());
        oldData.setSponsorId(updatedGaining.getSponsorId());
        oldData.setLosingPas(updatedGaining.getLosingPas());
        oldData.setLastUpdated(new Date());
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
            this.gainingRepository.save(importedGaining);
        }
    }


    private Gaining updateExistingGainingData(Gaining existingGaining, Gaining importingGaining) {

            System.out.println("Found Changes for: " + existingGaining.getFullName());
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
                    System.out.println("Found Sponsor: " + member.getFullName());
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

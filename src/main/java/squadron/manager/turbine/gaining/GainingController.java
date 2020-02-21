package squadron.manager.turbine.gaining;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import squadron.manager.turbine.member.Member;
import squadron.manager.turbine.member.MemberRepository;
import squadron.manager.turbine.member.SqidGenerator;
import squadron.manager.turbine.metric.ImportGainingChangeLog;
import squadron.manager.turbine.metric.MetricService;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


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


    @CrossOrigin
    @GetMapping
    public @ResponseBody
    Iterable<Gaining> getGaining() {
        return this.gainingRepository.findAll();
    }

    @CrossOrigin
    @Transactional
    @PostMapping(path = "/save")
    public Iterable<Gaining> addGaining(@Valid @RequestBody Iterable<GainingJSON> json) {
        List<Gaining> newGaining = new ArrayList();
        List<Member> members = memberRepository.findAll();
        json.forEach((newImport -> {
            String assignedSponsor = returnSponsorName(newImport.getSponsorId(), members);
            System.out.println("Importing Member: " + newImport.getFullName());
            SqidGenerator sqidModel = new SqidGenerator(newImport.getFullName(), newImport.getSqid());
            Gaining existingGaining = returnGainingIfExists(sqidModel.getSqid());

            Gaining importingGaining = new Gaining(
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
                    new Date()
            );

            if (notNull(existingGaining)) {
                System.out.println("Found Existing Member");
                this.gainingRepository.save(logAndUpdateDiff(importingGaining, existingGaining));
            } else {
                System.out.println("No Existing Member");
                newGaining.add(importingGaining);
            }
        }));
        System.out.println("Saving All New Members");
        return this.gainingRepository.saveAll(newGaining);

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

    private Gaining logAndUpdateDiff(Gaining importingGaining, Gaining oldGaining) {
        boolean foundChanges = false;
        for (String field : oldGaining.compare(importingGaining)) {
            System.out.println("field: " + field);
            if (field.length() >= 1) foundChanges = true;
            this.metricService.logGainingFieldChange(new ImportGainingChangeLog(new Date(), importingGaining, oldGaining, field));
        }
        if (foundChanges) {
            System.out.println("Found Changes for: " + oldGaining.getFullName());
            oldGaining.setFullName(importingGaining.getFullName());
            oldGaining.setFirstName(importingGaining.getFirstName());
            oldGaining.setLastName(importingGaining.getLastName());
            oldGaining.setRnltd(importingGaining.getRnltd());
            oldGaining.setGrade(importingGaining.getGrade());
            oldGaining.setGainingPas(importingGaining.getGainingPas());
            oldGaining.setDafsc(importingGaining.getDafsc());
            oldGaining.setDor(importingGaining.getDor());
            oldGaining.setDateDepLastDutyStn(importingGaining.getDateDepLastDutyStn());
            oldGaining.setSponsorId(importingGaining.getSponsorId());
            oldGaining.setLosingPas(importingGaining.getLosingPas());
            oldGaining.setLastUpdated(new Date());
        }
        return oldGaining;
    }

    private boolean notNull(Gaining existingGaining) {
        return existingGaining != null;
    }

    private Gaining returnGainingIfExists(String importingSqid) {
        return gainingRepository.findBySqid(importingSqid);
    }

}

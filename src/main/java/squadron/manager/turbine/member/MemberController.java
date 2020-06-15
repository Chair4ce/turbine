package squadron.manager.turbine.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import squadron.manager.turbine.metric.ImportMembersChangeLog;
import squadron.manager.turbine.metric.ImportMembersChangeLogRepository;
import squadron.manager.turbine.metric.MetricService;
import squadron.manager.turbine.metric.NewMemberLogModel;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@RestController
@RequestMapping(MemberController.URI)
public class MemberController {

    public static final String URI = "api/members";

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MetricService metricService;

    @Autowired
    private ImportMembersChangeLogRepository importMembersChangeLogRepository;

    @Autowired
    public void ConstructorBasedInjection(MetricService metricService) {
        this.metricService = metricService;
    }

    @Autowired
    public void ConstructorBasedInjection(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Autowired
    public void ConstructorBasedInjection(ImportMembersChangeLogRepository importMembersChangeLogRepository) {
        this.importMembersChangeLogRepository = importMembersChangeLogRepository;
    }

    @CrossOrigin
    @GetMapping
    public @ResponseBody
    Iterable<Member> getMembers() {
        return memberRepository.findAll();
    }

    @CrossOrigin
    @Transactional
    @PostMapping(path = "/save")
    public Iterable<ImportMembersChangeLog> addMembers(@Valid @RequestBody Iterable<MemberJSON> json) {
        Date date = new Date();
        json.forEach((newImport -> {
            findExistingOrSaveNew(date, newImport);
        }));
        return importMembersChangeLogRepository.findAll();
    }

    private void findExistingOrSaveNew(Date date, MemberJSON newImport) {
        Iterable<Member> members = memberRepository.findAll();
        SqidGenerator sqidModel = new SqidGenerator(newImport.getFullName(), newImport.getSqid());
        Member existingMember = returnMemberIfExists(sqidModel.getSqid());

        Member importingMember = new Member(
                sqidModel.getSqid(),
                newImport.getFullName(),
                sqidModel.getFirstName(),
                sqidModel.getLastName(),
                newImport.getTafmsd(),
                newImport.getGrade(),
                newImport.getAssignedPas(),
                newImport.getDafsc(),
                newImport.getOfficeSymbol(),
                newImport.getDutyTitle(),
                newImport.getDutyStartDate(),
                newImport.getDutyPhone(),
                returnSupervisorSqid(newImport.getSupvName(), members),
                newImport.getSupvBeginDate(),
                newImport.getDateArrivedStation(),
                newImport.getRnltd(),
                newImport.getDor(),
                date
        );

        if (notNull(existingMember)) {
            logAndSaveChanges(date, importingMember, existingMember);
        } else {
            this.metricService.logNewImportedMembers(new NewMemberLogModel(importingMember.getSqid(), importingMember.getFullName(), date));
            this.memberRepository.save(importingMember);
        }
    }

    private String returnSupervisorSqid(String strSearch, Iterable<Member> members) {
        AtomicReference<String> strFound = new AtomicReference<>("");
        AtomicReference<Integer> foundMatch = new AtomicReference<>(0);
        if (strSearch != null) {
            members.forEach(potentialSupervisor -> {
                if (strSearch.replaceAll("\\s", ".").equals(potentialSupervisor.getSqid().substring(potentialSupervisor.getSqid().indexOf(".") + 1))) {
                    if (foundMatch.get() == 0) {
                        strFound.set(potentialSupervisor.getSqid());
                    }
                    foundMatch.set(foundMatch.get() + 1);
                }
            });
        }
        return strFound.get().length() > 0 ? strFound.get() : strSearch;
    }

    private void logAndSaveChanges(Date date, Member importingMember, Member existingMember) {
        List<ImportMembersChangeLog> importMemberChanges = new ArrayList();
        Boolean changed = false;
        for (String field : existingMember.compare(importingMember)) {
            if (field.length() > 0) changed = true;
            importMemberChanges.add(new ImportMembersChangeLog(date, importingMember, existingMember, field));
        }

        if (changed) {
            this.metricService.logMembersFieldChange(importMemberChanges);
            this.memberRepository.save(updateExistingMemberData(importingMember, existingMember));
        }
    }

    private Member updateExistingMemberData(Member importingMember, Member existingMember) {
        existingMember.setFullName(importingMember.getFullName());
        existingMember.setFirstName(importingMember.getFirstName());
        existingMember.setLastName(importingMember.getLastName());
        existingMember.setGrade(importingMember.getGrade());
        existingMember.setAssignedPas(importingMember.getAssignedPas());
        existingMember.setTafmsd(importingMember.getTafmsd());
        existingMember.setDafsc(importingMember.getDafsc());
        existingMember.setOfficeSymbol(importingMember.getOfficeSymbol());
        existingMember.setDutyTitle(importingMember.getDutyTitle());
        existingMember.setDutyStartDate(importingMember.getDutyStartDate());
        existingMember.setDutyPhone(importingMember.getDutyPhone());
        existingMember.setSupvName(importingMember.getSupvName());
        existingMember.setSupvBeginDate(importingMember.getSupvBeginDate());
        existingMember.setDateArrivedStation(importingMember.getDateArrivedStation());
        existingMember.setDor(importingMember.getDor());
        existingMember.setLastUpdated(new Date());

        return existingMember;
    }

    private Member returnMemberIfExists(String importingSqid) {
        return memberRepository.findBySqid(importingSqid);
    }

    private boolean notNull(Member existingMember) {
        return existingMember != null;
    }

    @CrossOrigin
    @GetMapping("/{PAS}")
    public ResponseEntity<List<Member>> getMembersAssignedtoPAS(@PathVariable(value = "PAS") String PAS) throws Exception {
        List<Member> members = this.memberRepository.findAllByAssignedPas(PAS);
        return ResponseEntity.ok().body(members);
    }

    @CrossOrigin
    @GetMapping("/{sqid}")
    public ResponseEntity<Member> getMemberBySqid(@PathVariable(value = "sqid") String sqid) throws Exception {
        Member member = memberRepository.findBySqid(sqid);
        if (member == null) {
            throw new Exception("Does not exist");
        }
        return ResponseEntity.ok().body(member);
    }

}






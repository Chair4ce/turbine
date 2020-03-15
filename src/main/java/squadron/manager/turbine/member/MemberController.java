package squadron.manager.turbine.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import squadron.manager.turbine.metric.*;
import squadron.manager.turbine.tasks.SquadronTask;
import squadron.manager.turbine.tasks.SquadronTaskRepository;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicReference;

@RestController
@RequestMapping(MemberController.URI)
public class MemberController {
    public static final String URI = "api/members";

    private SquadronTaskRepository squadronTaskRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MetricService metricService;

    @Autowired
    private ImportMembersChangeLogRepository importMembersChangeLogRepository;

    @Autowired
    public void ConstructorBasedInjection(SquadronTaskRepository squadronTaskRepository) {
        this.squadronTaskRepository = squadronTaskRepository;
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

        findSupervisor();
        return importMembersChangeLogRepository.findAll();
    }



    private void findExistingOrSaveNew(Date date, MemberJSON newImport) {
        SqidGenerator sqidModel = new SqidGenerator(newImport.getFullName(), newImport.getSqid());
        Member existingMember = returnMemberIfExists(sqidModel.getSqid());
        if (newImport.getSupvName() != null) {
            newImport.setSupvName(newImport.getSupvName().replaceAll("\\s", "."));
        }

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
                newImport.getSupvName(),
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

    private void findSupervisor() {
        System.out.println("setting up");
        Iterable<Member> members = memberRepository.findAll();
        members.forEach(member -> {
            if (member.getSupvName() != null) {
                compareSupName(member, members);
            }
        });
    }

    private void compareSupName(Member member, Iterable<Member> potentialSupervisors) {
        AtomicReference<Integer> foundMatch = new AtomicReference<>(0);
        System.out.println("looking for supervisors");
        potentialSupervisors.forEach(potentialSupervisor -> {
            if (member.getSupvName().equals(potentialSupervisor.getSqid().substring(potentialSupervisor.getSqid().indexOf(".") + 1))) {
                if (foundMatch.get() == 0) {
                    System.out.println("found one");
                    member.setSupvName(potentialSupervisor.getSqid());
                    memberRepository.save(member);
                }
                foundMatch.set(foundMatch.get() + 1);
            }
        });

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






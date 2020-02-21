package squadron.manager.turbine.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import squadron.manager.turbine.gaining.Gaining;
import squadron.manager.turbine.metric.ImportMembersChangeLog;
import squadron.manager.turbine.metric.MetricService;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(MemberController.URI)
public class MemberController {
    public static final String URI = "api/members";

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MetricService metricService;


    @CrossOrigin
    @GetMapping
    public @ResponseBody
    Iterable<Member> getMembers() {
        return memberRepository.findAll();
    }

    @CrossOrigin
    @Transactional
    @PostMapping(path = "/save")
    public Iterable<Member> addMembers(@Valid @RequestBody Iterable<MemberJSON> json) {
        List<Member> newMembers = new ArrayList();
        json.forEach((newImport -> {
            System.out.println("Importing Member: " + newImport.getFullName());
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
                    newImport.getSupvName(),
                    newImport.getSupvBeginDate(),
                    newImport.getDateArrivedStation(),
                    newImport.getDor(),
                    new Date()
            );

            if (notNull(existingMember)) {
                System.out.println("Found Existing Member");
                this.memberRepository.save(logAndUpdateDiff(importingMember, existingMember));
            } else {
                System.out.println("No Existing Member");
                newMembers.add(importingMember);
            }
        }));
        System.out.println("Saving All New Members");
        return this.memberRepository.saveAll(newMembers);
    }


    private Member logAndUpdateDiff(Member importingMember, Member oldMember) {
        boolean foundChanges = false;
        for (String field : oldMember.compare(importingMember)) {
            if (field.length() >= 1) foundChanges = true;
            this.metricService.logMembersFieldChange(new ImportMembersChangeLog(new Date(), importingMember, oldMember, field));
        }
        if (foundChanges) {
            System.out.println("Found Changes for: " + oldMember.getFullName());
            oldMember.setFullName(importingMember.getFullName());
            oldMember.setFirstName(importingMember.getFirstName());
            oldMember.setLastName(importingMember.getLastName());
            oldMember.setGrade(importingMember.getGrade());
            oldMember.setAssignedPas(importingMember.getAssignedPas());
            oldMember.setTafmsd(importingMember.getTafmsd());
            oldMember.setDafsc(importingMember.getDafsc());
            oldMember.setOfficeSymbol(importingMember.getOfficeSymbol());
            oldMember.setDutyTitle(importingMember.getDutyTitle());
            oldMember.setDutyStartDate(importingMember.getDutyStartDate());
            oldMember.setDutyPhone(importingMember.getDutyPhone());
            oldMember.setSupvName(importingMember.getSupvName());
            oldMember.setSupvBeginDate(importingMember.getSupvBeginDate());
            oldMember.setDateArrivedStation(importingMember.getDateArrivedStation());
            oldMember.setDor(importingMember.getDor());
            oldMember.setLastUpdated(new Date());
        }
        return oldMember;
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






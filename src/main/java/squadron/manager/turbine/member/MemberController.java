package squadron.manager.turbine.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.Date;
import java.util.Objects;

@RestController
@RequestMapping(MemberController.URI)
public class MemberController {

    public static final String URI = "/api/members";

    @Autowired
    private MemberRepository memberRepository;

    @CrossOrigin
    @Autowired
    public void ConstructorBasedInjection(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
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
    public Iterable<Member> addMembers(@Valid @RequestBody Iterable<MemberJSON> json) {
        Date date = new Date();
        json.forEach((newImport -> {
            Member existingMember = memberRepository.findByMbrId(newImport.getSsan());
            if (existingMember == null) {
                this.memberRepository.save(NewMemberModel(date, newImport));
            } else {
                updateExistingMemberData(NewMemberModel(date, newImport), existingMember);
            }
        }));
        return memberRepository.findAll();
    }

    private Member NewMemberModel(Date date, MemberJSON newImport) {
        return new Member(
                newImport.getSsan(),
                newImport.getFullName(),
                newImport.getGrade(),
                newImport.getAssignedPas(),
                newImport.getDafsc() != null ? newImport.getDafsc() : "",
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
    }

    private void updateExistingMemberData(Member importingMember, Member existingMember) {
        existingMember.setFullName(importingMember.getFullName());
        existingMember.setGrade(importingMember.getGrade());
        existingMember.setAssignedPas(importingMember.getAssignedPas());
        existingMember.setDafsc(importingMember.getDafsc() != null ? importingMember.getDafsc() : "");
        existingMember.setOfficeSymbol(importingMember.getOfficeSymbol());
        existingMember.setDutyTitle(importingMember.getDutyTitle());
        existingMember.setDutyStartDate(importingMember.getDutyStartDate());
        existingMember.setDutyPhone(importingMember.getDutyPhone());
        existingMember.setSupvName(importingMember.getSupvName());
        existingMember.setSupvBeginDate(importingMember.getSupvBeginDate());
        existingMember.setDateArrivedStation(importingMember.getDateArrivedStation());
        existingMember.setDor(importingMember.getDor());

        memberRepository.save(existingMember);
    }

}






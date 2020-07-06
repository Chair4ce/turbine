package squadron.manager.turbine.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.Date;

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
    public String addMembers(@Valid @RequestBody Iterable<MemberJSON> json) {
        Date date = new Date();
        memberRepository.deleteAll();
        json.forEach((newImport -> {
            saveNewMember(date, newImport);
        }));
        return "Saved";
    }

    private void saveNewMember(Date date, MemberJSON newImport) {

        Member importingMember = new Member(
                newImport.getFullName(),
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
            this.memberRepository.save(importingMember);
        };

}






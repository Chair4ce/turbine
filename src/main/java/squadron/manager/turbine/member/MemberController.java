package squadron.manager.turbine.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(MemberController.URI)
public class MemberController {
    public static final String URI = "api/members";

    @Autowired
    private MemberRepository memberRepository;

    @CrossOrigin
    @GetMapping
    public List<Member> getAllMembers() throws Exception {
        return memberRepository.findAll();
    }
    @CrossOrigin
    @PostMapping
    public Member create(@Valid @RequestBody MemberJSON memberJSON) {
        Member member = new Member(memberJSON.getId(), memberJSON.getFull_name(), memberJSON.getGrade(), memberJSON.getAssigned_pas(),
                memberJSON.getDafsc(), memberJSON.getOffice_symbol(), memberJSON.getDuty_title(),
                memberJSON.getDuty_start_date(), memberJSON.getDuty_phone(), memberJSON.getAwardec_status(), memberJSON.getEpr_opr_status());
        return this.memberRepository.save(member);
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<Member> getMemberById(@PathVariable(value = "id") Long id) throws Exception {
        System.out.println("getting member with id: " + id);
        Member member = memberRepository.findById(id).orElseThrow(() -> new Exception("Member not found with id ::" + id));
        return ResponseEntity.ok().body(member);
    }

//    @CrossOrigin
//    @GetMapping("/{PAS}")
//    public ResponseEntity<List<Member>> getMembersAssignedtoPAS(@PathVariable(value = "PAS") String PAS) throws Exception {
//        System.out.println("getting member with id: " + PAS);
//        List<Member> member = memberRepository.findAllByAssigned_pasMatches(PAS);
//        return ResponseEntity.ok().body(member);
//    }


}

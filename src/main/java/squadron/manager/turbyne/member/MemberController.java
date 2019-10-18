package squadron.manager.turbyne.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(MemberController.URI)
public class MemberController {
    static final String URI = "/api/members";

    @Autowired
    private MemberRepository memberRepository;

    @CrossOrigin
    @GetMapping
    public
    Iterable<Member> getAllMembers() { return memberRepository.findAll();}
    @PostMapping
    public
    Member create(@Valid @RequestBody MemberJSON memberJSON) {
        Member member = new Member(memberJSON.getFull_name(), memberJSON.getGrade(),memberJSON.getAssigned_pas(),
                memberJSON.getDafsc(), memberJSON.getOffice_symbol(),memberJSON.getDuty_title(),
                memberJSON.getDuty_start_date(),memberJSON.getDuty_phone(),memberJSON.getAwardec_status(),memberJSON.getEpr_opr_status());
        return this.memberRepository.save(member);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Member> getMemberBId(@PathVariable(value = "id") Long id) throws Exception {
        Member member = memberRepository.findById(id).orElseThrow(() -> new Exception("Member not found with id ::" + id));
        return ResponseEntity.ok().body(member);
    }




}

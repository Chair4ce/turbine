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
    public @ResponseBody
    Iterable<Member> getAllMembers() {
        return memberRepository.findAll(); }

    @CrossOrigin
    @PostMapping(path = "/save")
    public Iterable<Member> addMembers(@Valid @RequestBody  Iterable<MemberJSON> json) throws Exception {
        List<Member> members = new ArrayList();
        json.forEach((item -> {
            members.add(
                    new Member(
                            item.getFull_name(),
                            item.getGrade(),
                            item.getAssigned_pas(),
                            item.getDafsc(),
                            item.getOffice_symbol(),
                            item.getDuty_title(),
                            item.getDuty_start_date(),
                            item.getDuty_phone(),
                            item.getAwardec_status(),
                            item.getEpr_opr_status()
                    )
            );
        }));
        return this.memberRepository.saveAll(members);
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

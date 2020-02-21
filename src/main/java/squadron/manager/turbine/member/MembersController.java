package squadron.manager.turbine.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(MembersController.URI)
public class MembersController {
    public static final String URI = "api/members";

    @Autowired
    private MembersRepository membersRepository;


    @CrossOrigin
    @GetMapping
    public @ResponseBody
    Iterable<MemberModel> getMembers() {
        return membersRepository.findAll();
    }

    @CrossOrigin
    @Transactional
    @PostMapping(path = "/save")
    public Iterable<MemberModel> addMembers(@Valid @RequestBody Iterable<MembersJSON> json) {
        List<MemberModel> newMembers = new ArrayList();
        json.forEach((item -> {
            newMembers.add(
                    new MemberModel(
                            verifyDuplicateSqid(item),
                            item.getTafmsd(),
                            item.getFull_name(),
                            item.getGrade(),
                            item.getAssigned_pas(),
                            item.getDafsc(),
                            item.getOffice_symbol(),
                            item.getDuty_title(),
                            item.getDuty_start_date(),
                            item.getDuty_phone(),
                            item.getSupv_name(),
                            item.getSupv_begin_date(),
                            item.getDate_arrived_station(),
                            item.getDor()
                    )
            );
        }));
        return this.membersRepository.saveAll(newMembers);
    }
   private int verifyDuplicateSqid(MembersJSON item) {

        int newSqidHash = createSqidHash(item);
        if (!this.membersRepository.findAllBySqid(newSqidHash).isEmpty()) {
            this.membersRepository.deleteAllBySqid(newSqidHash);
        }

        return newSqidHash;
    }

    private int createSqidHash(MembersJSON item) {
        if (item.getTafmsd() != null) {
            return (item.getFull_name() + item.getTafmsd()).hashCode();
        } else {
            return 0;
        }
    }
}

//    @CrossOrigin
//    @GetMapping("/{id}")
//    public ResponseEntity<SqMember> getMemberById(@PathVariable(value = "id") Long id) throws Exception {
//        System.out.println("getting member with id: " + id);
//        SqMember member = sqMemberRepository.findById(id).orElseThrow(() -> new Exception("Members not found with id ::" + id));
//        return ResponseEntity.ok().body(member);
//    }

//    @CrossOrigin
//    @GetMapping("/{PAS}")
//    public ResponseEntity<List<Members>> getMembersAssignedtoPAS(@PathVariable(value = "PAS") String PAS) throws Exception {
//        System.out.println("getting member with id: " + PAS);

//        return ResponseEntity.ok().body(member);
//    }


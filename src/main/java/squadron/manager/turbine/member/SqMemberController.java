package squadron.manager.turbine.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(SqMemberController.URI)
public class SqMemberController {
    public static final String URI = "api/sqMembers";

    @Autowired
    private SqMemberRepository sqMemberRepository;

    @Autowired
    private UploadSqMemberRepository uploadSqMemberRepository;

    @CrossOrigin
    @GetMapping
    public @ResponseBody
    Iterable<SqMember> getMembers() {
        return sqMemberRepository.findAll();
    }

    @CrossOrigin
    @PostMapping(path = "/{sq_PAS}/save")
    public Iterable<UploadSqMemberModel> addMembers(@PathVariable(value = "sq_PAS") @Valid @RequestBody  Iterable<SqMemberJSON> json, String sq_PAS) throws Exception {

        List<UploadSqMemberModel> members = new ArrayList();
        json.forEach((item -> {
            members.add(
                    new UploadSqMemberModel(
                            item.getSsan(),
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
        return this.uploadSqMemberRepository.saveAll(members);
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


}

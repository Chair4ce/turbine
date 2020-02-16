package squadron.manager.turbine.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(MembersController.URI)
public class MembersController {
    public static final String URI = "api/members";

    @Autowired
    private MembersRepository membersRepository;

    @Autowired
    private UploadSqMemberRepository uploadSqMemberRepository;

    @CrossOrigin
    @GetMapping
    public @ResponseBody
    Iterable<Members> getMembers() {
        return membersRepository.findAll();
    }

    @CrossOrigin
    @Transactional
    @PostMapping(path = "/save")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Iterable<UploadmembersModel> addMembers( @RequestBody Iterable<MembersJSON> json) {
        List<UploadmembersModel> newMembers = new ArrayList();
        json.forEach((item -> {
            newMembers.add(
                    new UploadmembersModel(
                            verifyDuplicateSqid(item),
                            item.getTafmsd(),
                            item.getFullName(),
                            item.getGrade(),
                            item.getAssignedPas(),
                            item.getDafsc(),
                            item.getOfficeSymbol(),
                            item.getDutyTitle(),
                            item.getDutyStartDate(),
                            item.getDutyPhone(),
                            item.getSupvName(),
                            item.getSupvBeginDate(),
                            item.getDateArrivedStation(),
                            item.getDor()
                    )
            );
        }));
        return this.uploadSqMemberRepository.saveAll(newMembers);
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
            return (item.getFullName() + item.getTafmsd()).hashCode();
        } else {
            return 0;
        }
    }
    @CrossOrigin
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<Members> getMemberById(@PathVariable(value = "id") Long id) throws Exception {
        System.out.println("getting member with id: " + id);
        Members member = membersRepository.findById(id).orElseThrow(() -> new Exception("Members not found with id ::" + id));
        return ResponseEntity.ok().body(member);
    }

    @CrossOrigin
    @GetMapping("/list/{pas}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<List<Members>> getMembersAssignedtoPAS(@PathVariable(value = "pas") String pas) throws Exception {
        System.out.println("getting member with id: " + pas);
        return ResponseEntity.ok().body(membersRepository.findAllByAssignedPas(pas));
    };
};



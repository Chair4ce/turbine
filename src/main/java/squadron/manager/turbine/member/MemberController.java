package squadron.manager.turbine.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(MemberController.URI)
public class MemberController {

    public static final String URI = "/api/members";

    MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @Autowired
    public void setMemberService(MemberService memberService) {
        this.memberService = memberService;
    }

    private MemberRepository memberRepository;

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
    @GetMapping(path = "/gaining")
    public @ResponseBody
    Iterable<GainingMember> getGainingMembers() {
        return memberService.getAllGainingMembers();
    }

    @CrossOrigin
    @Transactional
    @PostMapping(path = "/save")
    public Iterable<Member> addMembers(@Valid @RequestBody Iterable<MemberJSON> json) {
        return memberService.saveAndGetAllMembers(json);
    }

    @CrossOrigin
    @Transactional
    @PostMapping(path = "/gaining/save")
    public Iterable<GainingMember> addGainingMembers(@Valid @RequestBody Iterable<GainingMemberJSON> json) {
        return memberService.saveAndGetAllGainingMembers(json);
    }

    @CrossOrigin
    @GetMapping(path = "/officeCollection")
    public @ResponseBody
    List<GroupCollection> getOfficeCollection() {
        return memberService.getGroupOfficeCollections();
    }

    @CrossOrigin
    @GetMapping(path = "/DAFSCCollection")
    public @ResponseBody
    List<GroupCollection> getDAFSCCollection() {
        return memberService.getGroupDAFSCCollections();
    }

    @CrossOrigin
    @GetMapping(path = "/gaining/DAFSCCollection")
    public @ResponseBody
    List<GainingGroupCollection> getGainingDAFSCCollection() {
        return memberService.getGroupGainingDAFSCCollections();
    }
}









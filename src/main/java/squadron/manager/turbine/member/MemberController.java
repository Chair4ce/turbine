package squadron.manager.turbine.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
    @GetMapping(path = "/DAFSCCollection")
    public @ResponseBody
    List<DAFSCCollection> getDAFSCCollection() {
        List<Member> members = memberRepository.findAll();
        System.out.println(members);
        List<DAFSCCollection> dafscCollection = new ArrayList<>();
            List<String> dafscList = memberRepository.findDistinctDAFSC();
        System.out.println(dafscList);
            for (String afsc : dafscList) {
                  List<Member> memberCollection = new ArrayList<>();
                   StringBuilder newAFSC = new StringBuilder(afsc);
               if(afsc.length() >= 4) {
                   newAFSC.setCharAt(3,'X');
                   System.out.println("changing afsc to: " + newAFSC);
                   for (Member member : members) {
                       StringBuilder compareAFSC = new StringBuilder(member.getDafsc());
                        if(compareAFSC.length() >= 4) {
                            compareAFSC.setCharAt(3,'X');

                            System.out.println("comparing afscs: " + newAFSC + " & " + compareAFSC);
                            if(newAFSC.toString().equals(compareAFSC.toString())) {
                                System.out.println("FOUND MATCH: " + newAFSC + " & " + compareAFSC);
                                memberCollection.add(member);
                            }
                        }

                   }
               }
                System.out.println(memberCollection);

                if(memberCollection != null)
                dafscCollection.add(new DAFSCCollection(newAFSC.toString(), memberCollection));
            }
        return dafscCollection;
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






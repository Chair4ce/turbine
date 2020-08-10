package squadron.manager.turbine.position;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import squadron.manager.turbine.member.Member;
import squadron.manager.turbine.member.MemberRepository;
import squadron.manager.turbine.member.MemberService;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(PositionController.URI)
public class PositionController {
    public static final String URI = "/positions";

    private PositionRepository positionRepository;
    private UnassignedMemberRepository unassignedMemberRepository;
    private MemberRepository memberRepository;

    @Autowired
    public void ConstructorBasedInjection(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }



    @Autowired
    public void ConstructorBasedInjection(PositionRepository positionRepository) {
        this.positionRepository = positionRepository;
    }

    @Autowired
    public void ConstructorBasedInjection(UnassignedMemberRepository unassignedMemberRepository) {
        this.unassignedMemberRepository = unassignedMemberRepository;
    }

//
//    @CrossOrigin
//    @GetMapping
//    public @ResponseBody
//    Iterable<PositionCollectionJSON> getPositions() {
//
//
//
//        return positionRepository.findAll();
//    }

    @CrossOrigin
    @GetMapping(path = "/unassigned")
    public @ResponseBody
    Iterable<UnassignedMember> getUnassigned() {
        return unassignedMemberRepository.findAll();
    }


    @CrossOrigin
    @Transactional
    @PostMapping(path = "/save")
    public Iterable<Position> addPositions(@Valid @RequestBody Iterable<PositionJSON> json) {
        return saveOrUpdateAndReturnAllPositions(json);
    }


    public Iterable<Position> saveOrUpdateAndReturnAllPositions(@RequestBody @Valid Iterable<PositionJSON> json) {
        Date date = new Date();
        if (json != null) {
            positionRepository.deleteAll();
            json.forEach((newImport -> {
                positionRepository.save(new Position(
                        newImport.getPasCode(),
                        newImport.getOrgStructureId(),
                        newImport.getAfscAuth(),
                        newImport.getGrdAuth(),
                        newImport.getCurrQtr(),
                        newImport.getProjQtr1(),
                        newImport.getProjQtr2(),
                        newImport.getProjQtr3(),
                        newImport.getProjQtr4(),
                        newImport.getPosNr(),
                        newImport.getAssignedMbrId(),
                        newImport.getMbrName(),
                        date));
            }));
        }
        List<Position> fundedPositions = positionRepository.findAllByCurrQtrIsTrue();
        Iterable<PositionCollectionJSON> positionCollection = fundedPositions.forEach((item -> new PositionCollectionJSON(
                item.getPasCode(),
                item.getOrgStructureId(),
                item.getAfscAuth(),
                item.getGrdAuth(),
                item.getCurrQtr(),
                item.getProjQtr1(),
                item.getProjQtr2(),
                item.getProjQtr3(),
                item.getProjQtr4(),
                item.getPosNr(),
                item.getAssignedMbrId(),
                getDoubleBilletedMembers(item.getPosNr()),
                getUnfundedMembers(item.getPosNr()),
                date
        )));


        return
    }

    private List<Member> getDoubleBilletedMembers(String posNr){
          List<Position> matchedPositions = positionRepository.findAllByPosNr(posNr);
          List<Position> unfundedPositions = matchedPositions.forEach(item -> {
              if (item.getAssignedMbrId() != null && item.getCurrQtr() == "0") {
                  return memberRepository.findByMbrId(item.getAssignedMbrId());
              };
          });
          List<Member> members
          return ;
    }
    private ArrayList<Member> getUnfundedMembers(String posNr){

    }



    private Position createPositionModel(Date date, PositionJSON newImport, String positionType) {
        return new Position(
                newImport.getPasCode(),
                newImport.getOrgStructureId(),
                newImport.getAfscAuth(),
                newImport.getGrdAuth(),
                newImport.getCurrQtr(),
                newImport.getProjQtr1(),
                newImport.getProjQtr2(),
                newImport.getProjQtr3(),
                newImport.getProjQtr4(),
                newImport.getPosNr(),
                newImport.getAssignedMbrId(),
                positionType,
                date
        );
    }

    private void updateExistingPositionData(Position importingPosition, Position existingPosition) {
        existingPosition.setId(importingPosition.getId());
        existingPosition.setPasCode(importingPosition.getPasCode());
        existingPosition.setOrgStructureId(importingPosition.getOrgStructureId());
        existingPosition.setAfscAuth(importingPosition.getAfscAuth());
        existingPosition.setGrdAuth(importingPosition.getGrdAuth());
        existingPosition.setCurrQtr(importingPosition.getCurrQtr());
        existingPosition.setProjQtr1(importingPosition.getProjQtr1());
        existingPosition.setProjQtr2(importingPosition.getProjQtr2());
        existingPosition.setProjQtr3(importingPosition.getProjQtr3());
        existingPosition.setProjQtr4(importingPosition.getProjQtr4());
        existingPosition.setPosNr(importingPosition.getPosNr());
        existingPosition.setAssignedMbrId(importingPosition.getAssignedMbrId());
        existingPosition.setLastUpdated(importingPosition.getLastUpdated());
        positionRepository.save(existingPosition);
    }

}

package squadron.manager.turbine.position;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import squadron.manager.turbine.member.Member;
import squadron.manager.turbine.member.MemberJSON;
import squadron.manager.turbine.member.MemberRepository;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.Date;

@RestController
@RequestMapping(PositionController.URI)
public class PositionController {
    public static final String URI = "/positions";

    private PositionRepository positionRepository;

    @Autowired
    public void ConstructorBasedInjection(PositionRepository positionRepository) {
        this.positionRepository = positionRepository;
    }

    @CrossOrigin
    @GetMapping
    public @ResponseBody
    Iterable<Position> getPositions() {
        return positionRepository.findAll();
    }

    @CrossOrigin
    @Transactional
    @PostMapping(path = "/save")
    public Iterable<Position> addPositions(@Valid @RequestBody Iterable<PositionJSON> json) {
        return saveOrUpdateAndReturnAllPositions(json);
    }


    public Iterable<Position> saveOrUpdateAndReturnAllPositions(@RequestBody @Valid Iterable<PositionJSON> json) {
        Date date = new Date();
        json.forEach((newImport -> {
            if(newImport.getCurrQtr().equals(true)) {
                Position existingPosition = positionRepository.findByPosNrAndCurrQtr(newImport.getPosNr(), true);
                if (existingPosition == null) {
                    positionRepository.save(createPositionModel(date, newImport,"funded"));
                } else {
                    updateExistingPositionData(createPositionModel(date, newImport, "funded"), existingPosition);
                }
            }
            if(newImport.getCurrQtr().equals(false)) {
                Position existingUnfundedPosition = positionRepository.findByPosNrAndCurrQtrAndAssignedMbrId(newImport.getPosNr(), false, newImport.getAssignedMbrId());
                if (existingUnfundedPosition == null) {
                    positionRepository.save(createPositionModel(date, newImport, "unfunded"));
                } else {
                    updateExistingPositionData(createPositionModel(date, newImport, "unfunded"), existingUnfundedPosition);
                }
            }


            if(newImport.getAssignedMbrId() != null ) {
                if (newImport.getPosNr() != null && newImport.getCurrQtr() == null) {
                    if (doubleBilletedRepository.findByMbrId(newImport.getAssignedMbrId()) == null) {
                        doubleBilletedRepository.save(createDoubleBilletedMemberModel( date, newImport));
                    } else {
                        doubleBilletedRepository.deleteByMbrId(newImport.getAssignedMbrId());
                        doubleBilletedRepository.save(createDoubleBilletedMemberModel(date, newImport));
                    }
                }

                if (newImport.getPosNr() == null){
                 if (unassignedMemberRepository.findByMbrId(newImport.getAssignedMbrId()) == null) {
                     unassignedMemberRepository.save(createUnassignedMemberModel( date, newImport));
                 } else {
                     unassignedRepository.deleteByMbrId(newImport.getAssignedMbrId());
                     unassignedMemberRepository.save(createUnassignedMemberModel(date, newImport));
                 }

                }
            }
        }));
        return positionRepository.findAll();
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

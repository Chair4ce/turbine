package squadron.manager.turbine.position;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import squadron.manager.turbine.manningChart.ManningChart;
import squadron.manager.turbine.member.Member;
import squadron.manager.turbine.member.MemberRepository;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(PositionController.URI)
public class PositionController {
    public static final String URI = "/positions";

    private PositionRepository positionRepository;
    private MemberRepository memberRepository;

    @Autowired
    public void ConstructorBasedInjection(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }


    @Autowired
    public void ConstructorBasedInjection(PositionRepository positionRepository) {
        this.positionRepository = positionRepository;
    }


    @CrossOrigin
    @Transactional
    @PostMapping(path = "/save")
    public Iterable<Position> addPositions(@Valid @RequestBody Iterable<PositionJSON> json) {
        return saveOrUpdateAndReturnAllPositions(json);
    }

    @CrossOrigin
    @GetMapping(path = "/unfunded")
    public @ResponseBody
    Iterable<Member> getUnfunded() {
        List<Position> positions = positionRepository.findAllByPosNrIsNotNullAndCurrQtr("0");
        ArrayList<Member> unfunded = new ArrayList<>();
        positions.forEach(item -> unfunded.add(memberRepository.findByMbrId(item.getMbrIdAssigned())));
        return unfunded;
    }

    @CrossOrigin
    @GetMapping(path = "/double")
    public @ResponseBody
    Iterable<Member> getDouble() {
        List<Position> positions = positionRepository.findAllByPosNrIsNotNullAndCurrQtrIsNull();
        ArrayList<Member> unAssigned = new ArrayList<>();
        positions.forEach(item -> unAssigned.add(memberRepository.findByMbrId(item.getMbrIdAssigned())));
        return unAssigned;
    }

    @CrossOrigin
    @GetMapping(path = "/unassigned")
    public @ResponseBody
    Iterable<Member> getUnassigned() {
        List<Position> positions = positionRepository.findAllByPosNrIsNull();
        ArrayList<Member> unAssigned = new ArrayList<>();
        positions.forEach(item -> unAssigned.add(memberRepository.findByMbrId(item.getMbrIdAssigned())));
        return unAssigned;
    }

    @CrossOrigin
    @GetMapping(path = "/projected")
    public @ResponseBody
    List<ManningChart> getAuthorized() {
        List<String> distinctAFSC = memberRepository.findDistinctAFSCs();
        System.out.println( distinctAFSC);
        List<ManningChart> ChartData = new ArrayList<>();
        for (String AFSC : distinctAFSC) {
            ChartData.add( new ManningChart(AFSC, memberRepository.countAllByDafscAndDafscIsNotNull(AFSC), positionRepository.countAllByAfscAuthAndCurrQtr(AFSC, "1")  ));
        }
        return ChartData;
    }

//    List<ManningChart> getCurrentCountOfEachAFSC() {
//        List<String> distinctAFSC = memberRepository.findDistinctAFSCs();
//        System.out.println( distinctAFSC);
//        List<ManningChart> ChartData = new ArrayList<>();
//        for (String AFSC : distinctAFSC) {
//            ChartData.add( new ManningChart(AFSC, memberRepository.findAFSCCount(AFSC).size()));
//        }
//        return ChartData;
//    }

    void iterateBetweenDatesJava8(LocalDate start, LocalDate end) {
        for (LocalDate date = start; date.isBefore(end); date = date.plusDays(1)) {

        }
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
                        newImport.getGradeAssigned(),
                        newImport.getDafscAssigned(),
                        newImport.getNameAssigned(),
                        newImport.getMbrIdAssigned(),
                        date));
            }));
        }
        return positionRepository.findAll();
    }

    private ArrayList<Position> getUnfundedMembers(String posNr) {
        List<Position> matchedPositions;
        if (positionRepository.findAllByPosNr(posNr).isEmpty()) {
            matchedPositions = Collections.emptyList();
        } else {
            matchedPositions = positionRepository.findAllByPosNr(posNr);
        }
        ArrayList<Position> unfundedPositions = new ArrayList<>();

        if (matchedPositions.equals(Collections.emptyList())) {
           return unfundedPositions;
        } else {
            matchedPositions.forEach(item -> {
                if (item.getCurrQtr().equals("0")) {
                    unfundedPositions.add(item);
                }

            });
        }
        return unfundedPositions;
    }

    private ArrayList<Position> getDoubleBilletedMembers(String posNr) {
        List<Position> matchedPositions;
        if (positionRepository.findAllByPosNr(posNr).isEmpty()) {
            matchedPositions = Collections.emptyList();
        } else {
            matchedPositions = positionRepository.findAllByPosNr(posNr);
        }
        ArrayList<Position> doubleBilletedPositions = new ArrayList<>();

        if (matchedPositions.equals(Collections.emptyList())) {
            return doubleBilletedPositions;
        } else {
            matchedPositions.forEach(item -> {
                if (item.getCurrQtr().isEmpty()) {
                    doubleBilletedPositions.add(item);
                }
            });
        }
        return doubleBilletedPositions;
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
                newImport.getGradeAssigned(),
                newImport.getDafscAssigned(),
                newImport.getNameAssigned(),
                newImport.getMbrIdAssigned(),
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
        existingPosition.setGradeAssigned(importingPosition.getGradeAssigned());
        existingPosition.setDafscAssigned(importingPosition.getDafscAssigned());
        existingPosition.setNameAssigned(importingPosition.getNameAssigned());
        existingPosition.setMbrIdAssigned(importingPosition.getMbrIdAssigned());
        existingPosition.setLastUpdated(importingPosition.getLastUpdated());
        positionRepository.save(existingPosition);
    }

}

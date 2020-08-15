package squadron.manager.turbine.position;


import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import squadron.manager.turbine.manningChart.AFSCIncrementLog;
import squadron.manager.turbine.manningChart.AFSCIncrementRepository;
import squadron.manager.turbine.member.GainingMemberRepository;
import squadron.manager.turbine.member.Member;
import squadron.manager.turbine.member.MemberRepository;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping(PositionController.URI)
public class PositionController {
    public static final String URI = "/positions";

    private PositionRepository positionRepository;
    private MemberRepository memberRepository;
    private GainingMemberRepository gainingRepository;
    private AFSCIncrementRepository afscIncrementRepository;

    @Autowired
    public void ConstructorBasedInjection(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Autowired
    public void ConstructorBasedInjection(AFSCIncrementRepository afscIncrementRepository) {
        this.afscIncrementRepository = afscIncrementRepository;
    }

    @Autowired
    public void ConstructorBasedInjection(GainingMemberRepository gainingRepository) {
        this.gainingRepository = gainingRepository;
    }


    @Autowired
    public void ConstructorBasedInjection(PositionRepository positionRepository) {
        this.positionRepository = positionRepository;
    }


    @CrossOrigin
    @Transactional
    @PostMapping(path = "/save")
    public Iterable<Position> addPositions(@Valid @RequestBody List<PositionJSON> json) {
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
    @GetMapping(path = "/manning_chart")
    public @ResponseBody
    List<AFSCIncrementLog> getManningChartData() {
        List<String> distinctAFSC = positionRepository.findDistinctAfscAuth();

        List<AFSCIncrementLog> ChartData = new ArrayList<>();
        for (String AFSC : distinctAFSC) {
            double current = positionRepository.countAllByDafscAssigned(AFSC);
            double assigned = positionRepository.countAllByAfscAuthAndCurrQtrAndPosNrIsNotNull(AFSC, "1");
            List<AFSCIncrementLog> totalGaining = afscIncrementRepository.findAllByAfscAndIncrementType(AFSC,"arrival");
            List<AFSCIncrementLog> totalDeparting = afscIncrementRepository.findAllByAfscAndIncrementType(AFSC,"departure");
            List<AFSCIncrementLog> totalToBeUnfunded = afscIncrementRepository.findAllByAfscAndIncrementType(AFSC,"unfunded");
            LocalDate localDate = new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            int thisMonth = localDate.getMonthValue();



//            Interval interval = null;
//            if (interval.contains(dateTime) || interval.getEnd().isEqual(dateTime))
//                DateTimeZone zone = DateTimeZone.forID( "America/Montreal" );
//            DateTime dateTime = new DateTime( yourJUDate, zone );  // Convert java.util.Date to Joda-Time, and assign time zone to adjust.
//            DateTime now = DateTime.now( zone );
// Now see if the month and year match.
//            if ( ( dateTime.getMonthOfYear() == now.getMonthOfYear() ) && ( dateTime.getYear() == now.getYear() ) ) {
//                // You have a hit.
//            }

//            ChartData.add( new ManningChart(AFSC,"jan", PercentageCalculator.calculatePercentage(current, assigned) ));
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

    public Iterable<Position> saveOrUpdateAndReturnAllPositions(@RequestBody @Valid List<PositionJSON> json) {
        Date date = new Date();
        if (json != null) {
            List<String> pasCodes = json.stream()
                    .map(PositionJSON::getPasCode)
                    .distinct()
                    .collect(toList());

            for (String pasCode : pasCodes) {
                positionRepository.deleteAllByPasCode(pasCode);
            }

            json.forEach((newImport -> {

                if (newImport.getPosNr() != null && newImport.getCurrQtr() != null) {
                    if (newImport.getCurrQtr().equals("1")) {
                        if (isDefunded(newImport)) {
                           Date DayPositionUnfunded = lastDayOfUnfundedQtr(newImport.getProjQtr1(), newImport.getProjQtr2(), newImport.getProjQtr3());
                           if(memberRepository.findByMbrId(newImport.getMbrIdAssigned()) != null){
                               Member mbrInUnfundedBillet = memberRepository.findByMbrId(newImport.getMbrIdAssigned());
                               if(new DateTime(mbrInUnfundedBillet.getDeros()).toDate().before(DayPositionUnfunded)) {
                                   System.out.println("unfunded date delayed");
                                   logPositionChange(newImport, new DateTime(mbrInUnfundedBillet.getDeros()).toDate());
                               } else {
                                   System.out.println("unfunded date natural");
                                   logPositionChange(newImport, DayPositionUnfunded);
                               }
                           }


                        }
                    }

                }


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

    public boolean isDefunded(PositionJSON newImport) {
        return newImport.getCurrQtr().equals("1") && isProjUnfunded(newImport.getProjQtr1(), newImport.getProjQtr2(), newImport.getProjQtr3(), newImport.getProjQtr4());
    }

    public void logPositionChange(PositionJSON newImport, Date dateChanged) {
        AFSCIncrementLog new_log = new AFSCIncrementLog(
                newImport.getPasCode(),
                newImport.getPosNr(),
                newImport.getAfscAuth() != null ? newImport.getAfscAuth().replaceAll("-", "") : null,
                dateChanged,
                -1,
                "unfunded"
        );
        afscIncrementRepository.save(new_log);
    }

    private Date lastDayOfUnfundedQtr(String qtr1, String qtr2, String qtr3) {
        int thisYear = new DateTime().getYear();
        String lastMonthQtr1 = "3/25/" + thisYear;
        String lastMonthQtr2 = "6/25/" + thisYear;
        String lastMonthQtr3 = "9/25/" + thisYear;
        String lastMonthQtr4 = "12/25/" + thisYear;
        if (qtr1.equals("0")) {
            return new DateTime(getLastDayOfMonth(lastMonthQtr1).toString()).toDate();
        } else if (qtr2.equals("0")) {
            return new DateTime(getLastDayOfMonth(lastMonthQtr2).toString()).toDate();
        } else if (qtr3.equals("0")) {
            return new DateTime(getLastDayOfMonth(lastMonthQtr3).toString()).toDate();
        } else {
            return new DateTime(getLastDayOfMonth(lastMonthQtr4).toString()).toDate();
        }
    }

    public boolean isProjUnfunded(String qtr1, String qtr2, String qtr3, String qtr4) {
        return qtr1.equals("0") || qtr2.equals("0") || qtr3.equals("0") || qtr4.equals("0");
    }

    LocalDate getLastDayOfMonth(String lastMonthQtr1) {
        LocalDate convertedDate = LocalDate.parse(lastMonthQtr1, DateTimeFormatter.ofPattern("M/d/yyyy"));
        convertedDate = convertedDate.withDayOfMonth(
                convertedDate.getMonth().length(convertedDate.isLeapYear()));
        return convertedDate;
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

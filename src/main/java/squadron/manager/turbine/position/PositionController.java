package squadron.manager.turbine.position;


import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import squadron.manager.turbine.incrementLog.AFSCIncrementLog;
import squadron.manager.turbine.incrementLog.AFSCIncrementRepository;
import squadron.manager.turbine.incrementLog.PercentageCalculator;
import squadron.manager.turbine.manningChart.AFSCManningChartData;
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
    private AfscChartRepository afscChartRepository;

    @Autowired
    public void ConstructorBasedInjection(MemberRepository memberRepository,
                                          AFSCIncrementRepository afscIncrementRepository,
                                          GainingMemberRepository gainingRepository,
                                          PositionRepository positionRepository,
                                          AfscChartRepository afscChartRepository) {
        this.memberRepository = memberRepository;
        this.afscIncrementRepository = afscIncrementRepository;
        this.gainingRepository = gainingRepository;
        this.positionRepository = positionRepository;
        this.afscChartRepository = afscChartRepository;
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
        ArrayList<Member> unfunded = null;
        positions.forEach(item -> unfunded.add(memberRepository.findByMbrId(item.getMbrIdAssigned())));
        return unfunded;
    }

    @CrossOrigin
    @GetMapping(path = "/double")
    public @ResponseBody
    Iterable<Member> getDouble() {
        List<Position> positions = positionRepository.findAllByPosNrIsNotNullAndCurrQtrIsNull();
        ArrayList<Member> unAssigned = null;
        positions.forEach(item -> unAssigned.add(memberRepository.findByMbrId(item.getMbrIdAssigned())));
        return unAssigned;
    }

    @CrossOrigin
    @GetMapping(path = "/unassigned")
    public @ResponseBody
    Iterable<Member> getUnassigned() {
        List<Position> positions = positionRepository.findAllByPosNrIsNull();
        ArrayList<Member> unAssigned = null;
        positions.forEach(item -> unAssigned.add(memberRepository.findByMbrId(item.getMbrIdAssigned())));
        return unAssigned;
    }

    @CrossOrigin
    @GetMapping(path = "/manning_chart")
    public @ResponseBody
    List<AFSCManningChartData> getManningChartData() {
        List<String> distinctAFSC = positionRepository.findDistinctAfscAuth();
        LocalDate localDate = new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        int thisMonth = localDate.getMonthValue();
        int thisYear = new DateTime().getYear();
        distinctAFSC.forEach((afsc) -> {
            int assigned = getAssigned(afsc);
            int authorized = getAuthorized(afsc);

            for (int i = thisMonth; i <= 12; i++) {
            afscChartRepository.save(new AfscChart(afsc,assigned,authorized,i,thisYear,PercentageCalculator.calculatePercentage(assigned,authorized)));
            }
        });


        //        int thisMonth = localDate.getMonthValue();
//        int thisYear = new DateTime().getYear();
//        int nextYear = new DateTime().plusYears(1).getYear();
//        int inTwoYears = new DateTime().plusYears(2).getYear();
//        int inThreeYears = new DateTime().plusYears(3).getYear();
//        List<AFSCManningChartData> chartData;
//
//        for (String AFSC : distinctAFSC) {
//            int assigned = positionRepository.countAllByDafscAssigned(AFSC);
//            int authorized = positionRepository.countAllByAfscAuthAndCurrQtrAndPosNrIsNotNull(AFSC, "1");
//
//            List<AFSCIncrementLog> allIncrementsForAFSC = afscIncrementRepository.findAllByAfsc(AFSC);
//            List<AFSCIncrementLog> IncrementsThisYear = getIncrementsByYear(allIncrementsForAFSC, thisYear);
//            List<AFSCIncrementLog> IncrementsNextYear = getIncrementsByYear(allIncrementsForAFSC, nextYear);
//            List<AFSCIncrementLog> IncrementsInTwoYears = getIncrementsByYear(allIncrementsForAFSC, inTwoYears);
//            List<AFSCIncrementLog> IncrementsInThreeYears = getIncrementsByYear(allIncrementsForAFSC, inThreeYears);
//
//            for (int i = thisMonth; i <= 12 - thisMonth; i++) {
//                for (AFSCIncrementLog increment : IncrementsThisYear) {
//                    if (increment.getIncrementDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getMonthValue() == i) {
//                        switch (increment.getIncrementType()) {
//                            case "arrival":
//                                assigned++;
//                                break;
//                            case "departure":
//                                assigned--;
//                                break;
//                            case "unfunded":
//                                authorized--;
//                                break;
//                        }
//                    }
//                }
//                chartData.add(new AFSCManningChartData(
//                        AFSC,
//                        i + "-" + Integer.toString(thisYear).substring(2,4),
//                        PercentageCalculator.calculatePercentage(assigned, authorized)));
////
//            }
//
//            for (int i = 1; i <= 12; i++) {
//                for (AFSCIncrementLog increment : IncrementsNextYear) {
//                    if (increment.getIncrementDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getMonthValue() == i) {
//                        switch (increment.getIncrementType()) {
//                            case "arrival":
//                                assigned++;
//                                break;
//                            case "departure":
//                                assigned--;
//                                break;
//                            case "unfunded":
//                                authorized--;
//                                break;
//                        }
//                    }
//                }
//                chartData.add(new AFSCManningChartData(
//                        AFSC,
//                        i + "-" + Integer.toString(nextYear).substring(2,4),
//                        PercentageCalculator.calculatePercentage(assigned, authorized)));
////
//            }
//
//            for (int i = 1; i <= 12; i++) {
//                for (AFSCIncrementLog increment : IncrementsInTwoYears) {
//                    if (increment.getIncrementDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getMonthValue() == i) {
//                        switch (increment.getIncrementType()) {
//                            case "arrival":
//                                assigned++;
//                                break;
//                            case "departure":
//                                assigned--;
//                                break;
//                            case "unfunded":
//                                authorized--;
//                                break;
//                        }
//                    }
//                }
//                chartData.add(new AFSCManningChartData(
//                        AFSC,
//                        i + "-" + Integer.toString(inTwoYears).substring(2,4),
//                        PercentageCalculator.calculatePercentage(assigned, authorized)));
////                System.out.println(i + " - " + thisYear + " : " + AFSC + " : " + PercentageCalculator.calculatePercentage(assigned, authorized));
//            }
//
//            for (int i = 1; i <= 12; i++) {
//                for (AFSCIncrementLog increment : IncrementsInThreeYears) {
//                    if (increment.getIncrementDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getMonthValue() == i) {
//                        switch (increment.getIncrementType()) {
//                            case "arrival":
//                                assigned++;
//                                break;
//                            case "departure":
//                                assigned--;
//                                break;
//                            case "unfunded":
//                                authorized--;
//                                break;
//                        }
//                    }
//                }
//                chartData.add(new AFSCManningChartData(
//                        AFSC,
//                        i + "-" + Integer.toString(inThreeYears).substring(2,4),
//                        PercentageCalculator.calculatePercentage(assigned, authorized)));
//            }
//        }
//
////


        return null;
    }

    private String getMonthFromValue(int month) {
        switch (month) {
            case 1:
                return "Jan";
            case 2:
                return "Feb";
            case 3:
                return "Mar";
            case 4:
                return "Apr";
            case 5:
                return "May";
            case 6:
                return "Jun";
            case 7:
                return "Jul";
            case 8:
                return "Aug";
            case 9:
                return "Sep";
            case 10:
                return "Oct";
            case 11:
                return "Nov";
            case 12:
                return "Dec";
            default:
                return "";
        }
    }

    private int getAssigned(String afsc) {
       return positionRepository.countAllByAfscAuthAndCurrQtrIsNotNullAndPosNrIsNotNull(afsc);
    }
    private int getAuthorized(String afsc) {
       return positionRepository.countAllByAfscAuthAndCurrQtrAndPosNrIsNotNull(afsc, "1");
    }

    private List<AFSCIncrementLog> getIncrementsByYear(List<AFSCIncrementLog> allIncrements, int year) {
        List<AFSCIncrementLog> IncrementsOfYear = new ArrayList<>();


        for (AFSCIncrementLog increment : allIncrements) {
            if (new DateTime(increment.getIncrementDate()).getYear() == year) {


                IncrementsOfYear.add(increment);
            }
        }

        return IncrementsOfYear;
    }


    private List<AFSCManningChartData> compileChartDataByYear(int year, int month, String AFSC, int current,
                                                              int authorized, List<
            AFSCIncrementLog> totalGaining, List<AFSCIncrementLog> totalDeparting, List<AFSCIncrementLog> totalToBeUnfunded) {
        List<AFSCManningChartData> chartData = new ArrayList<>();
        for (int i = month; i <= 12 - month; i++) {
            for (AFSCIncrementLog gainingMember : totalGaining) {
                if (new DateTime(gainingMember.getIncrementDate()).getYear() == year) {
                    if (gainingMember.getIncrementDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getMonthValue() == i) {
                        current = current + 1;
                    }
                }

            }
            for (AFSCIncrementLog departingMember : totalDeparting) {
                if (new DateTime(departingMember.getIncrementDate()).getYear() == year) {
                    if (departingMember.getIncrementDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getMonthValue() == i) {
                        current = current - 1;
                    }
                }

            }
            for (AFSCIncrementLog toBeUnfunded : totalToBeUnfunded) {
                if (new DateTime(toBeUnfunded.getIncrementDate()).getYear() == year) {
                    if (toBeUnfunded.getIncrementDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getMonthValue() == i) {
                        authorized = authorized - 1;
                    }
                }

            }
            chartData.add(new AFSCManningChartData(AFSC, new DateTime().toString("Mmm") + " - " + year, PercentageCalculator.calculatePercentage(current, authorized)));
        }
        return chartData;
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
                            if (memberRepository.findByMbrId(newImport.getMbrIdAssigned()) != null) {
                                Member mbrInUnfundedBillet = memberRepository.findByMbrId(newImport.getMbrIdAssigned());
                                if (new DateTime(mbrInUnfundedBillet.getDeros()).toDate().before(DayPositionUnfunded)) {
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

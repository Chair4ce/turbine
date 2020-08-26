package squadron.manager.turbine.position;


import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import squadron.manager.turbine.afscChart.AfscChart;
import squadron.manager.turbine.afscChart.AfscChartRepository;
import squadron.manager.turbine.afscPositions.AFSCCollection;
import squadron.manager.turbine.afscPositions.PositionType;
import squadron.manager.turbine.afscPositions.SkillLevelGroup;
import squadron.manager.turbine.incrementLog.AFSCIncrementLog;
import squadron.manager.turbine.incrementLog.AFSCIncrementRepository;
import squadron.manager.turbine.incrementLog.PercentageCalculator;
import squadron.manager.turbine.manningChart.AFSCManningChartData;
import squadron.manager.turbine.gainingMember.GainingMember;
import squadron.manager.turbine.gainingMember.GainingMemberRepository;
import squadron.manager.turbine.member.GroupCollection;
import squadron.manager.turbine.member.Member;
import squadron.manager.turbine.member.MemberRepository;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.nio.channels.SelectionKey;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.IsoFields;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

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
    public List<Position> addPositions(@Valid @RequestBody List<PositionJSON> json) {
        return saveOrUpdateAndReturnAllPositions(json);
    }


    @CrossOrigin
    @GetMapping(path = "/AFSCCardInfo")
    public @ResponseBody
    List<AFSCCollection> getAFSCCardInfo(@RequestParam(value = "afsc") String afsc) {
        List<Member> allMembers = memberRepository.findAll();
        List<Position> allPositions = positionRepository.findAll();
        List<AFSCIncrementLog> allIncrements = afscIncrementRepository.findAll();

        StringBuilder AFSCSkill3 = new StringBuilder(afsc);
        StringBuilder AFSCSkill5 = new StringBuilder(afsc);
        StringBuilder AFSCSkill7 = new StringBuilder(afsc);
//        StringBuilder AFSCSkill9 = new StringBuilder(afsc);

        AFSCSkill3.setCharAt(3, '3');
        AFSCSkill5.setCharAt(3, '5');
        AFSCSkill7.setCharAt(3, '7');
//        AFSCSkill9.setCharAt(3, '9');

        //Find all funded positions by Skill level
        List<Position> all3LevelFundedPositions = positionRepository.findAllByAfscAuthAndPosNrIsNotNullAndCurrQtr(AFSCSkill3.toString(), "1");
        List<Position> all5LevelFundedPositions = positionRepository.findAllByAfscAuthAndPosNrIsNotNullAndCurrQtr(AFSCSkill5.toString(), "1");
        List<Position> all7LevelFundedPositions = positionRepository.findAllByAfscAuthAndPosNrIsNotNullAndCurrQtr(AFSCSkill7.toString(), "1");
//        List<Position> all9LevelFundedPositions = positionRepository.findAllByAfscAuthAndPosNrIsNotNullAndCurrQtr(AFSCSkill9.toString(), "1");

        //Find all Members assigned to unfunded Positions by skill level
        List<Position> all3LevelUnfundedPositions = positionRepository.findAllByAfscAuthAndPosNrIsNotNullAndCurrQtr(AFSCSkill3.toString(), "0");
        List<Position> all5LevelUnfundedPositions = positionRepository.findAllByAfscAuthAndPosNrIsNotNullAndCurrQtr(AFSCSkill5.toString(), "0");
        List<Position> all7LevelUnfundedPositions = positionRepository.findAllByAfscAuthAndPosNrIsNotNullAndCurrQtr(AFSCSkill7.toString(), "0");
//        List<Position> all9LevelUnfundedPositions = positionRepository.findAllByAfscAuthAndPosNrIsNotNullAndCurrQtr(AFSCSkill9.toString(), "0");

        List<AFSCCollection> afscCollectionList = new ArrayList<>();
        List<SkillLevelGroup> allAFSCSkilllvlGroups = new ArrayList<>();

        List<SkillLevelGroup> skill3lvlGroup = new ArrayList<>();
        List<PositionType> all3lvlPositionTypes = new ArrayList<>();
        List<SkillLevelGroup> skill5lvlGroup = new ArrayList<>();
        List<PositionType> all5lvlPositionTypes = new ArrayList<>();
        List<SkillLevelGroup> skill7lvlGroup = new ArrayList<>();
        List<PositionType> all7lvlPositionTypes = new ArrayList<>();
//        List<SkillLevelGroup> skill9lvlGroup = new ArrayList<>();
//        List<PositionType> all9lvlPositionTypes = new ArrayList<>();

        List<PositionType> Funded3Lvl = new ArrayList<>();
        List<PositionType> Funded5Lvl = new ArrayList<>();
        List<PositionType> Funded7Lvl = new ArrayList<>();
//        List<PositionType> Funded9Lvl = new ArrayList<>();

        List<PositionType> Unfunded3Lvl = new ArrayList<>();
        List<PositionType> Unfunded5Lvl = new ArrayList<>();
        List<PositionType> Unfunded7Lvl = new ArrayList<>();
//        List<PositionType> Unfunded9Lvl = new ArrayList<>();


        List<PositionType> doubleBilleted3Level = new ArrayList<>();
        List<PositionType> doubleBilleted5Level = new ArrayList<>();
        List<PositionType> doubleBilleted7Level = new ArrayList<>();
//        List<PositionType> doubleBilleted9Level = new ArrayList<>();

        //Find all Members Assigned to DoubleBilleted Positions by skill Level
        for (Position item : all3LevelFundedPositions) {
            if (item.getMbrIdAssigned() != null) {
                if (memberRepository.findByMbrId(item.getMbrIdAssigned()) != null) {
                    Funded3Lvl.add(new PositionType("Funded-Assigned", item.getPosNr(), item.getGrdAuth(), memberRepository.findByMbrId(item.getMbrIdAssigned())));
                } else {
                    Funded3Lvl.add(new PositionType("Funded-Assigned-NoMbrData", item.getPosNr(), item.getGrdAuth(), null));
                }
            } else {
                Funded3Lvl.add(new PositionType("Funded-Unassigned", item.getPosNr(), item.getGrdAuth(), null));
            }

            if (positionRepository.findAllByPosNrAndAfscAuthIsNullAndCurrQtrIsNull(item.getPosNr()).size() > 0) {
                for (Position position : positionRepository.findAllByPosNrAndAfscAuthIsNullAndCurrQtrIsNull(item.getPosNr())) {
                    if (memberRepository.findByMbrId(item.getMbrIdAssigned()) != null) {
                        doubleBilleted3Level.add(new PositionType("Double", item.getPosNr(), item.getGrdAuth(), memberRepository.findByMbrId(item.getMbrIdAssigned())));
                    } else {
                        doubleBilleted3Level.add(new PositionType("Double", item.getPosNr(), item.getGrdAuth(), null));
                    }
                }
            }
        }


        //Find all Members Assigned to DoubleBilleted Positions by skill Level
        for (Position item : all5LevelFundedPositions) {
            if (item.getMbrIdAssigned() != null) {
                if (memberRepository.findByMbrId(item.getMbrIdAssigned()) != null) {
                    Funded5Lvl.add(new PositionType("Funded-Assigned", item.getPosNr(), item.getGrdAuth(), memberRepository.findByMbrId(item.getMbrIdAssigned())));
                } else {
                    Funded5Lvl.add(new PositionType("Funded-Assigned-NoMbrData", item.getPosNr(), item.getGrdAuth(), null));
                }
            } else {
                Funded5Lvl.add(new PositionType("Unassigned", item.getPosNr(), item.getGrdAuth(), null));
            }
            if (positionRepository.findAllByPosNrAndAfscAuthIsNullAndCurrQtrIsNull(item.getPosNr()).size() > 0) {
                for (Position position : positionRepository.findAllByPosNrAndAfscAuthIsNullAndCurrQtrIsNull(item.getPosNr())) {
                    if (memberRepository.findByMbrId(item.getMbrIdAssigned()) != null) {
                        doubleBilleted5Level.add(new PositionType("Double", item.getPosNr(), item.getGrdAuth(), memberRepository.findByMbrId(item.getMbrIdAssigned())));
                    } else {
                        doubleBilleted5Level.add(new PositionType("Double", item.getPosNr(), item.getGrdAuth(), null));
                    }
                }
            }
        }


        //Find all Members Assigned to DoubleBilleted Positions by skill Level
        for (Position item : all7LevelFundedPositions) {
            if (item.getMbrIdAssigned() != null) {
                if (memberRepository.findByMbrId(item.getMbrIdAssigned()) != null) {
                    Funded7Lvl.add(new PositionType("Funded-Assigned", item.getPosNr(), item.getGrdAuth(), memberRepository.findByMbrId(item.getMbrIdAssigned())));
                } else {
                    Funded7Lvl.add(new PositionType("Funded-Assigned-NoMbrData", item.getPosNr(), item.getGrdAuth(), null));
                }
            } else {
                Funded7Lvl.add(new PositionType("Unassigned", item.getPosNr(), item.getGrdAuth(), null));
            }
            if (positionRepository.findAllByPosNrAndAfscAuthIsNullAndCurrQtrIsNull(item.getPosNr()).size() > 0) {
                for (Position position : positionRepository.findAllByPosNrAndAfscAuthIsNullAndCurrQtrIsNull(item.getPosNr())) {
                    if (memberRepository.findByMbrId(item.getMbrIdAssigned()) != null) {
                        doubleBilleted7Level.add(new PositionType("Double", item.getPosNr(), item.getGrdAuth(), memberRepository.findByMbrId(item.getMbrIdAssigned())));
                    } else {
                        doubleBilleted7Level.add(new PositionType("Double", item.getPosNr(), item.getGrdAuth(), null));
                    }
                }
            }
        }


//        //Find all Members Assigned to DoubleBilleted Positions by skill Level
//        for (Position item : all9LevelFundedPositions) {
//            if (item.getMbrIdAssigned() != null) {
//                if (memberRepository.findByMbrId(item.getMbrIdAssigned()) != null) {
//                    Funded9Lvl.add(new PositionType("Funded", item.getPosNr(), item.getGrdAuth(), memberRepository.findByMbrId(item.getMbrIdAssigned())));
//                } else {
//                    Funded9Lvl.add(new PositionType("Funded", item.getPosNr(), item.getGrdAuth(), null));
//                }
//            } else {
//                Funded9Lvl.add(new PositionType("Unassigned", item.getPosNr(), item.getGrdAuth(), null));
//            }
//            if (positionRepository.findAllByPosNrAndAfscAuthIsNullAndCurrQtrIsNull(item.getPosNr()).size() > 0) {
//                for (Position position : positionRepository.findAllByPosNrAndAfscAuthIsNullAndCurrQtrIsNull(item.getPosNr())) {
//                    if (memberRepository.findByMbrId(item.getMbrIdAssigned()) != null) {
//                        doubleBilleted9Level.add(new PositionType("Double", item.getPosNr(), item.getGrdAuth(), memberRepository.findByMbrId(item.getMbrIdAssigned())));
//                    } else {
//                        doubleBilleted9Level.add(new PositionType("Double", item.getPosNr(), item.getGrdAuth(), null));
//                    }
//                }
//            }
//        }

        all3LevelUnfundedPositions.forEach((item) -> {
            if (item.getMbrIdAssigned() != null) {
                if (memberRepository.findByMbrId(item.getMbrIdAssigned()) != null) {
                    Unfunded3Lvl.add(new PositionType("Unfunded-Assigned", item.getPosNr(), item.getGrdAuth(), memberRepository.findByMbrId(item.getMbrIdAssigned())));
                } else {
                    Unfunded3Lvl.add(new PositionType("Unfunded-NoMbrData", item.getPosNr(), item.getGrdAuth(), null));
                }
            }
        });

        all5LevelUnfundedPositions.forEach((item) -> {
            if (item.getMbrIdAssigned() != null) {
                if (memberRepository.findByMbrId(item.getMbrIdAssigned()) != null) {
                    Unfunded5Lvl.add(new PositionType("Unfunded-Assigned", item.getPosNr(), item.getGrdAuth(), memberRepository.findByMbrId(item.getMbrIdAssigned())));
                } else {
                    Unfunded5Lvl.add(new PositionType("Unfunded-NoMbrData", item.getPosNr(), item.getGrdAuth(), null));
                }
            }
        });

        all7LevelUnfundedPositions.forEach((item) -> {
            if (item.getMbrIdAssigned() != null) {
                if (memberRepository.findByMbrId(item.getMbrIdAssigned()) != null) {
                    Unfunded7Lvl.add(new PositionType("Unfunded-Assigned", item.getPosNr(), item.getGrdAuth(), memberRepository.findByMbrId(item.getMbrIdAssigned())));
                } else {
                    Unfunded7Lvl.add(new PositionType("Unfunded-NoMbrData", item.getPosNr(), item.getGrdAuth(), null));
                }
            }
        });

//        all9LevelUnfundedPositions.forEach((item) -> {
//            if (item.getMbrIdAssigned() != null) {
//                if (memberRepository.findByMbrId(item.getMbrIdAssigned()) != null) {
//                    Unfunded9Lvl.add(new PositionType("Unfunded", item.getPosNr(), item.getGrdAuth(), memberRepository.findByMbrId(item.getMbrIdAssigned())));
//                } else {
//                    Unfunded9Lvl.add(new PositionType("Unfunded", item.getPosNr(), item.getGrdAuth(), null));
//                }
//            } else {
//                Unfunded9Lvl.add(new PositionType("Unassigned", item.getPosNr(), item.getGrdAuth(), null));
//            }
//        });

        all3lvlPositionTypes.addAll(Funded3Lvl);
        all3lvlPositionTypes.addAll(Unfunded3Lvl);
        all3lvlPositionTypes.addAll(doubleBilleted3Level);

        all5lvlPositionTypes.addAll(Funded5Lvl);
        all5lvlPositionTypes.addAll(Unfunded5Lvl);
        all5lvlPositionTypes.addAll(doubleBilleted5Level);

        all7lvlPositionTypes.addAll(Funded7Lvl);
        all7lvlPositionTypes.addAll(Unfunded7Lvl);
        all7lvlPositionTypes.addAll(doubleBilleted7Level);

//        all9lvlPositionTypes.addAll(Funded9Lvl);
//        all9lvlPositionTypes.addAll(Unfunded9Lvl);
//        all9lvlPositionTypes.addAll(doubleBilleted9Level);


        skill3lvlGroup.add(new SkillLevelGroup(AFSCSkill3.toString(), 4,all3LevelFundedPositions.size(),4,4,"100%",all3lvlPositionTypes));
        skill5lvlGroup.add(new SkillLevelGroup(AFSCSkill5.toString(), 4,all5LevelFundedPositions.size(),4,4,"100%",all5lvlPositionTypes));
        skill7lvlGroup.add(new SkillLevelGroup(AFSCSkill7.toString(), 4,all7LevelFundedPositions.size(),4,4,"100%",all7lvlPositionTypes));
//        skill9lvlGroup.add(new SkillLevelGroup(AFSCSkill9.toString(), 4,4,4,4,"100%",all9lvlPositionTypes));

        allAFSCSkilllvlGroups.addAll(skill3lvlGroup);
        allAFSCSkilllvlGroups.addAll(skill5lvlGroup);
        allAFSCSkilllvlGroups.addAll(skill7lvlGroup);
//        allAFSCSkilllvlGroups.addAll(skill9lvlGroup);

        afscCollectionList.add(new AFSCCollection(afsc,4,4,4,4,"100%", allAFSCSkilllvlGroups));

        return afscCollectionList;
    }

    @CrossOrigin
    @GetMapping(path = "/double")
    public @ResponseBody
    List<Member> getDouble() {
        List<Position> positions = positionRepository.findAllByPosNrIsNotNullAndCurrQtrIsNull();
        ArrayList<Member> unAssigned = null;
        positions.forEach(item -> unAssigned.add(memberRepository.findByMbrId(item.getMbrIdAssigned())));
        return unAssigned;
    }

    @CrossOrigin
    @GetMapping(path = "/unassigned")
    public @ResponseBody
    List<Member> getUnassigned() {
        List<Position> positions = positionRepository.findAllByPosNrIsNull();
        ArrayList<Member> unAssigned = null;
        positions.forEach(item -> unAssigned.add(memberRepository.findByMbrId(item.getMbrIdAssigned())));
        return unAssigned;
    }

    @CrossOrigin
    @GetMapping(path = "/manning_chart")
    public @ResponseBody
    List<AfscChart> getManningChartData() {


        //Search through each distinct AFSC and track the count all depatures and arrivals


        return afscChartRepository.findAll();
    }

    @CrossOrigin
    @GetMapping(path = "/manning_chart/generate")
    void generateManningChartData() {
        List<String> distinctAFSC = positionRepository.findDistinctAfscAuth();
        LocalDate localDate = new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        int thisMonth = localDate.getMonthValue();
        AtomicInteger year = new AtomicInteger(new DateTime().getYear());
        afscChartRepository.deleteAll();
        distinctAFSC.forEach((afsc) -> {

            AtomicInteger assigned = new AtomicInteger(getAssigned(afsc));
            AtomicInteger authorized = new AtomicInteger(getAuthorized(afsc));
            LocalDate start = new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            LocalDate end = new DateTime(new Date()).plusMonths(24 + thisMonth).toDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

            //Iterate by month until the rest of this year and the following two years.
            for (LocalDate date = start; date.isBefore(end); date = date.plusMonths(1)) {
                int iMonth = date.getMonthValue();
                int iYear = date.getYear();

                if (afscIncrementRepository.findAllByAfsc(afsc).size() > 0) {
                    List<AFSCIncrementLog> arrivalAndDepartures = afscIncrementRepository.findAllByAfsc(afsc);
                    arrivalAndDepartures.forEach((mbr) -> {
                        if (mbr.getMonth() == iMonth && mbr.getYear() == iYear) {
                            if (mbr.getIncrementType() == "projected arrival") {
                                assigned.incrementAndGet();
                            }
                            if (mbr.getIncrementType() == "departure") {
                                assigned.decrementAndGet();
                            }
                        }
                    });
                    afscChartRepository.save(new AfscChart(afsc, assigned.intValue(), authorized.intValue(), iMonth, iYear, PercentageCalculator.calculatePercentage(assigned.intValue(), authorized.intValue())));
                }
            }
        });

        //Search through each distinct AFSC and track the count all depatures and arrivals

    }

    private AtomicInteger adjustAssignedForMonth(AtomicInteger assigned, String afsc, int month) {
        List<Position> assignedPositions = positionRepository.findAllByAfscAuthAndCurrQtrIsNotNullAndPosNrIsNotNullAndMbrIdAssignedIsNotNull(afsc);
        assignedPositions.forEach((position) -> {
            Member assignedMember = memberRepository.findByMbrId(position.getMbrIdAssigned());
            List<GainingMember> newMembersInSameAfsc = gainingRepository.findAllByDafsc(afsc);
            newMembersInSameAfsc.forEach((newMbr) -> {
                if (new DateTime(newMbr.getRnltd()).getMonthOfYear() == month) {
                    assigned.incrementAndGet();
                }
            });

            if (new DateTime(assignedMember.getDeros()).getMonthOfYear() == month) {
                assigned.decrementAndGet();
            }
        });
        return assigned;
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
        return positionRepository.countAllByAfscAuthAndPosNrIsNotNullAndMbrIdAssignedIsNotNull(afsc);
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


    public List<Position> saveOrUpdateAndReturnAllPositions(@RequestBody @Valid List<PositionJSON> json) {
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

                if (memberRepository.findByMbrId(newImport.getMbrIdAssigned()) != null) {
                    Member assignedMember = memberRepository.findByMbrId(newImport.getMbrIdAssigned());
                    int derosMonth = new DateTime(assignedMember.getDeros()).getMonthOfYear();
                    int derosYear = new DateTime(assignedMember.getDeros()).getYear();

                    if (assignedMember.getDeros() != null && assignedMember.getDafsc() != null) {
                        AFSCIncrementLog new_departure_log = new AFSCIncrementLog(
                                assignedMember.getAssignedPas() != null ? assignedMember.getAssignedPas() : "No Data",
                                assignedMember.getMbrId(),
                                assignedMember.getDafsc() != null ? assignedMember.getDafsc().replaceAll("-", "") : null,
                                new DateTime(assignedMember.getDeros()).toDate(),
                                derosMonth,
                                derosYear,
                                -1,
                                "departure"
                        );
                        afscIncrementRepository.save(new_departure_log);
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

    private int lastDayOfUnfundedQtr(String qtr1, String qtr2, String qtr3, int year) {
        String lastMonthQtr1 = "3/25/" + year;
        String lastMonthQtr2 = "6/25/" + year;
        String lastMonthQtr3 = "9/25/" + year;
        String lastMonthQtr4 = "12/25/" + year;

        if (qtr1.equals("0")) {
            return 1;
        } else if (qtr2.equals("0")) {
            return 2;
        } else if (qtr3.equals("0")) {
            return 3;
        } else {
            return 4;
        }
    }

    private int getQuarterFromDate(LocalDate date) {
        return date.get(IsoFields.QUARTER_OF_YEAR);
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

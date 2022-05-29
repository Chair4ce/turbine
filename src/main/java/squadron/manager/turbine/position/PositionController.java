package squadron.manager.turbine.position;


import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import squadron.manager.turbine.afscChart.AfscChart;
import squadron.manager.turbine.afscChart.AfscChartRepository;
import squadron.manager.turbine.doubleBilleted.DoubleBilleted;
import squadron.manager.turbine.doubleBilleted.DoubleBilletedRepository;
import squadron.manager.turbine.gainingMember.GainingMember;
import squadron.manager.turbine.gainingMember.GainingMemberRepository;
import squadron.manager.turbine.incrementLog.AFSCIncrementLog;
import squadron.manager.turbine.incrementLog.AFSCIncrementRepository;
import squadron.manager.turbine.incrementLog.PercentageCalculator;
import squadron.manager.turbine.manningChart.AFSCManningChartData;
import squadron.manager.turbine.member.Member;
import squadron.manager.turbine.member.MemberRepository;
import squadron.manager.turbine.member.SqidGenerator;
import squadron.manager.turbine.positionAssignment.PositionAssignmentRepository;
import squadron.manager.turbine.unAssigned.Unassigned;
import squadron.manager.turbine.unAssigned.UnassignedRepository;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.IsoFields;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
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
    private PositionAssignmentRepository positionAssignmentRepository;
    private UnassignedRepository unassignedRepository;
    private DoubleBilletedRepository doubleBilletedRepository;

    @Autowired
    public void ConstructorBasedInjection(MemberRepository memberRepository,
                                          AFSCIncrementRepository afscIncrementRepository,
                                          GainingMemberRepository gainingRepository,
                                          PositionRepository positionRepository,
                                          AfscChartRepository afscChartRepository,
                                          PositionAssignmentRepository positionAssignmentRepository,
                                          UnassignedRepository unassignedRepository,
                                          DoubleBilletedRepository doubleBilletedRepository
    ) {
        this.doubleBilletedRepository = doubleBilletedRepository;
        this.memberRepository = memberRepository;
        this.afscIncrementRepository = afscIncrementRepository;
        this.gainingRepository = gainingRepository;
        this.positionRepository = positionRepository;
        this.afscChartRepository = afscChartRepository;
        this.positionAssignmentRepository = positionAssignmentRepository;
        this.unassignedRepository = unassignedRepository;
    }

    @CrossOrigin
    @Transactional
    @PostMapping(path = "/save")
    public void addPositions(@Valid @RequestBody List<PositionJSON> json) {
        saveOrUpdateAndReturnAllPositions(json);
    }



    @CrossOrigin
    @GetMapping(path = "/manning_chart")
    public @ResponseBody
    List<AfscChart> getManningChartData() {


        //Search through each distinct AFSC and track the count all depatures and arrivals


        return afscChartRepository.findAll();
    }

    @CrossOrigin
    @RequestMapping(path = "/afscCardInfo/month/{afsc}/{month}/{year}", method = RequestMethod.GET)
    public @ResponseBody
    AfscChart getAFSCCardDataForMonth(@Valid @PathVariable String afsc, @PathVariable int month, @PathVariable int year) {
        return afscChartRepository.findByAfscAndMonthAndYear(afsc, month, year);
    }

    @CrossOrigin
    @RequestMapping(path = "/{pas}/{afsc}", method = RequestMethod.GET)
    public @ResponseBody
    Iterable<AssignedPosition> getPositionsForAfscAuth(@Valid @PathVariable String afsc, @PathVariable String pas) {
        List<Position> allSpecificAFSCPositions = new ArrayList<>();
        List<AssignedPosition> assignedPositions = new ArrayList<>();
        if (afsc != null) {
            StringBuilder genericAFSC = new StringBuilder(afsc);
            if (genericAFSC.length() >= 4 && genericAFSC.substring(3, 4).equals("X")) {
                genericAFSC.setCharAt(3, '3');
                allSpecificAFSCPositions.addAll(positionRepository.findAllByPasCodeAndAfscAuth(pas, genericAFSC.toString()));
                genericAFSC.setCharAt(3, '5');
                allSpecificAFSCPositions.addAll(positionRepository.findAllByPasCodeAndAfscAuth(pas, genericAFSC.toString()));
                genericAFSC.setCharAt(3, '7');
                allSpecificAFSCPositions.addAll(positionRepository.findAllByPasCodeAndAfscAuth(pas, genericAFSC.toString()));
                genericAFSC.setCharAt(3, '9');
                allSpecificAFSCPositions.addAll(positionRepository.findAllByPasCodeAndAfscAuth(pas, genericAFSC.toString()));

                for (Position position : allSpecificAFSCPositions) {
                    if (doubleBilletedRepository.findByPosNr(position.getPosNr()) != null) {
                        DoubleBilleted dbPos = doubleBilletedRepository.findByPosNr(position.getPosNr());
                        if (memberRepository.findByMbrId(dbPos.getMbrIdAssigned()) != null) {
                            Member member = memberRepository.findByMbrId(dbPos.getMbrIdAssigned());
                            allSpecificAFSCPositions.add(new Position(dbPos.getId(), dbPos.getPasCode(), null, null, null, null, null, null, null, null, dbPos.getPosNr(), member.getGrade(), member.getDafsc(), member.getFullName(), dbPos.getMbrIdAssigned(), dbPos.getLastUpdated()));
                        }
                    }
                }
            } else {
                allSpecificAFSCPositions.addAll(positionRepository.findAllByPasCodeAndAfscAuth(pas, afsc));
            }

            for (Position position : allSpecificAFSCPositions) {
                if (memberRepository.findByMbrId(position.getMbrIdAssigned()) != null) {
                    Member member = memberRepository.findByMbrId(position.getMbrIdAssigned());
                    assignedPositions.add(new AssignedPosition(position,member));
                } else {
                    assignedPositions.add(new AssignedPosition(position, null));
                }
            }
        }
        return assignedPositions;
    }

    @CrossOrigin
    @RequestMapping(path = "/afscList/{pas}", method = RequestMethod.GET)
    public @ResponseBody
    List<String> getDistinctAfscAuthForPas(@Valid @PathVariable String pas) {
        List<Position> positions = positionRepository.findAllByPasCodeAndPosNrIsNotNullAndAfscAuthIsNotNullAndCurrQtr(pas, "1");
        List<String> specificAFSCList = positions.stream().map(Position::getAfscAuth).distinct().collect(toList());
        List<String> genericAfscList = new ArrayList<>();
        for (String afsc : specificAFSCList) {
            if (afsc != null) {
                StringBuilder specificAFSC = new StringBuilder(afsc);
                if (specificAFSC.length() >= 4) {
                    if (specificAFSC.substring(3, 4).equals("3") || specificAFSC.substring(3, 4).equals("5") || specificAFSC.substring(3, 4).equals("7")) {
                        specificAFSC.setCharAt(3, 'X');
                    }
                }
                genericAfscList.add(specificAFSC.toString());
            }
        }
        return genericAfscList.stream().distinct().collect(toList());
    }

    @CrossOrigin
    @GetMapping(path = "/projected/{pas}/{afsc}")
    void generateManningChartData(@Valid @PathVariable String afsc, @PathVariable String pas) {


        LocalDate localDate = new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        int thisMonth = localDate.getMonthValue();
        AtomicInteger year = new AtomicInteger(new DateTime().getYear());
        afscChartRepository.deleteAll();

            AtomicInteger assigned = new AtomicInteger(getAssigned(afsc));
            AtomicInteger authorized = new AtomicInteger(getAuthorized(afsc));
            LocalDate start = new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            LocalDate end = new DateTime(new Date()).plusMonths(48 + thisMonth).toDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

            //Iterate by month until the rest of this year and the following two years.
            for (LocalDate date = start; date.isBefore(end); date = date.plusMonths(1)) {
                int iMonth = date.getMonthValue();
                int iYear = date.getYear();

                List<AFSCIncrementLog> increments = afscIncrementRepository.findAllByAfscAndMonthAndYear(afsc, iMonth, iYear);
                for (AFSCIncrementLog increment : increments) {
                    if (increment.getIncrementType() == "departure") {
                        assigned.decrementAndGet();
                    }
                    if (increment.getIncrementType() == "projected arrival") {
                        assigned.incrementAndGet();
                    }
                }

                afscChartRepository.save(new AfscChart(afsc, assigned.intValue(), authorized.intValue(), iMonth, iYear, PercentageCalculator.calculatePercentage(assigned.intValue(), authorized.intValue())));
            }


        //Search through each distinct AFSC and track the count all depatures and arrivals

    }

    private AtomicInteger adjustAssignedForMonth(AtomicInteger assigned, String afsc, int month) {
        List<Position> assignedPositions = positionRepository.findAllByAfscAuthAndCurrQtrIsNotNullAndPosNrIsNotNullAndMbrIdAssignedIsNotNull(afsc);
        assignedPositions.forEach((position) -> {
            Member assignedMember = memberRepository.getOne((long) Integer.parseInt(position.getMbrIdAssigned()));
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

    public String getMonthFromValue(int month) {
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

    static public boolean isEnlisted(String grd) {
        switch (grd) {
            case "AMN":
                return true;
            case "AB":
                return true;
            case "A1C":
                return true;
            case "SRA":
                return true;
            case "SSGT":
                return true;
            case "SSG":
                return true;
            case "TSG":
                return true;
            case "TSGT":
                return true;
            case "MSG":
                return true;
            case "MSGT":
                return true;
            case "SMS":
                return true;
            case "SMGT":
                return true;
            case "CMS":
                return true;
            case "CMSGT":
                return true;
            default:
                return false;
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


    public void saveOrUpdateAndReturnAllPositions(@RequestBody @Valid List<PositionJSON> json) {
        Date date = new Date();
        if (json != null) {
            List<String> pasCodes = json.stream()
                    .map(PositionJSON::getPasCode)
                    .distinct()
                    .collect(toList());

            for (String pasCode : pasCodes) {
                positionRepository.deleteAllByPasCode(pasCode);
                doubleBilletedRepository.deleteAllByPasCode(pasCode);
                unassignedRepository.deleteAllByPasCode(pasCode);
            }


            json.forEach((newImport -> {
                if (newImport.getGrdAuth() != null) {
                    if (isEnlisted(newImport.getGrdAuth())) {
                        if (newImport.getMbrIdAssigned() != null) {
                            //catch assigned members to funded billets
                            if (memberRepository.findByMbrIdStartingWith(newImport.getMbrIdAssigned()) != null) {
                                Member assignedMember = memberRepository.findByMbrIdStartingWith(newImport.getMbrIdAssigned());
                                saveNewIncrementLog(newImport, assignedMember);
                                saveImportedPosition(date, newImport, assignedMember);

                            } else {
                                SqidGenerator sqidModel = new SqidGenerator(newImport.getNameAssigned(), newImport.getMbrIdAssigned());
                                if (memberRepository.findMemberByFirstNameAndLastName(sqidModel.getFirstName(), sqidModel.getLastName()) != null) {
                                    Member assignedMember = memberRepository.findMemberByFirstNameAndLastName(sqidModel.getFirstName(), sqidModel.getLastName());
                                    saveNewIncrementLog(newImport, assignedMember);
                                    saveImportedPosition(date, newImport, assignedMember);
                                } else {
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
                                            newImport.getMbrIdAssigned() + ".NODATA",
                                            date));
                                }
                            }
                        } else {
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
                                    null,
                                    null,
                                    null,
                                    null,
                                    date));

                        }
                    }
                } else {
                    if (newImport.getPosNr() == null) {
                        //catch unassigned
                        unassignedRepository.save(createUnassignedModel(date, newImport));
                    } else {
                        //Double Billeted
                        SqidGenerator sqidModel = new SqidGenerator(newImport.getNameAssigned(), newImport.getMbrIdAssigned());
                        doubleBilletedRepository.save(createDoubleBilletedModel(date, newImport, sqidModel));
                    }
                }
            }));
        }
    }

    private DoubleBilleted createDoubleBilletedModel(Date date, PositionJSON newImport, SqidGenerator sqid) {
        return new DoubleBilleted(
                newImport.getPasCode(),
                newImport.getPosNr(),
                newImport.getNameAssigned(),
                sqid.getSqid(),
                date
        );
    }

    private void saveNewIncrementLog(PositionJSON newImport, Member assignedMember) {
        int derosMonth = new DateTime(assignedMember.getDeros()).getMonthOfYear();
        int derosYear = new DateTime(assignedMember.getDeros()).getYear();

        if (assignedMember.getDeros() != null) {
            AFSCIncrementLog new_departure_log = new AFSCIncrementLog(
                    assignedMember.getAssignedPas() != null ? assignedMember.getAssignedPas() : "No Data",
                    assignedMember.getMbrId(),
                    newImport.getAfscAuth().replaceAll("-", ""),
                    new DateTime(assignedMember.getDeros()).toDate(),
                    derosMonth,
                    derosYear,
                    -1,
                    "departure"
            );
            afscIncrementRepository.save(new_departure_log);
        }
    }

    private void saveImportedPosition(Date date, PositionJSON newImport, Member assignedMember) {
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
                assignedMember.getMbrId(),
                date));
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

    private Unassigned createUnassignedModel(Date date, PositionJSON newImport) {
        return new Unassigned(
                newImport.getPasCode(),
                newImport.getMbrIdAssigned(),
                newImport.getNameAssigned(),
                newImport.getDafscAssigned(),
                newImport.getGradeAssigned(),
                date
        );
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

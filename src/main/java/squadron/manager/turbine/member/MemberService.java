package squadron.manager.turbine.member;

import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import squadron.manager.turbine.incrementLog.AFSCIncrementLog;
import squadron.manager.turbine.incrementLog.AFSCIncrementRepository;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
public class MemberService {

    private MemberRepository memberRepository;
    private GainingMemberRepository gainingMemberRepository;
    private AFSCIncrementRepository afscIncrementRepository;

    @Autowired
    public MemberService(MemberRepository memberRepository, GainingMemberRepository gainingMemberRepository, AFSCIncrementRepository afscIncrementRepository) {
        this.memberRepository = memberRepository;
        this.gainingMemberRepository = gainingMemberRepository;
        this.afscIncrementRepository = afscIncrementRepository;
    }

    @Autowired
    public void setMemberRepository(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Autowired
    public void setGainingMemberRepository(GainingMemberRepository gainingMemberRepository) {
        this.gainingMemberRepository = gainingMemberRepository;
    }

    @Autowired
    public void setAFSCIncrementRepository(AFSCIncrementRepository afscIncrementRepository) {
        this.afscIncrementRepository = afscIncrementRepository;
    }

    public Iterable<GainingMember> getAllGainingMembers() {
        return gainingMemberRepository.findAll();
    }

    public Iterable<Member> saveAndGetAllMembers(@RequestBody @Valid Iterable<MemberJSON> json) {
        Date date = new Date();
        json.forEach((newImport -> {
            System.out.println();
            Member existingMember = memberRepository.findByMbrId(newImport.getSsan());
                if (existingMember == null) {
                    saveNewDepartureLog(newImport);
                    memberRepository.save(NewMemberModel(date, newImport));
                } else {
                    updateExistingDepartureLog(newImport);
                    updateExistingMemberData(NewMemberModel(date, newImport), existingMember);
                }

        }));
        return memberRepository.findAll();
    }

    public void saveNewDepartureLog(MemberJSON newImport) {
        if (newImport.getDeros() != null && newImport.getDafsc() != null) {

            AFSCIncrementLog new_departure_log = new AFSCIncrementLog(
                    newImport.getAssignedPas() != null ? newImport.getAssignedPas() : "No Data",
                    newImport.getSsan(),
                    newImport.getDafsc() != null ? newImport.getDafsc().replaceAll("-", "") : null,
                    new DateTime(newImport.getDeros()).toDate(),
                    -1,
                    "departure"
            );
            System.out.println("saving departure log");
            afscIncrementRepository.save(new_departure_log);
        }
    }

    public void updateExistingDepartureLog(MemberJSON newImport) {
        if (newImport.getDeros() != null) {
            if (afscIncrementRepository.findByPasCodeAndMbrIdAndIncrementType(newImport.getAssignedPas(), newImport.getSsan(), "departure") != null) {
                AFSCIncrementLog existing_departure_log = afscIncrementRepository.findByPasCodeAndMbrIdAndIncrementType(newImport.getAssignedPas(), newImport.getSsan(), "departure");
                if (!new DateTime(existing_departure_log.getIncrementDate()).equals(new DateTime(newImport.getDeros()))) {
                    existing_departure_log.setIncrementDate(newImport.getDeros());
                    System.out.println("updating departure log");
                    afscIncrementRepository.save(existing_departure_log);
                }
            }
        }
    }


    public Iterable<GainingMember> saveAndGetAllGainingMembers(@RequestBody @Valid Iterable<GainingMemberJSON> json) {
        Date date = new Date();
        json.forEach((newImport -> {
            GainingMember existingMember = gainingMemberRepository.findByMbrId(newImport.getMbrId());
            GainingMember newMemberData = NewGainingMemberModel(date, newImport);

            if (existingMember == null ) {
                saveArrivalAndProjDepartureLog(newImport);
                gainingMemberRepository.save(newMemberData);
            } else {
                updateArrivalAndProjDepartureLogs(newImport);
                updateExistingGainingMemberData(newMemberData, existingMember);
            }
        }));
        return gainingMemberRepository.findAll();
    }

    public void updateArrivalAndProjDepartureLogs(GainingMemberJSON newImport) {
        if (newImport.getRnltd() != null) {
            if (afscIncrementRepository.findByPasCodeAndMbrIdAndIncrementType(newImport.getGainingPas(), newImport.getMbrId(), "arrival") != null) {
                AFSCIncrementLog existing_arrival_log = afscIncrementRepository.findByPasCodeAndMbrIdAndIncrementType(newImport.getGainingPas(), newImport.getMbrId(), "arrival");
                AFSCIncrementLog existing_departure_log = afscIncrementRepository.findByPasCodeAndMbrIdAndIncrementType(newImport.getGainingPas(), newImport.getMbrId(), "departure");
                DateTime newImportProjDepartDate = new DateTime(newImport.getRnltd()).plusYears(3);
                if (!new DateTime(existing_arrival_log.getIncrementDate()).equals(new DateTime(newImport.getRnltd()))) {
                    existing_arrival_log.setIncrementDate(newImport.getRnltd());
                    existing_departure_log.setIncrementDate(newImportProjDepartDate.toDate());
                    afscIncrementRepository.save(existing_arrival_log);
                    afscIncrementRepository.save(existing_departure_log);
                }
            }
        }
    }

    public void saveArrivalAndProjDepartureLog(GainingMemberJSON newImport) {

        if (newImport.getRnltd() != null) {
            AFSCIncrementLog new_arrival_log = new AFSCIncrementLog(
                    newImport.getGainingPas(),
                    newImport.getMbrId(),
                    newImport.getDafsc() != null ? newImport.getDafsc().replaceAll("-", "") : "No Data",
                    new DateTime(newImport.getRnltd()).toDate(),
                    1,
                    "arrival"
            );
            AFSCIncrementLog new_departure_log = new AFSCIncrementLog(
                    newImport.getGainingPas(),
                    newImport.getMbrId(),
                    newImport.getDafsc() != null ? newImport.getDafsc().replaceAll("-", "") : "No Data",
                    new DateTime(newImport.getRnltd()).plusYears(3).toDate(),
                    1,
                    "departure"
            );
            afscIncrementRepository.save(new_arrival_log);
            afscIncrementRepository.save(new_departure_log);
        }
    }

    public List<GroupCollection> getGroupOfficeCollections() {
        List<Member> members = memberRepository.findAll();
        List<String> distinctOffices = getArrayOfDistinctOffices(members);
        List<GroupCollection> officeCollection = new ArrayList<>();
        for (String office : distinctOffices) {
            List<Member> memberCollection = new ArrayList<>();
            if (office == null || office.equals("")) {
                for (Member member : members) {
                    if (member.getOfficeSymbol() == null || member.getOfficeSymbol().equals("")) {
                        memberCollection.add(member);
                    }
                }
                officeCollection.add(new GroupCollection("Empty", memberCollection));
            } else {
                for (Member member : members) {
                    if (member.getOfficeSymbol() != null) {
                        if (office.equals(member.getOfficeSymbol())) {
                            memberCollection.add(member);
                        }
                    }

                }
                officeCollection.add(new GroupCollection(office, memberCollection));
            }
        }
        return officeCollection;
    }

    public List<GroupCollection> getGroupDAFSCCollections() {
        List<Member> members = memberRepository.findAll();
        List<String> distinctAFSCs = getArrayOfDistinctDAFSCs(members);
        List<GroupCollection> dafscCollection = new ArrayList<>();

        for (String afsc : distinctAFSCs) {
            List<Member> memberCollection = new ArrayList<>();
            StringBuilder newAFSC = new StringBuilder(afsc);
            if (afsc.length() >= 4) {
                newAFSC.setCharAt(3, 'X');
                for (Member member : members) {
                    StringBuilder compareAFSC = new StringBuilder(member.getDafsc());
                    if (compareAFSC.length() >= 4) {
                        compareAFSC.setCharAt(3, 'X');
                        if (newAFSC.toString().equals(compareAFSC.toString())) {
                            memberCollection.add(member);
                        }
                    }
                }
            }

            dafscCollection.add(new GroupCollection(newAFSC.toString(), memberCollection));
        }
        return dafscCollection;
    }

    public List<GainingGroupCollection> getGroupGainingDAFSCCollections() {
        List<GainingMember> members = gainingMemberRepository.findAll();
        List<String> distinctAFSCs = getArrayOfDistinctGainingDAFSCs(members);
        List<GainingGroupCollection> dafscCollection = new ArrayList<>();

        for (String afsc : distinctAFSCs) {
            List<GainingMember> memberCollection = new ArrayList<>();
            StringBuilder newAFSC = new StringBuilder(afsc);
            if (afsc.length() > 4) {
                newAFSC.setCharAt(3, 'X');
                for (GainingMember member : members) {
                    if (member.getDafsc() != null) {
                        StringBuilder compareAFSC = new StringBuilder(member.getDafsc());
                        if (compareAFSC.length() > 4) {
                            compareAFSC.setCharAt(3, 'X');
                            if (newAFSC.toString().equals(compareAFSC.toString())) {
                                memberCollection.add(member);
                            }
                        }
                    }
                }
            } else {
                for (GainingMember member : members) {
                    if (member.getDafsc() != null) {
                        StringBuilder compareAFSC = new StringBuilder(member.getDafsc());
                        if (newAFSC.toString().equals(compareAFSC.toString())) {
                            memberCollection.add(member);
                        }
                    }
                }
            }

            dafscCollection.add(new GainingGroupCollection(newAFSC.toString(), memberCollection));
        }
        return dafscCollection;
    }

    public List<String> getArrayOfDistinctDAFSCs(List<Member> members) {
        return members.stream().map(member -> {
            if (member.getDafsc() != null) {
                StringBuilder newAFSC = new StringBuilder(member.getDafsc());
                if (newAFSC.length() > 4) {
                    newAFSC.setCharAt(3, 'X');
                }
                return newAFSC.toString();
            } else {
                return "";
            }
        }).distinct().collect(toList());
    }

    public List<String> getArrayOfDistinctGainingDAFSCs(List<GainingMember> members) {
        return members.stream().map(member -> {
            if (member.getDafsc() != null) {
                StringBuilder newAFSC = new StringBuilder(member.getDafsc());
                if (newAFSC.length() > 4) {
                    newAFSC.setCharAt(3, 'X');
                }
                return newAFSC.toString();
            } else {
                return "";
            }
        }).distinct().collect(toList());
    }

    public List<String> getArrayOfDistinctOffices(List<Member> members) {
        return members.stream()
                .map(Member::getOfficeSymbol)
                .distinct()
                .collect(toList());
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
                newImport.getDeros(),
                date
        );
    }

    private GainingMember NewGainingMemberModel(Date date, GainingMemberJSON newImport) {
        return new GainingMember(
                newImport.getGainingPas(),
                newImport.getMbrId(),
                newImport.getFullName(),
                newImport.getGrade(),
                newImport.getLosingPas(),
                newImport.getLosingPasCleartext(),
                newImport.getDafsc(),
                newImport.getSponsorId(),
                newImport.getDor(),
                newImport.getDos(),
                newImport.getRnltd(),
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
        existingMember.setDeros(importingMember.getDeros());
        existingMember.setLastUpdated(importingMember.getLastUpdated());

        memberRepository.save(existingMember);
    }

    private void updateExistingGainingMemberData(GainingMember importingMember, GainingMember existingMember) {
        existingMember.setFullName(importingMember.getFullName());
        existingMember.setGrade(importingMember.getGrade());
        existingMember.setLosingPas(importingMember.getLosingPas());
        existingMember.setLosingPasCleartext(importingMember.getLosingPasCleartext());
        existingMember.setDafsc(importingMember.getDafsc());
        existingMember.setSponsorId(importingMember.getSponsorId());
        existingMember.setDor(importingMember.getDor());
        existingMember.setDos(importingMember.getDos());
        existingMember.setRnltd(importingMember.getRnltd());
        existingMember.setLastUpdated(importingMember.getLastUpdated());

        gainingMemberRepository.save(existingMember);
    }


}

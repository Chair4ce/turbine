package squadron.manager.turbine.members;

import org.joda.time.DateTime;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import squadron.manager.turbine.BaseIntegrationTest;
import squadron.manager.turbine.member.GainingMember;
import squadron.manager.turbine.member.GainingMemberRepository;
import squadron.manager.turbine.member.Member;
import squadron.manager.turbine.member.MemberRepository;
import squadron.manager.turbine.position.Position;
import squadron.manager.turbine.position.PositionController;
import squadron.manager.turbine.position.PositionRepository;

import java.util.Date;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

public class PositionControllerTest extends BaseIntegrationTest {

    @Autowired
    private PositionRepository positionRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private GainingMemberRepository gainingMemberRepository;

    @Test
    public void getReturnsAFSCChartData() {

        positionRepository.deleteAll();
        memberRepository.deleteAll();
        gainingMemberRepository.deleteAll();

        Date date = new Date();
        //Alpha Roster
        Member newMember1 = new Member("98798798", "BELL JAIME NICOLE", "A1C", "UHBYGVYT", "1N131A", "DOO", "TECH", date, "757-225-8454", "SMS Jackson", date, date, date, date, new DateTime().plusMonths(1).toDate(), date);
        Member newMember2 = new Member("98798898", "BELL JAIME NICOLE", "A1C", "UHBYGVYT", "1N131A", "DOO", "TECH", date, "757-225-8454", "SMS Jackson", date, date, date, date, new DateTime().plusMonths(2).toDate(), date);
        Member newMember3 = new Member("98798998", "BELL JAIME NICOLE", "A1C", "UHBYGVYT", "1N131A", "DOO", "TECH", date, "757-225-8454", "SMS Jackson", date, date, date, date, new DateTime().plusMonths(3).toDate(), date);
        Member newMember4 = new Member("98798799", "BELL JAIME NICOLE", "A1C", "UHBYGVYT", "1N131A", "DOO", "TECH", date, "757-225-8454", "SMS Jackson", date, date, date, date, new DateTime().plusMonths(4).toDate(), date);
        Member newMember5 = new Member("98798800", "BELL JAIME NICOLE", "A1C", "UHBYGVYT", "1N131A", "DOO", "TECH", date, "757-225-8454", "SMS Jackson", date, date, date, date, new DateTime().plusMonths(5).toDate(), date);
        Member newMember6 = new Member("98798801", "BELL JAIME NICOLE", "A1C", "UHBYGVYT", "1N131A", "DOO", "TECH", date, "757-225-8454", "SMS Jackson", date, date, date, date, new DateTime().plusMonths(6).toDate(), date);
        Member newMember7 = new Member("98798802", "BELL JAIME NICOLE", "A1C", "UHBYGVYT", "1N131A", "DOO", "TECH", date, "757-225-8454", "SMS Jackson", date, date, date, date, new DateTime().plusMonths(7).toDate(), date);
        Member newMember8 = new Member("98798803", "BELL JAIME NICOLE", "A1C", "UHBYGVYT", "1N131A", "DOO", "TECH", date, "757-225-8454", "SMS Jackson", date, date, date, date, new DateTime().plusMonths(8).toDate(), date);
        Member newMember9 = new Member("98798804", "BELL JAIME NICOLE", "A1C", "UHBYGVYT", "1N131A", "DOO", "TECH", date, "757-225-8454", "SMS Jackson", date, date, date, date, new DateTime().plusMonths(9).toDate(), date);
        Member newMember10 = new Member("98798904", "BELL JAIME NICOLE", "A1C", "UHBYGVYT", "1N131A", "DOO", "TECH", date, "757-225-8454", "SMS Jackson", date, date, date, date, new DateTime().plusMonths(10).toDate(), date);
        Member newMember11 = new Member("98798004", "BELL JAIME NICOLE", "A1C", "UHBYGVYT", "1N131A", "DOO", "TECH", date, "757-225-8454", "SMS Jackson", date, date, date, date, new DateTime().plusMonths(11).toDate(), date);
        Member newMember12 = new Member("98798805", "BELL JAIME NICOLE", "A1C", "UHBYGVYT", "1N131A", "DOO", "TECH", date, "757-225-8454", "SMS Jackson", date, date, date, date, new DateTime().plusMonths(12).toDate(), date);
        Member newMember13 = new Member("98798806", "BELL JAIME NICOLE", "A1C", "UHBYGVYT", "1N131A", "DOO", "TECH", date, "757-225-8454", "SMS Jackson", date, date, date, date, new DateTime().plusMonths(13).toDate(), date);
        Member newMember14 = new Member("98798807", "BELL JAIME NICOLE", "A1C", "UHBYGVYT", "1N131A", "DOO", "TECH", date, "757-225-8454", "SMS Jackson", date, date, date, date, new DateTime().plusMonths(1).toDate(), date);
        Member newMember15 = new Member("98798808", "BELL JAIME NICOLE", "A1C", "UHBYGVYT", "1N131A", "DOO", "TECH", date, "757-225-8454", "SMS Jackson", date, date, date, date, new DateTime().plusMonths(15).toDate(), date);
        Member newMember16 = new Member("98798809", "BELL JAIME NICOLE", "A1C", "UHBYGVYT", "1N131A", "DOO", "TECH", date, "757-225-8454", "SMS Jackson", date, date, date, date, new DateTime().plusMonths(16).toDate(), date);
        Member newMember17 = new Member("98798810", "BELL JAIME NICOLE", "A1C", "UHBYGVYT", "1N131A", "DOO", "TECH", date, "757-225-8454", "SMS Jackson", date, date, date, date, new DateTime().plusMonths(17).toDate(), date);
        Member newMember18 = new Member("98798811", "BELL JAIME NICOLE", "A1C", "UHBYGVYT", "1N131A", "DOO", "TECH", date, "757-225-8454", "SMS Jackson", date, date, date, date, new DateTime().plusMonths(18).toDate(), date);
        Member newMember19 = new Member("98798911", "BELL JAIME NICOLE", "A1C", "UHBYGVYT", "1N131A", "DOO", "TECH", date, "757-225-8454", "SMS Jackson", date, date, date, date, new DateTime().plusMonths(19).toDate(), date);
        Member newMember20 = new Member("98798011", "BELL JAIME NICOLE", "A1C", "UHBYGVYT", "1N131A", "DOO", "TECH", date, "757-225-8454", "SMS Jackson", date, date, date, date, new DateTime().plusMonths(20).toDate(), date);
        Member newMember21 = new Member("98798812", "BELL JAIME NICOLE", "A1C", "UHBYGVYT", "1N131A", "DOO", "TECH", date, "757-225-8454", "SMS Jackson", date, date, date, date, new DateTime().plusMonths(21).toDate(), date);
        Member newMember22 = new Member("98798813", "BELL JAIME NICOLE", "A1C", "UHBYGVYT", "1N131A", "DOO", "TECH", date, "757-225-8454", "SMS Jackson", date, date, date, date, new DateTime().plusMonths(1).toDate(), date);
        Member newMember23 = new Member("98798814", "BELL JAIME NICOLE", "A1C", "UHBYGVYT", "1N131A", "DOO", "TECH", date, "757-225-8454", "SMS Jackson", date, date, date, date, new DateTime().plusMonths(23).toDate(), date);
        Member newMember24 = new Member("9879815", "BELL JAIME NICOLE", "A1C", "UHBYGVYT", "1N131A", "DOO", "TECH", date, "757-225-8454", "SMS Jackson", date, date, date, date, new DateTime().plusMonths(24).toDate(), date);
        Member newMember25 = new Member("9879915", "BELL JAIME NICOLE", "A1C", "UHBYGVYT", "1N131A", "DOO", "TECH", date, "757-225-8454", "SMS Jackson", date, date, date, date, new DateTime().plusMonths(25).toDate(), date);
        Member newMember26 = new Member("9879015", "BELL JAIME NICOLE", "A1C", "UHBYGVYT", "1N131A", "DOO", "TECH", date, "757-225-8454", "SMS Jackson", date, date, date, date, new DateTime().plusMonths(26).toDate(), date);
        Member newMember27 = new Member("9879415", "BELL JAIME NICOLE", "A1C", "UHBYGVYT", "1N131A", "DOO", "TECH", date, "757-225-8454", "SMS Jackson", date, date, date, date, new DateTime().plusMonths(27).toDate(), date);
        Member newMember28 = new Member("9879515", "BELL JAIME NICOLE", "A1C", "UHBYGVYT", "1N131A", "DOO", "TECH", date, "757-225-8454", "SMS Jackson", date, date, date, date, new DateTime().plusMonths(28).toDate(), date);
        Member newMember29 = new Member("98794510", "BELL JAIME NICOLE", "A1C", "UHBYGVYT", "1N131A", "DOO", "TECH", date, "757-225-8454", "SMS Jackson", date, date, date, date, new DateTime().plusMonths(6).toDate(), date);
        Member newMember30 = new Member("18794510", "BELL JAIME NICOLE", "A1C", "UHBYGVYT", "1N131A", "DOO", "TECH", date, "757-225-8454", "SMS Jackson", date, date, date, date, new DateTime().plusMonths(9).toDate(), date);

        memberRepository.save(newMember1);
        memberRepository.save(newMember2);
        memberRepository.save(newMember3);
        memberRepository.save(newMember4);
        memberRepository.save(newMember5);
        memberRepository.save(newMember6);
        memberRepository.save(newMember7);
        memberRepository.save(newMember8);
        memberRepository.save(newMember9);
        memberRepository.save(newMember10);
        memberRepository.save(newMember11);
        memberRepository.save(newMember12);
        memberRepository.save(newMember13);
        memberRepository.save(newMember14);
        memberRepository.save(newMember15);
        memberRepository.save(newMember16);
        memberRepository.save(newMember17);
        memberRepository.save(newMember18);
        memberRepository.save(newMember19);
        memberRepository.save(newMember20);
        memberRepository.save(newMember21);
        memberRepository.save(newMember22);
        memberRepository.save(newMember23);
        memberRepository.save(newMember24);
        memberRepository.save(newMember25);
        memberRepository.save(newMember26);
        memberRepository.save(newMember27);
        memberRepository.save(newMember28);
        memberRepository.save(newMember29);
        memberRepository.save(newMember30);


        //Gaining Roster
        GainingMember newGaining1 = new GainingMember("OP1CF333", "54354345", "HOAG, JACY L", "TSG", "OPQRT455", "DO NOTHING SQ", "3D132", "98798798", new DateTime().minusMonths(24).toDate(), new DateTime().plusYears(6).toDate(), new DateTime().plusMonths(20).toDate(), date);
        GainingMember newGaining2 = new GainingMember("OP1CF333", "54354346", "HOAG, JACY L", "TSG", "OPQRT455", "DO NOTHING SQ", "3D132", "98798898", new DateTime().minusMonths(43).toDate(), new DateTime().plusYears(6).toDate(), new DateTime().plusMonths(19).toDate(), date);
        GainingMember newGaining3 = new GainingMember("OP1CF333", "54354347", "HOAG, JACY L", "TSG", "OPQRT455", "DO NOTHING SQ", "3D132", "98798998", new DateTime().minusMonths(2).toDate(), new DateTime().plusYears(6).toDate(), new DateTime().plusMonths(18).toDate(), date);
        GainingMember newGaining4 = new GainingMember("OP1CF333", "54354348", "HOAG, JACY L", "TSG", "OPQRT455", "DO NOTHING SQ", "3D132", "98798799", new DateTime().minusMonths(4).toDate(), new DateTime().plusYears(6).toDate(), new DateTime().plusMonths(17).toDate(), date);
        GainingMember newGaining5 = new GainingMember("OP1CF333", "54354349", "HOAG, JACY L", "TSG", "OPQRT455", "DO NOTHING SQ", "3D132", "98798800", new DateTime().minusMonths(5).toDate(), new DateTime().plusYears(6).toDate(), new DateTime().plusMonths(16).toDate(), date);
        GainingMember newGaining6 = new GainingMember("OP1CF333", "54354350", "HOAG, JACY L", "TSG", "OPQRT455", "DO NOTHING SQ", "3D132", "98798801", new DateTime().minusMonths(7).toDate(), new DateTime().plusYears(6).toDate(), new DateTime().plusMonths(15).toDate(), date);
        GainingMember newGaining7 = new GainingMember("OP1CF333", "54354351", "HOAG, JACY L", "TSG", "OPQRT455", "DO NOTHING SQ", "3D132", "98798802", new DateTime().minusMonths(9).toDate(), new DateTime().plusYears(6).toDate(), new DateTime().plusMonths(14).toDate(), date);
        GainingMember newGaining8 = new GainingMember("OP1CF333", "54354352", "HOAG, JACY L", "TSG", "OPQRT455", "DO NOTHING SQ", "3D132", "98798803", new DateTime().minusMonths(0).toDate(), new DateTime().plusYears(6).toDate(), new DateTime().plusMonths(13).toDate(), date);
        GainingMember newGaining9 = new GainingMember("OP1CF333", "543543453", "HOAG, JACY L", "TSG", "OPQRT455", "DO NOTHING SQ", "3D132", "98798804", new DateTime().minusMonths(8).toDate(), new DateTime().plusYears(6).toDate(), new DateTime().plusMonths(12).toDate(), date);
        GainingMember newGaining10 = new GainingMember("OP1CF333", "54354354", "HOAG, JACY L", "TSG", "OPQRT455", "DO NOTHING SQ", "3D132", "98798904", new DateTime().minusMonths(7).toDate(), new DateTime().plusYears(6).toDate(), new DateTime().plusMonths(11).toDate(), date);
        GainingMember newGaining11 = new GainingMember("OP1CF333", "54354355", "HOAG, JACY L", "TSG", "OPQRT455", "DO NOTHING SQ", "3D152", "98798004", new DateTime().minusMonths(35).toDate(), new DateTime().plusYears(6).toDate(), new DateTime().plusMonths(10).toDate(), date);
        GainingMember newGaining12 = new GainingMember("OP1CF333", "54354356", "HOAG, JACY L", "TSG", "OPQRT455", "DO NOTHING SQ", "3D152", "98798805", new DateTime().minusMonths(23).toDate(), new DateTime().plusYears(6).toDate(), new DateTime().plusMonths(9).toDate(), date);
        GainingMember newGaining13 = new GainingMember("OP1CF333", "54354357", "HOAG, JACY L", "TSG", "OPQRT455", "DO NOTHING SQ", "3D152", "98798806", new DateTime().minusMonths(2).toDate(), new DateTime().plusYears(6).toDate(), new DateTime().plusMonths(8).toDate(), date);
        GainingMember newGaining14 = new GainingMember("OP1CF333", "54354358", "HOAG, JACY L", "TSG", "OPQRT455", "DO NOTHING SQ", "3D152", "98798807", new DateTime().minusMonths(1).toDate(), new DateTime().plusYears(6).toDate(), new DateTime().plusMonths(7).toDate(), date);
        GainingMember newGaining15 = new GainingMember("OP1CF333", "54354359", "HOAG, JACY L", "TSG", "OPQRT455", "DO NOTHING SQ", "3D152", "98798808", new DateTime().minusMonths(22).toDate(), new DateTime().plusYears(6).toDate(), new DateTime().plusMonths(6).toDate(), date);
        GainingMember newGaining16 = new GainingMember("OP1CF333", "74354459", "HOAG, JACY L", "TSG", "OPQRT455", "DO NOTHING SQ", "3D172", "98798808", new DateTime().minusMonths(22).toDate(), new DateTime().plusYears(6).toDate(), new DateTime().plusYears(2).plusMonths(4).toDate(), date);

        gainingMemberRepository.save(newGaining1);
        gainingMemberRepository.save(newGaining2);
        gainingMemberRepository.save(newGaining3);
        gainingMemberRepository.save(newGaining4);
        gainingMemberRepository.save(newGaining5);
        gainingMemberRepository.save(newGaining6);
        gainingMemberRepository.save(newGaining7);
        gainingMemberRepository.save(newGaining8);
        gainingMemberRepository.save(newGaining9);
        gainingMemberRepository.save(newGaining10);
        gainingMemberRepository.save(newGaining11);
        gainingMemberRepository.save(newGaining12);
        gainingMemberRepository.save(newGaining13);
        gainingMemberRepository.save(newGaining14);
        gainingMemberRepository.save(newGaining15);
        gainingMemberRepository.save(newGaining16);

        //Ideal manning
        Position newPosition1 = new Position("OP1CF333", "DOO", "1N131A", "A1C", "1", "1", "1", "1", "1", "10525331C", "A1C", "1N131", "BELL JAIME NICOLE", "98798798", date);
        //Unfunded
        Position newPosition19 = new Position("OP1CF333", "DOO", "1N131A", "A1C", "0", "0", "0", "0", "0", "10525331C", "A1C", "1N131", "BELL JAIME NICOLE", "98798898", date);
        Position newPosition20 = new Position("OP1CF333", "DOO", "1N131A", "A1C", "0", "0", "0", "0", "0", "10525331C", "A1C", "1N131", "BELL JAIME NICOLE", "98798998", date);
        //Ideal manning
        Position newPosition2 = new Position("OP1CF333", "DOO", "1N131A", "A1C", "1", "1", "1", "1", "1", "10525332C", "A1C", "1N131", "BELL JAIME NICOLE", "98798799", date);
        Position newPosition3 = new Position("OP1CF333", "DOO", "1N151A", "A1C", "1", "1", "1", "1", "1", "10525333C", "A1C", "1N151", "BELL JAIME NICOLE", "98798800", date);
        Position newPosition4 = new Position("OP1CF333", "DOO", "1N151A", "A1C", "1", "1", "1", "1", "1", "10525334C", "A1C", "1N151", "BELL JAIME NICOLE", "98798801", date);
        Position newPosition5 = new Position("OP1CF333", "DOO", "1N171A", "A1C", "1", "1", "1", "1", "1", "10525335C", "A1C", "1N171", "BELL JAIME NICOLE", "98798802", date);
        Position newPosition6 = new Position("OP1CF333", "DOO", "1N171A", "A1C", "1", "1", "1", "1", "1", "10525336C", "A1C", "1N171", "BELL JAIME NICOLE", "98798803", date);
        Position newPosition7 = new Position("OP1CF333", "DOO", "1N431B", "A1C", "1", "1", "1", "1", "1", "10525337C", "A1C", "1N431B", "BELL JAIME NICOLE", "98798804", date);
        //Unfunded
        Position newPosition21 = new Position("OP1CF333", "DOO", "1N431B", "A1C", "0", "0", "0", "0", "0", "10525337C", "A1C", "1N431B", "BELL JAIME NICOLE", "98798904", date);
        Position newPosition22 = new Position("OP1CF333", "DOO", "1N431B", "A1C", "0", "0", "0", "0", "0", "10525337C", "A1C", "1N431B", "BELL JAIME NICOLE", "98798004", date);
        //Ideal manning
        Position newPosition8 = new Position("OP1CF333", "DOO", "1N431B", "A1C", "1", "1", "1", "1", "1", "10525338C", "A1C", "1N431B", "BELL JAIME NICOLE", "98798805", date);
        Position newPosition9 = new Position("OP1CF333", "DOO", "1N451B", "A1C", "1", "1", "1", "1", "1", "10525339C", "A1C", "1N451B", "BELL JAIME NICOLE", "98798806", date);
        Position newPosition10 = new Position("OP1CF333", "DOO", "1N451B", "A1C", "1", "1", "1", "1", "1", "10525340C", "A1C", "1N451B", "BELL JAIME NICOLE", "98798807", date);
        Position newPosition11 = new Position("OP1CF333", "DOO", "1N471B", "A1C", "1", "1", "1", "1", "1", "10525341C", "A1C", "1N471B", "BELL JAIME NICOLE", "98798808", date);
        Position newPosition12 = new Position("OP1CF333", "DOO", "1N471B", "A1C", "1", "1", "1", "1", "1", "10525342C", "A1C", "1N471B", "BELL JAIME NICOLE", "98798809", date);
        //Example Low manned AFSC
        Position newPosition32 = new Position("OP1CF333", "DOO", "3D032", "A1C", "1", "1", "1", "1", "1", "10625343C", "A1C", "3D032", "BELL JAIME NICOLE", "98794510", date);
        Position newPosition29 = new Position("OP1CF333", "DOO", "3D032", "A1C", "1", "1", "1", "1", "1", "10725343C", null, null, null, null, date);
        Position newPosition30 = new Position("OP1CF333", "DOO", "3D032", "A1C", "1", "1", "1", "1", "1", "10825343C", null, null, null, null, date);

        //unfunded in 4th Qtr but not currently assigned
        Position newPosition31 = new Position("OP1CF333", "DOO", "3D032", "A1C", "1", "1", "1", "1", "0", "10925343C", null, null, null, null, date);

        Position newPosition33 = new Position("OP1CF333", "DOO", "3D052", "A1C", "1", "1", "1", "1", "1", "10125343C", "A1C", "3D052", "BELL JAIME NICOLE", "18794510", date);

        //Unfunded in 3rd Qtr and currently assigned
        Position newPosition34 = new Position("OP1CF333", "DOO", "3D052", "A1C", "1", "1", "1", "0", "0", "11125343C", null, null, null, null, date);

        Position newPosition35 = new Position("OP1CF333", "DOO", "3D072", "A1C", "1", "1", "1", "1", "1", "11125343C", null, null, null, null, date);
        //Ideal manning
        Position newPosition13 = new Position("OP1CF333", "DOO", "3D132", "A1C", "1", "1", "1", "1", "1", "10525343C", "A1C", "3D132", "BELL JAIME NICOLE", "98798810", date);
        Position newPosition14 = new Position("OP1CF333", "DOO", "3D132", "A1C", "1", "1", "1", "1", "1", "10525344C", "A1C", "3D132", "BELL JAIME NICOLE", "98798811", date);
        //Unfunded
        Position newPosition23 = new Position("OP1CF333", "DOO", "3D132", "A1C", "0", "0", "0", "0", "0", "10525344C", "A1C", "3D132", "BELL JAIME NICOLE", "98798911", date);
        Position newPosition24 = new Position("OP1CF333", "DOO", "3D132", "A1C", "0", "0", "0", "0", "0", "10525344C", "A1C", "3D132", "BELL JAIME NICOLE", "98798011", date);
        //Ideal manning
        Position newPosition15 = new Position("OP1CF333", "DOO", "3D152", "A1C", "1", "1", "1", "1", "1", "10525345C", "A1C", "3D152", "BELL JAIME NICOLE", "98798812", date);
        Position newPosition16 = new Position("OP1CF333", "DOO", "3D152", "A1C", "1", "1", "1", "1", "1", "10525346C", "A1C", "3D152", "BELL JAIME NICOLE", "98798813", date);
        Position newPosition17 = new Position("OP1CF333", "DOO", "3D172", "A1C", "1", "1", "1", "1", "1", "10525347C", "A1C", "3D172", "BELL JAIME NICOLE", "98798814", date);
        Position newPosition18 = new Position("OP1CF333", "DOO", "3D172", "A1C", "1", "1", "1", "1", "1", "10525348C", "A1C", "3D172", "BELL JAIME NICOLE", "9879815", date);
        //Unassigned
        Position newPosition25 = new Position("OP1CF333", null, null, null, null, null, null, null, null, null, "A1C", "1N431B", "SNUFFY", "9879915", date);
        Position newPosition26 = new Position("OP1CF333", null, null, null, null, null, null, null, null, null, "A1C", "3D152", "SNUFFY JR.", "9879015", date);
        //Double Billeted
        Position newPosition27 = new Position("OP1CF333", "YN", null, null, null, null, null, null, null, "10525346C", "A1C", "3D152", "SNUFFY JR.", "9879415", date);
        Position newPosition28 = new Position("OP1CF333", "YN", null, null, null, null, null, null, null, "10525340C", "A1C", "3D152", "SNUFFY JR.", "9879515", date);

        positionRepository.save(newPosition1);
        positionRepository.save(newPosition2);
        positionRepository.save(newPosition3);
        positionRepository.save(newPosition4);
        positionRepository.save(newPosition5);
        positionRepository.save(newPosition6);
        positionRepository.save(newPosition7);
        positionRepository.save(newPosition8);
        positionRepository.save(newPosition9);
        positionRepository.save(newPosition10);
        positionRepository.save(newPosition11);
        positionRepository.save(newPosition12);
        positionRepository.save(newPosition13);
        positionRepository.save(newPosition14);
        positionRepository.save(newPosition15);
        positionRepository.save(newPosition16);
        positionRepository.save(newPosition17);
        positionRepository.save(newPosition18);
        positionRepository.save(newPosition19);
        positionRepository.save(newPosition20);
        positionRepository.save(newPosition21);
        positionRepository.save(newPosition22);
        positionRepository.save(newPosition23);
        positionRepository.save(newPosition24);
        positionRepository.save(newPosition25);
        positionRepository.save(newPosition26);
        positionRepository.save(newPosition27);
        positionRepository.save(newPosition28);
        positionRepository.save(newPosition29);
        positionRepository.save(newPosition30);
        positionRepository.save(newPosition31);
        positionRepository.save(newPosition32);
        positionRepository.save(newPosition33);
        positionRepository.save(newPosition34);
        positionRepository.save(newPosition35);


        given()
                .port(port)
                .when()
                .get(PositionController.URI + "/manning_chart")
                .then()
                .statusCode(200)
                .body("[0].manning", equalTo("200%"))
                .body("[383].manning", equalTo("0%"));

        positionRepository.deleteAll();
        memberRepository.deleteAll();
        gainingMemberRepository.deleteAll();
    }
}

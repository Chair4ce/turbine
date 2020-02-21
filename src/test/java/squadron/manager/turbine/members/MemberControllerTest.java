package squadron.manager.turbine.members;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import squadron.manager.turbine.BaseIntegrationTest;
import squadron.manager.turbine.member.Member;
import squadron.manager.turbine.member.MemberController;
import squadron.manager.turbine.member.MemberRepository;

import java.util.Date;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

public class MemberControllerTest extends BaseIntegrationTest {

    @Autowired
    private MemberRepository memberRepository;

    @Test
    public void getReturnsMembers() {

        Date date = new Date();
       Member newMember = new Member(
               "92093",
               "Hoag, Jacy L",
               "Jacy",
               "Hoag",
               date,
               "TSgt",
               "UHBYGVYT",
               "3D1X2",
               "SCXP",
               "NCOIC",
               date,
               "757-225-8454",
               "SMS Jackson",
               date,
               date,
               date,
               date
               );

       memberRepository.save(newMember);

        given()
                .port(port)
                .when()
                .get(MemberController.URI)
                .then()
                .statusCode(200)
                .body("[0].fullName", equalTo("Hoag, Jacy L"));

        memberRepository.deleteAll();
    }


}

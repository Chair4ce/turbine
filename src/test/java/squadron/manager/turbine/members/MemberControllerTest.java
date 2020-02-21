package squadron.manager.turbine.members;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import squadron.manager.turbine.BaseIntegrationTest;
import squadron.manager.turbine.member.MemberModel;
import squadron.manager.turbine.member.MembersController;
import squadron.manager.turbine.member.MembersRepository;

import java.util.Date;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

public class MemberControllerTest extends BaseIntegrationTest {

    @Autowired
    private MembersRepository membersRepository;

    @Test
    public void getReturnsMembers() {

        Date date = new Date();
       MemberModel newMember = new MemberModel(
               92093,
               date,
               "Hoag, Jacy L",
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
               date
               );

       membersRepository.save(newMember);

        given()
                .port(port)
                .when()
                .get(MembersController.URI)
                .then()
                .statusCode(200)
                .body("[0].full_name", equalTo("Hoag, Jacy L"));

        membersRepository.deleteAll();
    }


}

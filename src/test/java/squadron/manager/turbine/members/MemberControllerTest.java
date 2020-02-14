package squadron.manager.turbine.members;

import org.junit.Test;
import squadron.manager.turbine.BaseIntegrationTest;
import squadron.manager.turbine.member.MembersController;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

public class MemberControllerTest extends BaseIntegrationTest {

    @Test
    public void getReturnsMembers() {
        given()
                .port(port)
                .when()
                .get(MembersController.URI)
                .then()
                .statusCode(200)
                .body("[0].fullName", equalTo("ABRAMS, JOSEPH L"));
    }
}

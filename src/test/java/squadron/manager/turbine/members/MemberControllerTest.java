package squadron.manager.turbine.members;

import org.junit.Test;
import squadron.manager.turbine.BaseIntegrationTest;
import squadron.manager.turbine.member.SqMemberController;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

public class MemberControllerTest extends BaseIntegrationTest {

    @Test
    public void getReturnsMembers() {
        given()
                .port(port)
                .when()
                .get(SqMemberController.URI)
                .then()
                .statusCode(200)
                .body("[0].full_name", equalTo("ABRAMS, JOSEPH L"));
    }
}

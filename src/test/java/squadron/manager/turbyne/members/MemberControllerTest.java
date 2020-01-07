package squadron.manager.turbyne.members;

import org.junit.Test;
import squadron.manager.turbyne.BaseIntegrationTest;
import squadron.manager.turbyne.member.MemberController;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

public class MemberControllerTest extends BaseIntegrationTest {

    @Test
    public void getReturnsMembers() {
        given()
                .port(port)
                .when()
                .get(MemberController.URI)
                .then()
                .statusCode(200)
                .body("[0].full_name", equalTo("ABRAMS, JOSEPH L"));
    }
}

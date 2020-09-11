package squadron.manager.turbine.members;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import squadron.manager.turbine.BaseIntegrationTest;
import squadron.manager.turbine.users.User;
import squadron.manager.turbine.users.UserRepository;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

public class SignInControllerTest extends BaseIntegrationTest {

@Autowired
   private UserRepository userRepository;
@Autowired
    private PasswordEncoder passwordEncoder;

//    @Autowired
//    public SignInControllerTest(UserRepository userRepository, PasswordEncoder passwordEncoder) {
//        this.userRepository = userRepository;
//        this.passwordEncoder = passwordEncoder;
//    }

    @Test
    public void authenticatesUser() {

        String password = "60CYleh@m";
        User u = new User( "JacyLH@gmail.com", passwordEncoder.encode(password), User.Role.USER);
        System.out.println("trying to save: "+ u);
        userRepository.save(u);
    }
}

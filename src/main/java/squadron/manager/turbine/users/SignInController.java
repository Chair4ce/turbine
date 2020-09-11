package squadron.manager.turbine.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(SignInController.URI)
@CrossOrigin(origins={ "http://localhost:3000", "http://localhost:4200" })
public class SignInController {

    public static final String URI = "/api/signin";

    UserRepository repository;

    PasswordEncoder passwordEncoder;

    @Autowired
    public SignInController(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping
    User signin(@RequestParam String email, @RequestParam String password) {
        System.out.println("requesting auth with..." + email);
        User u = new User(null, email, passwordEncoder.encode(password), User.Role.USER);
        return repository.save(u);
    }

    @PostMapping("/validateEmail")
    Boolean emailExists(@RequestParam String email) {
        return repository.existsByEmail(email);
    }

}

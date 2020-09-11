package squadron.manager.turbine.users;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import squadron.manager.turbine.errors.EntityNotFoundException;

import javax.validation.ConstraintViolationException;
import javax.validation.Valid;
import javax.validation.constraints.Size;
import java.util.HashSet;

@RestController
@RequestMapping(UserController.URI)
public class UserController {

    public static final String URI = "/api/users";

     UserRepository userrepository;

     PasswordEncoder passwordEncoder;

    @Autowired
    public void UserController(UserRepository userrepository, PasswordEncoder passwordEncoder) {
        this.userrepository = userrepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    Page<User> all(@PageableDefault(size = Integer.MAX_VALUE) Pageable pageable, OAuth2Authentication authentication) {
        String auth = (String) authentication.getUserAuthentication().getPrincipal();
        String role = authentication.getAuthorities().iterator().next().getAuthority();
        if (role.equals(User.Role.USER.name())) {
            return userrepository.findAllByEmail(auth, pageable);
        }
        return userrepository.findAll(pageable);
    }

    @GetMapping("/search")
    Page<User> search(@RequestParam String email, Pageable pageable, OAuth2Authentication authentication) {
        String auth = (String) authentication.getUserAuthentication().getPrincipal();
        String role = authentication.getAuthorities().iterator().next().getAuthority();
        if (role.equals(User.Role.USER.name())) {
            return userrepository.findAllByEmailContainsAndEmail(email, auth, pageable);
        }
        return userrepository.findByEmailContains(email, pageable);
    }

    @GetMapping("/findByEmail")
    @PreAuthorize("!hasAuthority('USER') || (authentication.principal == #email)")
    User findByEmail(@RequestParam String email, OAuth2Authentication authentication) {
        return userrepository.findByEmail(email).orElseThrow(() -> new EntityNotFoundException(User.class, "email", email));
    }

    @GetMapping("/{id}")
    @PostAuthorize("!hasAuthority('USER') || (returnObject != null && returnObject.email == authentication.principal)")
    User one(@PathVariable Long id) {
        return userrepository.findById(id).orElseThrow(() -> new EntityNotFoundException(User.class, "id", id.toString()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("!hasAuthority('USER') || (authentication.principal == @userRepository.findById(#id).orElse(new squadron.manager.turbine.users.User()).email)")
    void update(@PathVariable Long id, @Valid @RequestBody User res) {
        User u = userrepository.findById(id).orElseThrow(() -> new EntityNotFoundException(User.class, "id", id.toString()));
        res.setPassword(u.getPassword());
        userrepository.save(res);
    }

    @PostMapping
    @PreAuthorize("!hasAuthority('USER')")
    User create(@Valid @RequestBody User res) {
        return userrepository.save(res);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("!hasAuthority('USER')")
    void delete(@PathVariable Long id) {
        if (userrepository.existsById(id)) {
            userrepository.deleteById(id);
        } else {
            throw new EntityNotFoundException(User.class, "id", id.toString());
        }
    }

    @PutMapping("/{id}/changePassword")
    @PreAuthorize("!hasAuthority('USER') || (#oldPassword != null && !#oldPassword.isEmpty() && authentication.principal == @userRepository.findById(#id).orElse(new squadron.manager.turbine.users.User()).email)")
    void changePassword(@PathVariable Long id, @RequestParam(required = false) String oldPassword, @Valid @Size(min = 3) @RequestParam String newPassword) {
        User user = userrepository.findById(id).orElseThrow(() -> new EntityNotFoundException(User.class, "id", id.toString()));
        if (oldPassword == null || oldPassword.isEmpty() || passwordEncoder.matches(oldPassword, user.getPassword())) {
            user.setPassword(passwordEncoder.encode(newPassword));
            userrepository.save(user);
        } else {
            throw new ConstraintViolationException("old password doesn't match", new HashSet<>());
        }
    }
}

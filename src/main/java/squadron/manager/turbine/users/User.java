package squadron.manager.turbine.users;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@Entity
@NoArgsConstructor
@Table(name = "users", uniqueConstraints = {@UniqueConstraint(columnNames = "email")})
public class User {

    public enum Role {USER, ADMIN, USER_MANAGER}

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotEmpty
    @Email
    private String email;
    @JsonIgnore
    @ToString.Exclude
    private String password;
    @NotNull
    @Enumerated(EnumType.STRING)
    private Role role;


    public User(@NotEmpty @Email String email, String password, @NotNull Role role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public User(Long id, @NotEmpty @Email String email, String password, @NotNull Role role) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}

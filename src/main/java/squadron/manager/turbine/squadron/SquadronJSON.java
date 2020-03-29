package squadron.manager.turbine.squadron;


import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class SquadronJSON {
    private Long id;
    private String squadron;
    private String pas;
    private String group_pas;
}

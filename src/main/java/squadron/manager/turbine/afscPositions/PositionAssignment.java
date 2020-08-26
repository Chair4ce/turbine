package squadron.manager.turbine.afscPositions;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import squadron.manager.turbine.member.Member;

import javax.persistence.*;

@NoArgsConstructor
@Entity
@Data
@Table(name = "position_assignment")
@DynamicUpdate
public class PositionAssignment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private Long id;
    private String afsc;
    private String type;
    private String posId;
    private Long mbrTableId;

    public PositionAssignment(String afsc, String type, String posId, Long mbrTableId) {
        this.afsc = afsc;
        this.type = type;
        this.posId = posId;
        this.mbrTableId = mbrTableId;
    }

    public PositionAssignment(Long id, String afsc, String type, String posId, Long mbrTableId) {
        this.id = id;
        this.afsc = afsc;
        this.type = type;
        this.posId = posId;
        this.mbrTableId = mbrTableId;
    }
}

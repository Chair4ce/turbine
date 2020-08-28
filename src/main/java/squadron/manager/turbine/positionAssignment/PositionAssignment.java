package squadron.manager.turbine.positionAssignment;

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
    @Column(name = "afsc_group")
    private String afscGroup;
    private String type;
    private Long posId;
    private Long mbrId;

    public PositionAssignment(String afscGroup, String type, Long posId, Long mbrId) {
        this.afscGroup = afscGroup;
        this.type = type;
        this.posId = posId;
        this.mbrId = mbrId;
    }

    public PositionAssignment(Long id, String afscGroup, String type, Long posId, Long mbrId) {
        this.id = id;
        this.afscGroup = afscGroup;
        this.type = type;
        this.posId = posId;
        this.mbrId = mbrId;
    }
}

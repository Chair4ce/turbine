package squadron.manager.turbine.gainingMember;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Getter
public class GainingGroupCollection {
    private String genericGroup;
    private List<GainingMember> members;

    public GainingGroupCollection(String genericGroup, List<GainingMember> members) {
        this.genericGroup = genericGroup;
        this.members = members;
    }
}

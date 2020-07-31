package squadron.manager.turbine.member;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;


@NoArgsConstructor
@Getter
public class DAFSCCollection {
    private String genericGroup;
    private List<Member> members;

    public DAFSCCollection(String genericGroup, List<Member> members) {
        this.genericGroup = genericGroup;
        this.members = members;
    }
}

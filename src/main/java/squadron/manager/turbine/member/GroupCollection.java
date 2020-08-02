package squadron.manager.turbine.member;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;


@NoArgsConstructor
@Getter
public class GroupCollection {
    private String genericGroup;
    private List<Member> members;

    public GroupCollection(String genericGroup, List<Member> members) {
        this.genericGroup = genericGroup;
        this.members = members;
    }
}

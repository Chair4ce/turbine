package squadron.manager.turbine.rank;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import squadron.manager.turbine.airman.Airman;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class grade {
    @Id
    @GeneratedValue
    private Long id;

    private String abbreviation;

    @JsonIgnore
    @OneToMany(mappedBy = "grade")
    private List<Airman> airmen = new ArrayList<>();

    public grade(String abbreviation) {
        this.abbreviation = abbreviation;
    }
}

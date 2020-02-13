package squadron.manager.turbine.squadron;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(SquadronController.URI)
public class SquadronController {
    public  static final String URI = "/api/squadrons";

    @Autowired
    private SquadronRepository squadronRepository;

    @CrossOrigin
    @GetMapping
    public List<Squadron> getAllSquadrons() throws Exception {
        return squadronRepository.findAll();
    }


    @CrossOrigin
    @PostMapping(path = "/add")
    List<Squadron> save(@Valid @RequestBody SquadronJSON squadronJSON){
        Squadron squadron = new Squadron(squadronJSON.getSquadron(),
                squadronJSON.getPas(), squadronJSON.getGroup_pas());
        System.out.println("Saving: " + squadron);
        this.squadronRepository.save( squadron);
        System.out.println("Found: " + this.squadronRepository.findAll());
        return this.squadronRepository.findAll();
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<Squadron> getSquadronById(@PathVariable(value = "id") Long id) throws Exception {
        System.out.println("getting squadron with id: " + id);
        Squadron squadron = squadronRepository.findById(id).orElseThrow(() -> new Exception("Squadron not found with id ::" + id));
        return ResponseEntity.ok().body(squadron);
    }
}

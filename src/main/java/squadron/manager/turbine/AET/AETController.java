package squadron.manager.turbine.AET;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(AETController.URI)
public class AETController {
    public  static final String URI = "/api/AETs";

    @Autowired
    private AETRepository aETRepository;

    @CrossOrigin
    @GetMapping
    public List<AET> getAllFlights() throws Exception {
        return aETRepository.findAll();
    }


    @CrossOrigin
    @PostMapping
    public AET create(@Valid @RequestBody AETJSON AETJSON){
        AET AET = new AET(AETJSON.getOrg_id(),
                AETJSON.getPas_Code());
        return this.aETRepository.save(AET);
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<AET> getFlightById(@PathVariable(value = "id") Long id) throws Exception {
        System.out.println("getting AET with id: " + id);
        AET AET = aETRepository.findById(id).orElseThrow(() -> new Exception("AET not found with id ::" + id));
        return ResponseEntity.ok().body(AET);
    }
}

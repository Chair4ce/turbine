package squadron.manager.turbine.flight;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(FlightController.URI)
public class FlightController {
    public  static final String URI = "/api/flights";

    @Autowired
    private FlightRepository flightRepository;

    @CrossOrigin
    @GetMapping
    public List<Flight> getAllFlights() throws Exception {
        return flightRepository.findAll();
    }


    @CrossOrigin
    @PostMapping
    public Flight create(@Valid @RequestBody FlightJSON flightJSON){
        Flight flight = new Flight(flightJSON.getOrg_id(),
                flightJSON.getPas_Code());
        return this.flightRepository.save(flight);
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<Flight> getFlightById(@PathVariable(value = "id") Long id) throws Exception {
        System.out.println("getting flight with id: " + id);
        Flight flight = flightRepository.findById(id).orElseThrow(() -> new Exception("Flight not found with id ::" + id));
        return ResponseEntity.ok().body(flight);
    }
}

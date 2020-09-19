package squadron.manager.turbine.flight;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import squadron.manager.turbine.squadron.Squadron;
import squadron.manager.turbine.squadron.SquadronRepository;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

import static java.util.Collections.emptyList;

@RestController
@RequestMapping(FlightController.URI)
public class FlightController {
  public static final String URI = "/api/flights";
  private SquadronRepository squadronRepository;
  private FlightRepository flightRepository;

  public FlightController(
    FlightRepository flightRepository,
    SquadronRepository squadronRepository
  ) {
    this.flightRepository = flightRepository;
    this.squadronRepository = squadronRepository;
  }

  @PostMapping
  public ResponseEntity<Flight> createFlight(
    @Valid
    @RequestBody FlightJSON flightJSON
  ) {
    Squadron squadron = squadronRepository.findOne(flightJSON.getSquadronId());
    Flight flight = new Flight(squadron, flightJSON.getName());
    flightRepository.save(flight);
    return new ResponseEntity<>(flight, HttpStatus.CREATED);
  }

  @DeleteMapping(value = "/{id}")
  public ResponseEntity<Object> deleteFlight(@PathVariable Long id) {
    Flight flight = this.flightRepository.findOne(id);
    List<Flight> lists = new ArrayList<>();
    lists.add(flight);
    this.flightRepository.deleteInBatch(lists);
    return new ResponseEntity<>(
      emptyList(),
      HttpStatus.OK
    );
  }
}

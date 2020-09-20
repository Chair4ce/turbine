package squadron.manager.turbine.airman;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import squadron.manager.turbine.flight.FlightRepository;

import javax.validation.Valid;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping(AirmanController.URI)
public class AirmanController {
  public static final String URI = "/api/airmen";

  private AirmanService airmanService;


  public AirmanController(
    AirmanService airmanService
  ) {
    this.airmanService = airmanService;
  }

  @GetMapping(path = "/{airmanId}")
  public Airman show(@PathVariable Long airmanId) {
    return airmanService.getAirman(airmanId);
  }

  @GetMapping
  public List<Airman> index(@RequestParam Long siteId) {
    return airmanService.getAirmenBySite(siteId);
  }

  @PostMapping
  public Airman create(@Valid @RequestBody AirmanJSON airmanJSON) {
    return airmanService.createAirman(airmanJSON);
  }

  @PutMapping
  public Airman update(@Valid @RequestBody AirmanJSON airmanJSON) {
    return airmanService.updateAirman(airmanJSON);
  }

  @DeleteMapping(path = "/{id}")
  public void delete(@PathVariable("id") Long id) {
    airmanService.deleteAirman(id);
  }


  private List<Airman>  filterAirmanByIds(List<Airman> airmen, List<Long> ids) {
      return airmen.stream()
      .filter(airman -> ids.contains(airman.getId()))
      .collect(Collectors.toList());
  }

}

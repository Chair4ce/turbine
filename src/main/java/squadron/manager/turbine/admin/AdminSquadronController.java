package squadron.manager.turbine.admin;

import mil.af.us.narwhal.flight.Flight;
import mil.af.us.narwhal.flight.FlightRepository;
import mil.af.us.narwhal.site.SiteRepository;
import mil.af.us.narwhal.squadron.Squadron;
import mil.af.us.narwhal.squadron.SquadronRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Collections.emptyList;

@RestController
@RequestMapping(AdminSquadronController.URI)
public class AdminSquadronController{
  public static final String URI = "/api/admin/squadrons";
  private SiteRepository siteRepository;
  private SquadronRepository squadronRepository;
  private FlightRepository flightRepository;

  public AdminSquadronController(
    FlightRepository flightRepository,
    SiteRepository siteRepository,
    SquadronRepository squadronRepository
  ) {
    this.flightRepository = flightRepository;
    this.siteRepository = siteRepository;
    this.squadronRepository = squadronRepository;
  }

  @GetMapping
  public List<AdminSquadronItemJSON> index() {
    final Object[][] results = this.squadronRepository.getAdminSquadrons();
    return Arrays
      .stream(results)
      .map(o -> new AdminSquadronItemJSON(
        Long.parseLong(o[0].toString()),
        o[1].toString(),
        Long.parseLong(o[2].toString()),
        o[3].toString(),
        Long.parseLong(o[4].toString())))
      .collect(Collectors.toList());
  }

  @PostMapping
  public ResponseEntity<AdminSquadronItemJSON> createAdminSquadronItem(@RequestBody AdminSquadronItemJSON item) {
    final AdminSquadronService adminSquadronService = new AdminSquadronService(
      this.siteRepository,
      this.squadronRepository
    );
    return new ResponseEntity<>(adminSquadronService.createSquadron(item), HttpStatus.CREATED);
  }

  @DeleteMapping(value = "/{id}")
  public ResponseEntity<Object> delete(@PathVariable Long id) {
//    this.squadronRepository.delete(id);

    Squadron squadron = this.squadronRepository.findOne(id);

    List<Flight> flightList = this.flightRepository.findAllBySquadron(squadron);

    List<Squadron> squadronList = new ArrayList<>();
    squadronList.add(squadron);

    this.flightRepository.deleteInBatch(flightList);
    this.squadronRepository.deleteInBatch(squadronList);

    return new ResponseEntity<>(
      emptyList(),
      HttpStatus.OK
    );
  }
}


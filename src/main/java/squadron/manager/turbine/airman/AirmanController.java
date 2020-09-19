package squadron.manager.turbine.airman;

import mil.af.us.narwhal.flight.Flight;
import mil.af.us.narwhal.flight.FlightRepository;
import mil.af.us.narwhal.schedule.Schedule;
import mil.af.us.narwhal.skill.Certification;
import mil.af.us.narwhal.skill.CertificationRepository;
import mil.af.us.narwhal.skill.Qualification;
import mil.af.us.narwhal.skill.QualificationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping(AirmanController.URI)
public class AirmanController {
  public static final String URI = "/api/airmen";

  private AirmanRepository airmanRepository;
  private QualificationRepository qualificationRepository;
  private CertificationRepository certificationRepository;
  private FlightRepository flightRepository;
  private AirmanService airmanService;


  public AirmanController(
    AirmanRepository airmanRepository,
    QualificationRepository qualificationRepository,
    CertificationRepository certificationRepository,
    FlightRepository flightRepository,
    AirmanService airmanService
  ) {
    this.airmanRepository = airmanRepository;
    this.qualificationRepository = qualificationRepository;
    this.certificationRepository = certificationRepository;
    this.flightRepository = flightRepository;
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

  @PostMapping(path = "/{id}/qualifications")
  public ResponseEntity<Airman> createAirmanQualification(
    @PathVariable("id") Long id,
    @Valid
    @RequestBody AirmanSkillJSON skill
  ) {
    final Airman airman = airmanRepository.findOne(id);
    final Qualification qualification = qualificationRepository.findOne(skill.getSkillId());
    final AirmanQualification airmanQualification = new AirmanQualification(
      qualification,
      skill.getEarnDate(),
      skill.getPeriodicDue(),
      skill.getLastSat(),
      skill.getCurrencyExpiration()

    );
    return airman.addQualification(airmanQualification) ?
      new ResponseEntity<>(airmanRepository.save(airman), HttpStatus.CREATED) :
      new ResponseEntity<>(airman, HttpStatus.OK);
  }

  @PostMapping(path = "/{id}/certifications")
  public ResponseEntity<Airman> createAirmanCertification(
    @PathVariable("id") Long id,
    @Valid
    @RequestBody AirmanSkillJSON skill
  ) {
    final Airman airman = airmanRepository.findOne(id);
    final Certification certification = certificationRepository.findOne(skill.getSkillId());
    final AirmanCertification airmanCertification = new AirmanCertification(
      certification,
      skill.getEarnDate(),
      skill.getPeriodicDue(),
      skill.getLastSat(),
      skill.getCurrencyExpiration()
    );
    return airman.addCertification(airmanCertification) ?
      new ResponseEntity<>(airmanRepository.save(airman), HttpStatus.CREATED) :
      new ResponseEntity<>(airman, HttpStatus.OK);
  }


  @PutMapping(path = "/{id}/qualifications")
  public Airman updateAirmanQualification(
    @PathVariable("id") Long id,
    @Valid
    @RequestBody AirmanSkillJSON skill
  ) {
    final Airman airman = airmanRepository.findOne(id);
    airman.updateQualification(
      skill.getId(),
      skill.getEarnDate(),
      skill.getPeriodicDue(),
      skill.getLastSat(),
      skill.getCurrencyExpiration()
    );
    return airmanRepository.save(airman);
  }

  @PutMapping(path = "/{id}/certifications")
  public Airman updateAirmanCertification(
    @PathVariable("id") Long id,
    @Valid
    @RequestBody AirmanSkillJSON skill
  ) {
    final Airman airman = airmanRepository.findOne(id);
    airman.updateCertification(
      skill.getId(),
      skill.getEarnDate(),
      skill.getPeriodicDue(),
      skill.getLastSat(),
      skill.getCurrencyExpiration()
    );
    return airmanRepository.save(airman);
  }

  @DeleteMapping(value = "/{airmanId}/qualifications/{id}")
  public Airman deleteAirmanQualification(
    @PathVariable("airmanId") Long airmanId,
    @PathVariable("id") Long id
  ) {
    final Airman airman = airmanRepository.findOne(airmanId);
    airman.deleteQualification(id);
    return airmanRepository.save(airman);
  }

  @DeleteMapping(value = "/{airmanId}/certifications/{id}")
  public Airman deleteAirmanCertification(
    @PathVariable("airmanId") Long airmanId,
    @PathVariable("id") Long id
  ) {
    final Airman airman = airmanRepository.findOne(airmanId);
    airman.deleteCertification(id);
    return airmanRepository.save(airman);
  }

  private List<Airman>  filterAirmanByIds(List<Airman> airmen, List<Long> ids) {
      return airmen.stream()
      .filter(airman -> ids.contains(airman.getId()))
      .collect(Collectors.toList());
  }

  @PutMapping(path = "/shift")
  public List<Airman> updateShift(
    @RequestParam Long flightId,
    @RequestBody AirmenShiftTypeJSON json
  ) {
    final Flight flight = flightRepository.findOne(flightId);
    List<Airman> unfilteredList = flight.getAirmen();
      filterAirmanByIds(unfilteredList, json.getAirmanIds())
      .forEach(airman -> airman.setShift(json.getShiftType()));
    return flightRepository.save(flight).getAirmen();
  }

  @PutMapping(path = "/schedules")
  public List<Airman> updateSchedules(
    @RequestParam(value = "startDate", required = false) String startDate,
    @RequestParam Long flightId,
    @RequestBody AirmenScheduleJSON json
  ) {
    Schedule schedule = json.getSchedule();
    final Flight flight = flightRepository.findOne(flightId);
    List<Airman> unfilteredList = flight.getAirmen();
    filterAirmanByIds(unfilteredList, json.getAirmanIds())
        .forEach(airman -> {
        if(startDate == null) {
          AirmanSchedule as = new AirmanSchedule(schedule, Instant.now());
          airman.addSchedule(as);
        } else {
          Instant start = Instant.parse(startDate);
          Stream<AirmanSchedule> currentSchedules =
            airman.getSchedules()
              .stream()
              .filter(item -> item.getEndDate() == null);
          currentSchedules.forEach(item -> item.setEndDate(start));
          AirmanSchedule as = new AirmanSchedule(schedule, start);
          airman.addSchedule(as);
        }
      });
    return flightRepository.save(flight).getAirmen();
  }
}
